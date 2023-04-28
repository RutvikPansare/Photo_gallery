
## What the app does
Shows curated images from the Pexels API. Also allows users to search for images.


## Runtime Instructions
This webapp uses external apis and keys which should be defined in local runtime environments.

API key to access the Pexels is stored in the directory server/.env with variable KEY.

Steps to install and run the app:

## Node instructions
In the root directory run:

1.`npm install` to install all the dependencies
2.`npm start` to start the front-end server.

In the "server" directory run:

1.`npm install` to install all the dependencies
2.`npm start` to start the back-end server.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Unit test instructions

We are using the Jest library to run react unit tests.

Steps to run the test:
1. Run `npm test` to run all the tests.

Note: currently the tests are not being able to run due to conversion error caused by Babel and need to be fixed.
The placeholder components fails to load before the images are fully loaded and need to be fixed. Currently all the images are lazily loaded.

