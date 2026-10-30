# TV Show Gallery -- React

## Project Overview

This project is a 'React' TV show search application that uses "TVmaze API" -- (https://tvmaze.com/api) to display common information about tv shows. Users can search for a show and view up to ten matching results. Each card can be opened to a seperate details page for more information. The application starts with a default search of "Friends". It displays loading, error, empty-search and no result messages appropriately.

The project uses 'React' components and props, state hooks and effects, conditional rendering, key lists, and React Router. This is a React version of my earlier vanilla javascript TVmaze project.

## How to Run

1. Clone or download this repository
2. Open a terminal in the project folder
3. Install dependencies:  "npm install"
4. Start the developement server: "npm run dev"
5. Open the local URL displayed in your terminal

## React Requirements and their location

1. Components and Props

    Files: App.jsx, HomePage.jsx, SearchForm.jsx, ShowList.jsx, ShowCard.jsx, ShowDetails.jsx

    Description: Each of these components is defined in a seperate file. HomPage passes search props to SearchForm.jsx, and results to ShowList.jsx.  ShowList.jsx passes the individual show's ID to ShowCard.

2. Lists and stable keys

    Files: ShowList.jsx, ShowCard.jsx, ShowDetails.jsx

    Description: map() renders result cards with "result.show.id" as the key and cast members with "member.person.id" as the key, rather than array indecies.

3. Conditional Rendering

    Files:HomePage.jsx, SearchForm.jsx, ShowCard.jsx, ShowDetails.jsx

    Description:  Different messages/content appear for loading, request errors, empty input, no results, and successful results. Cast has its own status display also.

4. Controlled Form

    Files: SearchForm.jsx

    Description: The input uses value={query} and onChange to update state. The form uses onSubmit={handleSubmit} and calls event.preventDefault().

5. State with 'useState'

    Files: HomePage.jsx, SearchForm.jsx, ShowCard.jsx, ShowDetails.jsx

    Description: State stores query text, submitted search terms, results, loading/error status, cast data, and show details.

6. Effects and Fetch

    Files: HomePage.jsx, ShowCard.jsx, ShowDetails.jsx

    Description: HomePage.jsx fetches the initial Friends search and later searches onSubmit.  Each individual card fetches cast data in useEffect. All fetch handlers check some kind of response.ok before parsing JSON. response varies dependiong on which fetch. 

7. Lifted State

    Files: HomePage.jsx, SearchForm.jsx

    Description: HomePage.jsx owns the query, submitted term, and results. It passes setters to SearchForm.jsx, which then displays the current search term and result count ouside the input component.

8. React Router

    Files: Main.jsx, App.jsx, ShowCard.jsx, ShowDetails.jsx

    Description: BrowserRouter wraps the app. '/' and '/shows/:id' are the two routes. Link provides navigation, and useParams() reads ID on the details page. 

## Reflection