import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';

const PhotoUploader = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoData, setPhotoData] = useState(null);
  const [showPhoto, setShowPhoto] = useState(null);
  const [showClass, setShowClass] = useState(null);

  const[invisible,setInvisible] = useState('');

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPhoto) {
      alert('Please select a photo');
      return;
    }
    toast.success("Please wait while image is processed");
    const formData = new FormData();
    formData.append('image', selectedPhoto);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/protected/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      
      });
    
setInvisible('hidden');
      setShowClass(response.data.Class);
      setShowPhoto(response.data.Confidence * 100);

      setPhotoData(URL.createObjectURL(selectedPhoto)); // Preview uploaded image

    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo');
    }
  };

  return (
    <div className='text-white h-screen mx-11 flex justify-center my-11 '>
    <div >
    <div className='flex justify-center  text-4xl font-bold my-11 '>
      <h2>Photo Uploader</h2>
      </div>

      <div className='flex justify-center text-2xl'>
        <p className={invisible}>Upload your Plant Photo to get to know about Disease</p>
      </div>
     <div className='flex justify-center items-center my-11  border-2 p-11 '  >
    <div className={invisible}>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" className='text-white ' name="image" accept="image/*" onChange={handlePhotoChange} />
        
        <button type="submit" className='text-white border-2 rounded-lg p-4'>Upload Photo</button>
      </form>
    </div>
      {photoData && (
        <div>
          <h3 className='text-2xl m-11 font-bold'>Uploaded Photo Preview:</h3>
          <img src={photoData} alt="Uploaded" className='mx-11' style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}
     
     <div className='text-white my-52'>
        {showClass && <p className='font-bold text-2xl'>Plant Name : {showClass}</p>}
        <br/>
        {showPhoto && <p className='font-bold text-2xl'>Confidence: {showPhoto}%</p>}
      </div>
     </div>

    </div>
    </div>
  );
};

export default PhotoUploader;
