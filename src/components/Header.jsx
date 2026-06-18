import React from 'react'
import "./styles/header.css";
const Header = ({searchTerm,setSearchTerm,sortyear,setSortYear,darkMode,setDarkMode}) => {
  return (
(
    <header>
    <div class="logo">
        <h1>🎬CineVerse</h1>
    </div>

    <div class="header-controls">
        <input type="text" placeholder="Search Movies" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>

        <select value={sortyear||""} onChange={(e)=>setSortYear(e.target.value)}> 
            <option value="">Sort by Year</option>
            <option value="asc">Newest First</option>
            <option value="desc">Oldest First</option>
        </select>

        <label>
            <input type="checkbox" id="themeToggle" checked={darkMode}onClick={()=>setDarkMode(!darkMode)}></input>
            Dark Mode
        </label>
       
    </div>
</header>

)
  )
}

export default Header
