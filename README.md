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
 
Converting my original TVmaze project from vanilla JavaScript to React certainly made the application easier to organize, but other parts definitely took more time to understand. In vanilla JS, I would create elements dirctly and append them to the page, which creatde a tedious process. However, with React, I was able to organize components why what they should look like based on a current state.  Also, splitting the search form, results list, showcards, and details page into seperate projects also made the organization easier to follow, read, and maintain.  I think the area where I struggled the most was knowing when to use "useEffect".  I would also say that fetching cast for every showcard was challenging because every card would need its own loading, error, and cast state.  React Router was difficult at first, but I would say is an easier method of navigation than before.  Most of the shared states live in HomePage.jsx, because both the search form, and display of results depend on it. The form receives the query and setter functions as props. While individual cards keep their own cast state because that information is show specific. This structure was aimed to keep the related state as close to where it was needed at any given point. 