# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- This is a small project which takes advantage of several API's to allow a user to select any number of locations on a map, store data 
    about that location (notes) and view these places on a map via markers.
  
- This is achieved through the use of 2 main API's:
- 1: The React-leaflet API which displays a map and allows data to be rendered and saved to map view (markers etc.) it also allows 
    information like latitude and longitude to be collected from the event object (produced by leaflet) when the user clicks on the screen.
- 2: The reverse Geo Code API provided by big data cloud which allows a user to submit lat and lng co-ordinates to recieve data back about 
   that particular location.
  
- The geoLocation API on the navigator provided in most modern browsers is also used to allow the user to navigate to their current 
    location (or another location can be set in the inspect menu under more tools => sensors => setLocation)
- A local json server installed on the client enables the storing of map data locally. 
- The date picker API is also used which provides the user with a menu to select a date from (when choosing a location to store). This is a 
    very commonly used API.

This is a Vite project so will not run using npm start. So you wil need to use "npm run dev" to run the project, but only after running the command "npm install first". "npm install" wil install vite as well as the other packages listed in the dependencies and dedevDependencies section of the package.json file.

After downloading the repository and navigating to the root directory, you will need to run the following commands in the terminal:
1: Install Node Package Manager: npm install
2: Run the Json server:          npm run server
3: Run the application:          npm run dev

The application should run after this. 
The homepage is just a dummy page. ** Click on the button "Start tracking now" at the bottom of the homepage to start using the application. **
