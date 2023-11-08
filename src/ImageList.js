// ImageList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function ImageList({searchQuery}) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [imgArr,SetImgArr]=useState([]);
  const [open,setOpen]=useState(false);
  const delayTimeout = useRef(null);
 
  const parseXmlResponse = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const photoTags = xmlDoc.getElementsByTagName('photo');
    const imageSrcArray = [];
   

  
    for (let i = 0; i < photoTags.length; i++) {
      const photo = photoTags[i];
      const id = photo.getAttribute('id');
      const server = photo.getAttribute('server');
      const secret = photo.getAttribute('secret');
      const imageUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`;
      imageSrcArray.push(imageUrl);
    }
    return imageSrcArray;
  };
  

  const fetchImages = async (query) => {
    await axios.get('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cf2a341173289dbbcc2c177bf71c47a2&format=rest&auth_token=72157720899578672-bfa8da0eafe710fb&api_sig=ccadc97014eb983f8b3c8c00037257e6')
    .then(function (response) {
      const imageSrcArray =  parseXmlResponse(response?.data);
      SetImgArr(imageSrcArray);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
   
  };

  const searchImages=async (query)=>{
   console.log("Q:", query);
    
    const url=`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=cf2a341173289dbbcc2c177bf71c47a2&text=${query}&safe_search=1&format=rest`
    //api call same as above
    await axios.get(url)
    .then(function (response) {
      const imageSrcArray =  parseXmlResponse(response?.data);
      SetImgArr(imageSrcArray);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
  }





  function saveToLocalStorage(q)
  {
    const existingData = JSON.parse(localStorage.getItem('queries')) || [];

// Define the new element to be added
const newElement = q; // Replace this with your actual data
// Add the new element to the existing data
existingData.push(newElement);

// Store the updated data back in localStorage
localStorage.setItem('queries', JSON.stringify(existingData));

  }

  useEffect(() => {
    const delayDebounceFn = () => {
      if (searchQuery) {
        if (delayTimeout.current) {
          clearTimeout(delayTimeout.current);
        }
        delayTimeout.current = setTimeout(() => {
          // Call your API here
          saveToLocalStorage(searchQuery)
          searchImages(searchQuery);

        }, 1000); // 12 seconds
      }
      else{
        fetchImages()
      }
    };

    delayDebounceFn();

    return () => {
      if (delayTimeout.current) {
        clearTimeout(delayTimeout.current);
      }
    };
  }, [searchQuery]);



    const modalStyle = {
      display: open ? 'block' : 'none',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    };
  
    const modalContentStyle = {
      backgroundColor: '#fefefe',
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '80%',
     
      
    };
  
    const imageStyle = {
      maxWidth: '90%',
      maxHeight: '500px', // Adjust the height as needed
      display: "block",
      margin:"0 auto"
    };
  const openImageModal = (image) => {
    console.log("sdfsd");
    // Show the selected image in a modal
    setCurrentUrl(image)
     setOpen(true)
  };
  const closeImageModal = (image) => {
    // Show the selected image in a modal
     setOpen(false)
  };
  const [currentUrl,setCurrentUrl]=useState('');


  return (
    <>
    <div className="image-list" >

      {imgArr && imgArr.map((image, idx) => (
        <div
          key={idx}
          className='imgIndi'
          onClick={() => openImageModal(image)}
          style={{
            width:"250px", 
            height:"200px", 
            cursor:"pointer",
          }}
          
        >
          <img src={image} alt={image.title} className='imgg'  />
        </div>
      ))}
      {/* Implement infinite scroll */}
    </div>
 
   <div style={modalStyle} onClick={closeImageModal}>
      <div style={modalContentStyle}>
        <span style={{ float: 'right', cursor: 'pointer' }} onClick={closeImageModal}>
          &times;
        </span>
        <img src={currentUrl} alt="modal-img" style={imageStyle}  />
      </div>
    </div>
   
  
    </>
  );
}

export default ImageList;
