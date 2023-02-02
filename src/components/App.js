import React, { Component } from 'react'
import { Routes, Route } from "react-router-dom";
import AddAlbum from './AddAlbum';
import AlbumsList from './AlbumsList';
// import Navbar from './Navbar'
import UpdateAlbum from './UpdateAlbum';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      updateAlbum: {}
    }
  }

  // this function call first time when app render
  componentDidMount = async () => {
    const albums = await fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((json) => json);
    this.setState({
      albums
    })
  }

  // setLastId=()=>{
  //   const length=this.state.albums.length;
  //   const lastId=this.state.albums[length-1].id;
  //   this.setState({
  //     lastId:lastId
  //   })
  //   console.log(this.state.lastId);
  // }


  //delete album function-----------------------------------------------------------------------------------
  //this function take album id from albums list and then delete the album from albums list and update state
  deleteAlbumFromList = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE', })
    const newAlbums = this.state.albums.filter((album) => album.id !== id);
    alert("Your Album Deleted successfully");
    this.setState({
      albums: newAlbums,
    })
  }
  //---------------------------------------------------------------------------------------------------------


  //update album functions------------------------------------------------------------------------------------
  //this function take album object from albums list and set state for update album
  setUpdateAlbum = async (album) => {
    this.setState({
      updateAlbum: album
    })
  }
  //this function take album id, updateTitle, updateUserid, oldAlbum and then update and set state 
  updateAlbumInList = async (id, updateTitle, updateUserid, oldAlbum) => {
    const albums = this.state.albums;
    const index = albums.indexOf(oldAlbum);
    let updatedAlbum = [];
    if (id < 100) {
      updatedAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId: updateUserid,
          id: id,
          title: updateTitle,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json()).then((json) => json);
    } else {
      updatedAlbum = {
        userId: updateUserid,
        id: id,
        title: updateTitle
      }
    }
    albums[index] = updatedAlbum;
    this.setState({
      albums: albums
    })
    alert("Update Successfully done")
  }
  //--------------------------------------------------------------------------------------------------------

  //add album function--------------------------------------------------------------------------------------
  //this function take userid and title from input and then added to the bottom of the albums list
  addAlbumToList = (userId, title) => {
    fetch('https://jsonplaceholder.typicode.com/albums', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        id: this.state.count,
        title: title,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json()).then((json) => json);
    const length = this.state.albums.length;
    const lastId = this.state.albums[length - 1].id;
    const album = {
      userId: userId,
      id: lastId + 1,
      title: title,
    }
    this.setState({
      albums: [...this.state.albums, album]
    })
    alert("New Album added successfully in the bottom");
  }
  //--------------------------------------------------------------------------------------------------------


  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<AlbumsList albums={this.state.albums} setUpdateAlbum={this.setUpdateAlbum} deleteAlbumFromList={this.deleteAlbumFromList} />}></Route>
          <Route path='/add-album' element={<AddAlbum addAlbumToList={this.addAlbumToList} />}></Route>
          <Route path='/update-album' element={<UpdateAlbum album={this.state.updateAlbum} updateAlbumInList={this.updateAlbumInList} />}></Route>
        </Routes>
      </>
    )
  }
}