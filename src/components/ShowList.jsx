import ShowCard from "./ShowCard";

function ShowList({shows}){
    return(
        <>
            <h2>Search Results</h2>
                
                {shows.map((result) => {
                     return <ShowCard key={result.show.id} show={result.show}/>
                        
                })}

        </>
    )

}
export default ShowList;