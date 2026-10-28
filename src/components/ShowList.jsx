import ShowCard from "./ShowCard";

function ShowList({shows}){
    return(
        <>
            <h2>Search Results</h2>
                <div className="show-gallery">
                {shows.map((result) => {
                     return <ShowCard key={result.show.id} show={result.show}/>
                        
                })}
                </div>

        </>
    )

}
export default ShowList;