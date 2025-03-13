# React + TypeScript + Vite

# DummyJSON React-Redux Application

This project is a web application built with **React** and **Redux** that utilizes
the [DummyJSON API](https://dummyjson.com/docs) to display and manage data about users and recipes. The application
features a dynamic interface, user authentication, paginated lists, and search functionality.

Take the username and password from the DummyJSON API, for example: </br>  
**username: emilys </br> password: emilyspass**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
    - [Home Page](#home-page)
    - [Users Page](#users-page)
    - [Recipes Page](#recipes-page)
    - [Recipe Details Page](#recipe-details)
    - [User Details Page](#user-details)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Future Improvements](#future-improvements)

## Features

- **Authentication:**
    - Allows users to log in using credentials from DummyJSON.
    - Post-login, the menu updates dynamically to include options for Users and Recipes pages.
    - Displays the user's profile picture/logo in the menu after login.

- **Menu:**
    - Adaptive navigation menu:
        - For unauthenticated users: Only shows the login page.
        - For authenticated users: Displays links to Users, Recipes, and the user's logo.

- **Search Functionality:**
    - Allows searching for users or recipes by name, tags, or ID.
    - Context-aware search:
        - On the Users page: Searches for users.
        - On the Recipes page: Searches for recipes.

- **Pagination:**
    - Ensures smooth navigation by splitting data into manageable pages.
    - Pagination is implemented for both users and recipes lists.

- **Pages Overview:**
    - **Home Page:** Default page for unauthenticated users, prompting them to log in.
    - **Authentication Page:** Login form to authenticate users via the DummyJSON API.
    - **Users Page:** Displays a paginated list of users. Clicking on a user shows detailed information and their
      recipes.
    - **Recipes Page:** Displays a paginated list of recipes with titles and tags. Clicking on a recipe shows detailed
      information.
    - **Recipe Details Page:** Detailed view of a recipe with a link to the creator's profile.
    - **Tag Filtering:** Recipes can be filtered by clicking on tags.

- **State Management:**
    - The application state is managed using Redux with slices for modularity.

## Tech Stack

- **Frontend Framework:** React
- **State Management:** Redux Toolkit
- **Routing:** React Router
- **Styling:** CSS/SCSS (or a preferred CSS framework)
- **API:** DummyJSON
- **Build Tool:** Vite

## Project Structure

src/
├── assets/ # Static assets (images, icons, etc.)
├── components/ # Reusable components
│ ├── layouts/ # Layout-related components
│ ├── menu/ # Navigation menu components
│ ├── pagination/ # Pagination component
│ ├── searchBar/ # Search bar component
├── hooks/ # Custom React hooks
├── models/ # Data models and TypeScript types
├── pages/ # Application pages
│ ├── homePage/ # Home page (for unauthenticated users)
│ ├── loginPage/ # Authentication page
│ ├── recipePages/ # Recipes-related pages (list, details)
│ ├── userPages/ # Users-related pages (list, details)
├── redux/ # Redux setup and slices
│ ├── slices/ # Redux slices for users, recipes, authentication, etc.
│ ├── reduxHooks/ # Custom hooks for Redux (e.g., useSelector, useDispatch)
├── router/ # Application routing configuration
├── services/ # API services (e.g., authentication, users, recipes)
├── styles/ # Global or shared styles
├── utils/ # Helper functions or utilities
└── App.tsx # Main application file

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v14 or later)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/panchakr13/dummyjson-users-recipes-react.git

2. Install dependecies:
   npm i

3. Start the development server:
   npm run dev

4. Open the application in your browser:
   http://localhost:5173/

## Usage

### Home Page

- Displays a welcome message prompting unauthenticated users to log in.

### Authentication Page

- Contains form inputs for username and password.
- Utilizes the DummyJSON API for login.
- Updates the menu and application state upon successful authentication.

### Users Page

- Displays a paginated list of users with basic information (e.g., name, email, age).
- Clicking on a user opens a detailed view that includes:
    - Additional fields (7–10 fields based on the user object).
    - A list of recipes created by the user.

### Recipes Page

- Displays a paginated list of recipes showing:
    - Titles.
    - Tags.
- Clicking on a recipe opens a detailed view with:
    - Full recipe information.
    - A link to the creator's user profile.
- Tag filtering allows users to explore recipes with similar tags.

### Recipe Details

- Provides full details about a specific recipe.
- Includes a link to the creator's detailed user profile.
- Tag filtering is available for exploring recipes with matching tags.

### User Details

- Displays a detailed user profile view.
- Includes:
    - Additional user fields (7–10 fields).
    - A list of recipes created by the user.

---

### API Integration

- The project uses the DummyJSON API to fetch data about users and recipes.
- Key endpoints include:
    - **Authentication:** `/auth/login`
    - **Users:** `/auth/users`
    - **Recipes:** `/auth/recipes`

- Refer to the [DummyJSON Documentation](https://dummyjson.com/docs) for additional endpoints and query options.

---

### State Management

- The project uses **Redux Toolkit** to manage the global state.
- **State slices** include:
    - **Authentication Slice:** Manages user login/logout state.
    - **Users Slice:** Handles user data and pagination.
    - **Recipes Slice:** Handles recipe data, filters, and pagination.

---

### Future Improvements

- **Error Handling:** Add user-friendly error messages for API failures.
- **Dark Mode:** Provide a theme toggle for better user experience.
- **Unit Tests:** Integrate tests using Jest and React Testing Library.
- **Responsive Design:** Optimize the application for mobile and tablet views.

---


   





