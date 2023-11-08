import logo from './logo.svg';
import './App.css';
import Header from './Header';
import ImageList from './ImageList';
import { useState } from 'react';

function App() {
  const [searchQuery,setSearchQuery]=useState('');
  


  return (
    <div className="App">
     <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
     <ImageList  searchQuery={searchQuery} />
    </div>
  );
}

export default App;
