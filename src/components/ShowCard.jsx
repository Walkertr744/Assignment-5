import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { stripHTML, formatDate, formatUpdatedDate, getGenres, getRating } from "./utils";
function ShowCard({show}){
    //Summary Section
    const cleanSummary = stripHTML(show.summary);
    
    //Date Section
    const premiereDate = formatDate(show.premiered);
    
    //Last Updated Section
    const updated = formatUpdatedDate(show.updated);

    //Genre Section
    const genres = getGenres(show.genres);

    //Rating Section
    const rating = getRating(show.rating.average);

    /*
    A short list of main cast members, loaded with a second fetch request
    
    Optionally, the poster image with useful alternative text
    */




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
                const castUrl = `https://api.tvmaze.com/shows/${show.id}/cast`;
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
    },[show.id]);

return(
    <article>
        <h3><Link to={`/shows/${show.id}`}>{show.name}</Link></h3>
        <p>{cleanSummary.trim() ? cleanSummary : "No Summary Available"}</p>
        <p>Premiered: {premiereDate}</p>
        <p>Genres: {genres}</p>
        <p>Rating: {rating}</p>
        <p>Updated: {updated}</p>
        <a target="_blank" href={show.url}>See Show on TV Maze</a>
        <section>
            <h4>Cast</h4>
            {castLoading  === true ? <p>Cast Loading...</p> :
                (castError !== "" ? <p>{castError}</p> : 
                    (cast.length === 0 ? <p>No Cast Information Available</p> : 
                        cast.slice(0,5).map((member) => {
                            return <p key={member.person.id}>{member.person.name}</p>
                        })))}    
        </section>
    </article>
  );
}
export default ShowCard;