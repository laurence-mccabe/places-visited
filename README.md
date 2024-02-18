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
2: Run the Json server: npm run server
3: Run the application: npm run dev

The application should run after this.
Except for the login tab in the nav menu, all tabs are not providing any functionality.

the directory structure is as follows:

## Folder structure:
```
.
├── assets
│ └── react.svg
├── components
│ ├── AppNav.jsx
│ ├── AppNav.module.css
│ ├── BackButton.jsx
│ ├── Button.jsx
│ ├── Button.module.css
│ ├── City.jsx
│ ├── City.module.css
│ ├── CityItem.jsx
│ ├── CityItem.module.css
│ ├── CityList.jsx
│ ├── CityList.module.css
│ ├── CountryItem.jsx
│ ├── CountryItem.module.css
│ ├── CountryList.jsx
│ ├── CountryList.module.css
│ ├── Form.jsx
│ ├── Form.module.css
│ ├── Map.jsx
│ ├── Map.module.css
│ ├── Message.jsx
│ ├── Message.module.css
│ ├── PageNav.jsx
│ ├── PageNav.module.css
│ ├── SideBar.jsx
│ ├── SideBar.module.css
│ ├── Spinner.jsx
│ ├── Spinner.module.css
│ ├── SpinnerFullPage.jsx
│ ├── SpinnerFullPage.module.css
│ ├── User.jsx
│ └── User.module.css
├── contexts
│ ├── CitiesContext.jsx
│ └── FakeAuthContext.jsx
├── hooks
│ ├── useGeoLocation.js
│ └── useUrlPosition.js
├── Pages
│ ├── AppLayout.jsx
│ ├── AppLayout.module.css
│ ├── Homepage.jsx
│ ├── Homepage.module.css
│ ├── Login.jsx
│ ├── Login.module.css
│ ├── PageNotFound.jsx
│ ├── Pricing.jsx
│ ├── Product.jsx
│ ├── Product.module.css
│ └── ProtectedRoute.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```



\*Update 14.8.23:
The app must now be accessed via the login page (nav menu) first, simply hit login to access the app.
Login functionality (serverless) has now been implemented, which means you cannot access the app unless you have logged in.
Logging out will log you out and return you to the main page, from there you will again need to login to return to the app.
Trying to access the app without logging in will redirect you to the login page.
