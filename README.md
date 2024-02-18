## Introduction

- This is a small project which takes advantage of several API's to allow a user to select any number of locations on a map, store data
  about that location (notes) and view these places on a map via markers placed at the each location on the map.

## API'S (info on how the app was made)
The app owes it functionality to several Api's:
- React-leaflet API
 - It displays a map and allows data to be rendered and saved to map view (markers etc.) it also allows
   information like latitude and longitude to be collected from the event object (produced by leaflet) when the user clicks on the screen.
- The reverse Geo Code API provided by big data cloud.
  - This allows a user to submit latitude and longtitude co-ordinates to it and recieve various associated data back about that particular location.
- The geoLocation API on the navigator provided by the browser.
  - This allows the user to navigate to their current location (or another location can be set in the inspect menu under more tools => sensors =>       setLocation)
- A local json server 
  - Installed on the clients machine this enables the storing of map data locally.
  - The amount of data used here is quite small, so we can use a local Json server instead of storing it on a server somewhere else.
- The date picker API 
  - Provides the user with a menu to select a date from (when choosing a location to store). 
    This is a very commonly used API.

## Prerequisites

Before setting up and running the project, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) 

This is a Vite project so will not run using npm start. Instead you wil need to use "npm run dev" to run the project, but only after running the command "npm install" first. "npm install" will install vite as well as the other packages listed in the dependencies and devDependencies section of the package.json file. The process to follow is here again below:

## 1: Installation

1. Navigate to the project directory:
```
cd places-visited
```
2.  Install the required dependencies:
```
npm install
```
## 2: Running The App

1. Navigate to the project directory:
```
cd places-visited
```
2.  Run the Json Server:
```
npm run server
```
3.  Run the Application:
```
npm run dev
```

## Login and use the app
1: The application should not be running, you can login via the only functional tab which is the login tab and use the app:
 - you can select a place, make notes about it and then view the place on the map.
 - select as many places as you like.

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
