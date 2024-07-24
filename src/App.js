import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
    const [photos, setPhotos] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editMode, setEditMode] = useState(null); // which photo it is targeted 

    const handleFileChange = event => setFile(event.target.files[0]);
    const handleDescriptionChange = event => setDescription(event.target.value);
    const handleEdit = photo => {
        setEditMode(photo.filename);
        setEditDesc(photo.description);
    };

    const handleEditChange = event => setEditDesc(event.target.value);

    const handleUpdate = async (filename) => {
            const updatedPhotos = photos.map(photo => {
              if (photo.filename === filename) {
                  return { ...photo, description: editDesc };
              }
              return photo;
          });
          setPhotos(updatedPhotos);
          setEditMode(null);
          setEditDesc('');
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(file)
        const reader = new FileReader()
        reader.onloadend = () =>{
            setPhotos(photo=>[...photo ,{description : description , filename : reader.result}])

        }
        reader.readAsDataURL(file)
        setDescription('');
        setFile(null);
    };

    const handleDelete = async (filename) => {
        setPhotos(photos.filter(photo => photo.filename !== filename));
    };

    return (
        <div className="app-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="file" onChange={handleFileChange} />
                <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Description" />
                <button type="submit">Upload Photo</button>
            </form>
            <div className="photo-grid">
                {photos.map((photo, index) => (
                    <div className="photo-item" key={index}>
                        <img src={photo.filename} alt={photo.description} />
                        {editMode === photo.filename ? (
                            <input type="text" value={editDesc} onChange={handleEditChange} placeholder="Edit Description" />
                        ) : (
                            <p>{photo.description}</p>
                        )}
                        {editMode === photo.filename ? (
                            <button onClick={() => handleUpdate(photo.filename)}>Update</button>
                        ) : (
                            <button onClick={() => handleEdit(photo)}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(photo.filename)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
