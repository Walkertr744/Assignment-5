import { useState, useEffect } from "react";
import SearchForm from './SearchForm'
import ShowList from './ShowList'

    function HomePage(){
        const [query, setQuery] = useState("");
        const [searchTerm, setSearchTerm] = useState("Friends");
        const [shows, setShows] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState("");

        useEffect(() => {
          async function getData(){
            
            setLoading(true);
            setError("");

      try{
        const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`;
        const response = await fetch(url);
      if(response.status === 429){
        throw new Error("Too many requests. please wait before submitting another request!");
      }
      if(!response.ok){
        throw new Error("Failed to fetch TV shows");
        }
        const data = await response.json();
        setShows(data.slice(0,10));
        console.log({data});
      }

      catch(error){
        setError(error.message);
        console.log(error.message);
        setShows([]);
    }
    finally{
      setLoading(false);
    }

  }
    getData();
},[searchTerm]);
    return(
        <>
        <h1>TV Show Gallery</h1>
          <SearchForm 
            query={query} 
            setQuery={setQuery} 
            setSearchTerm={setSearchTerm}
          />
          <p>Current Search: {searchTerm}</p> 
          <p>Number of Shows: {shows.length}</p>
          {loading === true ? <p>Loading TV shows...</p> : null}
          {error !== "" ? <p role="alert">{error}</p> : null}
          {loading === false && error === "" && shows.length === 0 ? <p>No TV shows found. Try another search.</p> : null}
          {loading === false && error === "" && shows.length > 0 ? <ShowList shows={shows} /> : null}

          <footer>
            <p>
                <a href="https://www.tvmaze.com" target="_blank">Powered by TVmaze</a>
            </p>   
          </footer>


        </>
    )

}
export default HomePage;