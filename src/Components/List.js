import React from 'react'
import { Link } from "react-router-dom";

//get album from album list and show using html css and js
const List = (props) => {
  return (
    <div className='list'>
      <h3>{props.album.title}</h3>
      <div className='button-group'>
        <Link to="/update-album"><button className="update-btn" onClick={() => props.setUpdateAlbum(props.album)}>Update</button></Link>
        <button className='delete-btn' onClick={() => props.deleteAlbumFromList(props.album.id)}>Delete</button>
      </div>
    </div>
  )
}

export default List