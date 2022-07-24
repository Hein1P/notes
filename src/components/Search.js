import { Box, flexbox, padding, textAlign } from '@mui/system';
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
function Search({ searchbgcolor, searchcolor, handleSearch }) {
    return (
        <div style={
            {
                width: '100%',
                backgroundColor: searchbgcolor,
                color: searchcolor,
                height: '50px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingLeft: '1rem',
                borderRadius: 2,
            }
        }>
            <AiOutlineSearch style={{ color: searchcolor, fontSize: '1.5rem' }} />
            <input type={'text'} placeholder={'Type to Search notes...'} onChange={handleSearch}
                style={{
                    backgroundColor: searchbgcolor,
                    color: searchcolor,
                    border: 'none',
                    outline: 'none',
                    fontSize: '1.5rem',
                    height: '40px',
                    width: '900px'
                }} />
        </div>
    )
}

export default Search