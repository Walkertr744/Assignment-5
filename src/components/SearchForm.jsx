function SearchForm({query,setQuery,setSearchTerm}){
    function handleSubmit(event){
        event.preventDefault();
        setSearchTerm(query);
    }
    return(
    <>
        <h2>Search Tv shows!</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Enter a Tv Show Name" 
            value={query} 
            onChange={(event) => setQuery(event.target.value)}
            />
            <button>Search</button>
        </form>
    </>
    );
}

export default SearchForm;