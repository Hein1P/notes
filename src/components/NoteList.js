import React, { useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
function NoteList({ notes, handleDelete, search }) {
    const [notesfiltered, setNotesfiltered] = useState(notes);
    useEffect(() => {
        if (search.length > 0) {
            let filtered = notes.filter(note => note.data.match(search))
            setNotesfiltered(filtered)
        } else if (search.length == 0) {
            setNotesfiltered(notes)
        }
    }, [search, notes])

    console.log("NOtesfilt", notesfiltered)
    return (<>
        {notesfiltered.length > 0 ?
            notesfiltered.map(note => {
                const { data, date, id } = note;
                return (
                    < Grid item xs={4} key={id}>
                        <Paper elevation={3} sx={{
                            backgroundColor: 'yellow',
                            height: '250px',
                        }}>
                            <div style={{
                                height: '200px',
                                width: '100%',
                                backgroundColor: 'yellow',
                                outline: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                padding: '1rem',
                                color: '#000'
                            }}>
                                <Typography variant='body'>{data}</Typography>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                height: '50px',
                                fontSize: '1.5rem'
                            }}>
                                <h6>{date}</h6>
                                <button onClick={() => handleDelete(id)}
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                        fontSize: '1.5rem'
                                    }}>
                                    <BsTrash />
                                </button>
                            </div>
                        </Paper>
                    </Grid >
                )
            })
            : null}
    </>
    )
}

export default NoteList