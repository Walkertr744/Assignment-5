export function stripHTML(html){
    if(html === null || html === ""){
        return "No summary available";
    }
    const temp = document.createElement("div");
    temp.innerHTML = html;
    html= temp.textContent;
    return html;
}

export function formatDate(date){
    let formattedDate = "No premiere date available";
    if(date !== null && date !== ""){
        const premiereDate = new Date(date);
        formattedDate = premiereDate.toLocaleDateString("en-US",{
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }
    return formattedDate;
}

export function formatUpdatedDate(time){
    if(time === null || time === ""){
        return "No last updated information available";
    }
    return (new Date(time * 1000).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    }));
}

export function getGenres(genre){
    if (genre === null || genre.length === 0){
        return "No genres available";
    }
    return genre.join(", ");
}

export function getRating(rate){
    if(rate === null || rate === ""){
        return "No rating available";
    }
    return rate + "⭐";
}

export function getImage(img,size){
    if(img === null){
        return null;
    }
    return img[size];
}