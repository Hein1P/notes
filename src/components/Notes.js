import { Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import NoteList from './NoteList';
import './notes.css';
import { v4 as uuidv4 } from 'uuid';

function useLocalStorage(key, defaultValue = [], serialize = JSON.stringify, deserialize = JSON.parse) {
    const [state, setState] = React.useState(() => {
        const valueinlocal = window.localStorage.getItem(key)
        if (valueinlocal) {
            return deserialize(valueinlocal)
        }
        return defaultValue
    })

    React.useEffect(() => {
        window.localStorage.setItem(key, serialize(state))
    }, [state, serialize])

    return [state, setState]
}
function Notes({ search }) {
    const [notes, setNotes] = useLocalStorage('notes', []);
    const [data, setData] = useState('');
    const characterLimit = 200;
    const handleChange = (e) => {
        if (data.length < 200) {
            setData(e.target.value)
        }
    }

    const handleSave = () => {
        if (data.length > 0) {
            const id = uuidv4()
            const getdate = new Date();
            const date = [getdate.getDate(), getdate.getMonth() + 1, getdate.getFullYear()].join('/')
            console.log(date)
            setNotes([...notes, { data, date, id }])
            setData('')
        }
    }

    const handleDelete = (id) => {
        let notesCopy = [...notes];
        notesCopy = notesCopy.filter(note => note.id !== id)
        setNotes(notesCopy)
    }
    console.log('notes', notes)
    return (
        <Grid container spacing={2} marginTop={2} >

            <NoteList notes={notes} handleDelete={handleDelete} search={search} />

            <Grid item xs={4}>
                <Paper elevation={3} sx={{
                    backgroundColor: 'green',
                    height: '250px',

                }}>
                    <textarea onChange={e => handleChange(e)} value={data}
                        placeholder='Type to add a note...' className='tarea'
                        style={
                            {
                                resize: 'none',
                                height: '200px',
                                width: '100%',
                                backgroundColor: 'green',
                                outline: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                padding: '1rem',

                            }}></textarea>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        height: '50px',
                        fontSize: '1.5rem'
                    }}>
                        <h6>{characterLimit - data.length} Remaining</h6>
                        <button onClick={handleSave}
                            style={{
                                backgroundColor: 'silver',
                                border: 'none',
                                borderRadius: '2rem',
                                width: '70px',
                                height: '25px'
                            }}>Save</button>
                    </div>
                </Paper>
            </Grid >

        </Grid >
    )
}

export default Notes