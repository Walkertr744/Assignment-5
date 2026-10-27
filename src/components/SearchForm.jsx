import { useState } from "react";

function SearchForm({query,setQuery,setSearchTerm}){
    const [searchError, setSearchError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if(query.trim() === "") {
            setSearchError("Please enter a TV show name.");
            return;
        }

        setSearchError("");
        setSearchTerm(query.trim());
    }
    return(
    <>
        <h2>Search Tv shows!</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Enter a Tv Show Name" 
            value={query} 
            onChange={(event) => {
                setQuery(event.target.value);
                setSearchError("");
            }}
            />
            <button>Search</button>
        </form>
        {searchError !== "" ? <p role="alert">{searchError}</p> : null}
    </>
    );
}

export default SearchForm;