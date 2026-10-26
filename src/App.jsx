import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import ShowList from './components/ShowList'

function App() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  
  useEffect(() => {
    async function getData(){
    
      try{
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);

      if(!response.ok){
        throw new Error("Failed to fetch TV shows");
        }
        const data = await response.json();
        setShows(data.slice(0,10));
        console.log({data});
      }

      catch(error){
      console.log(error.message);
    }

  }
    getData();
},[searchTerm]);

  return (
    <>
          <h1>TV Show Gallery</h1>
          <SearchForm 
            query={query} 
            setQuery={setQuery} 
            setSearchTerm={setSearchTerm}
          />
          <p>Current Search: {searchTerm}</p> 
          <p>Number of Shows: {shows.length}</p>

         <ShowList shows={shows} />
    </>
  )
}

export default App
