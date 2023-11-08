import React, { useState, useEffect } from 'react';

function Header({ setSearchQuery, searchQuery }) {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [list, setList] = useState([]);

  function getList() {
    const q = localStorage.getItem('queries');
    setList(JSON.parse(q));
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
   
    // Trigger search with suggestion
  };

    
  
  

  return (
    <div className="header" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", }}>
        <input
          type="text"
          placeholder="Search for images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={getList}
          style={{ padding: "6px", borderRadius: "12px" }}
        />
        <button style={{ padding: "6px", borderRadius: "12px" }}>Search</button>
      </div>
      {searchQuery.length > 0 && (
        <div className="suggestions" style={{ textAlign: "left", background: "white", marginTop: "10px" }}>
        {list.length > 0 &&
  list.slice(8).map((suggestion, index) => (
    <div
      key={index}
      onClick={() => handleSuggestionClick(suggestion)}
      style={{ color: "black", padding: "6px" }}
    >
      {suggestion}
    </div>
  ))}

        </div>
      )}
    </div>
  );
}

export default Header;


