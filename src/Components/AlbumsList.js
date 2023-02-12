import React from 'react'
import List from './List'
import Navbar from './Navbar'

//get all albums list from app and then call list component for each list on the albums
const AlbumsList = (props) => {
  return (
    <>
      {/* Navbar */}
      <Navbar page="Add Album" path="/add-album" />

      <div className='albums-list'>
        {props.albums.map((album) => <List album={album} key={album.id} setUpdateAlbum={props.setUpdateAlbum} deleteAlbumFromList={props.deleteAlbumFromList} />)}
      </div>
    </>
  )
}

export default AlbumsList