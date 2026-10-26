function ShowList({shows}){
    return(
        <>
            <h2>Search Results</h2>
                
                {shows.map((result) => {
                     return <p key={result.show.id}>{result.show.name}</p>
                        
                })}

        </>
    )

}
export default ShowList;