import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { stripHTML, formatDate, formatUpdatedDate, getGenres, getRating } from "./utils";
function ShowDetails(){
    const [show, setShow] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        let cancelled = false;



        async function getShow() {
            const showUrl = `https://api.tvmaze.com/shows/${id}`;
            setError("");
            setLoading(true);
            setShow(null);
            try{
                const response = await fetch(showUrl);
                if (!response.ok) {
                    throw new Error("Failed to Fetch Show Information");
                }
                const data = await response.json();
                if(cancelled === false){
                setShow(data);
                }








        }
        catch(error){
            if(cancelled === false){
            setError("Failed to Load Show Information");
            }
        }
        finally{
            if(cancelled === false){
            setLoading(false);
            }
        }





        

        }

        getShow();
        return() => {
            cancelled = true;
        };
}, [id]);

    //Summary Section
    let cleanSummary = "";
    if(show !== null){
        cleanSummary = stripHTML(show.summary);
    }

    //Premiere Date
    let formattedDate = "No premiere date available";
        if(show !== null && show.premiered !== null){
            formattedDate = formatDate(show.premiered)
    }

    //Updated Date
    let updated = "";
    if(show !== null && show.updated !== null){
        updated = formatUpdatedDate(show.updated)
    }

    //Genres Section
    let genres = "";
    if(show !== null){
        genres = getGenres(show.genres);
    }

    //Rating Section
    let rating = "";
    if(show !== null){
        rating = getRating(show.rating.average);
    }

    /*
    A short list of main cast members, loaded with a second fetch request
    A link to the show page on TVmaze
    Optionally, the poster image with useful alternative text
    */



    return(
        <>
            <h1>Show Details</h1>
            <p>Show ID: {id}</p>

            {loading === true? <p>Loading...</p> : 
                (error !== "" ? <p>{error}</p> : 
                    (show !== null ? <h2>{show.name}</h2> : null))}

            {show !== null ? <p>{cleanSummary}</p> : null}

            {show !== null ? <p>Genres: {genres}</p> : null}
            
            {show !== null ? <p>Rating: {rating}</p> : null}

            {show !== null ? <p>Premiered: {formattedDate}</p> : null}

            {show !== null ? <p>Updated: {updated}</p> : null}




        </>
            
        
    )
}
export default ShowDetails