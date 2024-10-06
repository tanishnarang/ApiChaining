# API Chaining

## Approach Explanation

**API Chaining** is a responsive web application built using **React.js** and **Tailwind CSS**. The project demonstrates the concept of API chaining, where the response from one API is used as the input or trigger for another API call. The application allows for dynamic API requests and responses, with features for editing and deleting JSON data in real time.

This project integrates several core technologies and libraries to handle API interactions, state management, and user interface elements.

## Features

- **API Chaining**: Demonstrates the chaining of multiple API requests, using one API's response as input for subsequent API calls.
- **Editable JSON View**: Utilizes the `react18-json-view` library to allow users to edit and view JSON data in an interactive, editable format.
- **Dynamic Request & Response**: Users can dynamically edit the API request data, and the application automatically updates the expected response.
- **Error Handling**: Includes error handling to manage issues that arise during API requests.
- **Responsive UI**: The application is styled using **Tailwind CSS**, ensuring a responsive and modern design that adapts to different screen sizes.

## Tech Stack

- **React.js**: Frontend library used to create the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **Axios**: Promise-based HTTP client used for making API requests.
- **Ant Design**: UI library used to enhance the visual components of the app.
- **Lodash**: Utility library used for data manipulation.
- **react18-json-view**: Library used to render and edit JSON objects directly in the UI.

## Usage

- On loading the application, select an API from the available list.
- Edit the API request JSON data in the left container.
- Observe the dynamically updated expected response on the right.
- Delete or edit individual JSON keys as needed.

## Project Structure

```bash
api-chaining/
├── public/
├── src/
│   ├── components/
│   │   ├── ApiList.js
│   │   ├── Dropdown.js
│   │   ├── RightContainer.js
│   ├── App.js
│   ├── index.js
├── package.json
└── README.md
```

- **`App.js`**: The main component that ties together the API list and response editor.
- **`ApiList.js`**: Renders the list of APIs available for chaining.
- **`Dropdown.js`**: Renders a Dropdown by gathering from Apilist.
- **`RightContainer.js`**: Displays and allows editing of both the API request and expected response.

## Assumptions and Decisions Made

Due to the differences present between the description and the video i have assumed the approach of the video to be followed for the development of this demo.
