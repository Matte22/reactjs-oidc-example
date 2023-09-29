React.js Authentication Example
===============================

This repository demonstrates the use of the OIDC-React library for authenticating and interacting with the stigman API.
This repo also shows basic useage of the React library. 

-   App.js: Contains base oidc code to authenicate with auth provider.
-   ManageToken.js: Provides insights on interacting with access tokens.
-   UserData.js: Demonstrates using the access token combined with scopes to interact with the stigman API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Prerequisites
-------------

-   [Node.js](https://nodejs.org/)

Available Scripts
-----------------

In the project directory, you can execute:

### `npm start`

-   Runs the app in development mode.
-   Access the app at [http://localhost:3000](http://localhost:3000/).
-   The app will hot-reload on saving changes.
-   Lint errors, if any, will be displayed in the console.

### `npm test`

-   Launches the test runner in interactive watch mode.
-   More on [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

-   Creates a production-ready build in the `build` folder.
-   Bundles React in production mode optimizing for best performance.
-   The build is minified, and filenames include hashes.
-   Ready for [deployment](https://facebook.github.io/create-react-app/docs/deployment)!

Documentation and References
----------------------------

-   [Stig-Manager Documentation](https://stig-manager.readthedocs.io/en/latest/index.html): Detailed docs on OIDC and Keycloak configuration.

-   [OIDC-React Documentation](https://www.npmjs.com/package/oidc-react): Understand the OIDC-React library used in this project.

-   [Stigman Docker Containers](https://hub.docker.com/r/nuwcdivnpt/stig-manager): Containers for Keycloak, API, and MySQL to connect to stigman instances. These can be used to communicate with a react.js client. 

Project Setup
-------------
```bash
git clone https://github.com/Matte22/reactjs-oidc-example.git
cd reactjs-oidc-example
npm ci
npm start # starts react app
```

Understanding Scopes
--------------------

Scopes determine the level of access privileges requested from users. They define which user information or actions the application seeks permission for.

For details on scopes used in the stig-manager application, refer to the [Stig-Manager Scopes Documentation](https://stig-manager.readthedocs.io/en/latest/installation-and-setup/authentication.html#id1).

Configuring Environment Variables
---------------------------------

Configure the React application for authentication and API interaction by setting environment variables:

-   REACT_APP_AUTH_CONNECT_URL: Connection URL for authentication (typically your OIDC provider).

    -   Default: `http://localhost:8080/realms/stigman`
-   REACT_APP_CLIENT_ID: Client ID registered with your OIDC provider.

    -   Default: `stig-manager`
-   REACT_APP_REDIRECT_URI: Post-authentication redirect URI.

    -   Default: `http://localhost:3000`
-   REACT_APP_AUTH_SCOPE: Defines access level requests.

    -   Default: `openid stig-manager:user:read`
-   REACT_APP_RESPONSE_TYPE: Authorization code flow type. Recommended:

    -   Default: `code`
-   REACT_APP_API_BASE Endpoint URL for Base data fetching.

    -   Default: `http://localhost:54000/api/`

To set these, create (or modify) a `.env` file in the root project directory. Add the variables and values, one per line.
