# Food and Hygiene API

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

### User story

As a user I want to see how food hygiene ratings are distributed by percentage across a selected Local Authority so that I can understand the profile of establishments in that authority.

## Method
Started off by getting the data from the api calls and saved to file. Built up the tests using this data and mocking the api calls to return said data while undergoing processing and storing of the data.

Once the data was processed, started to build up the UI. A module was created 'food-hygiene' and was added to the router module where it is lazy loaded for performance.

Another common form module was created and added to the 'food-hygiene' module calling 'forRoot()' to inject it.

The food-hygiene component comprises of 3 components to display the data:
- drop down menu
- Ratings
- Establishment list

Each has a status while loading - awaiting, loading, loaded and error which, display the appriate message for each until loaded. Once loaded it will display the component content eg. the list.


## Getting Started

cd into the project and run 'npm install'

## Testing
Run 'npm test' to start the tests.
The test don't call the api as they are mocked

## Run the project
Run 'ng serve' to start the server then open 'http://localhost:4200/' here you can view and drill into the data from the Food and Hygiene API.

The project makes use of the live API 'http://api.ratings.food.gov.uk/help'

## CSS
I have not added any CSS such as bootsrap or primeng as i hope this is enough to showcase my Angular skills. It could be done easily with more time.

