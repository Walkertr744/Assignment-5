import { useState, useEffect } from "react";

function ShowCard({show}){
    //Summary Section
    const temp = document.createElement("div");
    let cleanSummary = "";
    if(show.summary !== null){
        temp.innerHTML = show.summary;
        cleanSummary = temp.textContent;
    }

    //Date Section
    const premierDate = new Date(show.premiered);
    let formattedDate = premierDate.toLocaleDateString("en-US",{
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    if(show.premiered == null || show.premiered ==""){
        formattedDate = "No premiere date available";
    }
    
    //Genre Section
        let genres = show.genres;
    if(show.genres === null || show.genres.length === 0){
        genres = "No Genres Available"
    }
    else{
        genres = show.genres.join(", ");
    }

    //Rating Section
    let rating = show.rating.average;
    if(rating === null){
        rating = "No Rating Available";
    }
    else{
        rating = rating + "⭐";
    }
    
    //Last Updated Section
    const updated = new Date(show.updated * 1000).toLocaleString("en-US",{
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

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
        <h3>{show.name}</h3>
        <p>{cleanSummary.trim() ? cleanSummary : "No Summary Available"}</p>
        <p>Premiered: {formattedDate}</p>
        <p>Genres: {genres}</p>
        <p>Rating: {rating}</p>
        <p>Last Updated: {updated}</p>
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