import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { stripHTML, formatDate, formatUpdatedDate, getGenres, getRating, getImage } from "./utils";
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

    //Image Section
    let poster = null;
    if(show !== null){
        poster = getImage(show.image , "original");
    }

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

    //Cast Section
    const [cast, setCast] = useState([]);
    const [castLoading, setCastLoading] = useState(true);
    const [castError, setCastError] = useState("");
        useEffect(()=>{
        let cancelled = false;
        async function getCast() {
            

            try{
                setCastError("");
                setCastLoading(true);
                setCast([]);
                const castUrl = `https://api.tvmaze.com/shows/${id}/cast`;
                const castResponse = await fetch(castUrl);
            
                if (!castResponse.ok) {
                    throw new Error("Failed to fetch cast information");
                }
                const castData = await castResponse.json();
                if(cancelled === false){
                    setCast(castData);
                }
                

            }
            catch(error){
                if(cancelled === false){
                    setCastError("Failed to load cast information");
                }    
            }
            finally{
                if(cancelled === false){
                    setCastLoading(false);
                }                
            }
        }
        getCast();
        return () => {
             cancelled = true;
        };
    },[id]);

    return(
        <div className="show-details">
            <h1>Show Details</h1>
            <Link to="/">Back to Gallery</Link>
            <p>Show ID: {id}</p>

            {poster ? <img src={poster} alt={`${show.name} poster`} width="250" /> : <p>No Image Available</p>}

            {loading === true? <p>Loading...</p> : 
                (error !== "" ? <p>{error}</p> : 
                    (show !== null ? <h2>{show.name}</h2> : null))}

            {show !== null ? <p>{cleanSummary}</p> : null}

            {show !== null ? <p>Genres: {genres}</p> : null}
            
            {show !== null ? <p>Rating: {rating}</p> : null}

            {show !== null ? <p>Premiered: {formattedDate}</p> : null}

            {show !== null ? <p>Updated: {updated}</p> : null}

            <article>
            {show !== null ? <a target="_blank" href={show.url}>See Show on TV Maze</a> : null}
            </article>
            <section>
                <h3>Cast</h3>
                {castLoading  === true ? <p>Cast Loading...</p> :
                (castError !== "" ? <p>{castError}</p> : 
                    (cast.length === 0 ? <p>No Cast Information Available</p> : 
                        cast.slice(0,15).map((member) => {
                            return <p key={member.person.id}>{member.person.name} as {member.character.name}</p>
                        })))}
            </section>
            




        </div>
            
        
    )
}
export default ShowDetails