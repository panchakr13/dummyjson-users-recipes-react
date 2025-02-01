import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainLayout} from "../components/layouts/MainLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {UsersPage} from "../pages/userPages/UsersPage.tsx";
import {UserDetailsPage} from "../pages/userPages/UserDetailsPage.tsx";
import {RecipesPage} from "../pages/recipePages/RecipesPage.tsx";
import {RecipeDetailsPage} from "../pages/recipePages/RecipeDetailsPage.tsx";
import {RecipesByTagPage} from "../pages/recipePages/RecipesByTagPage.tsx";

const routes: RouteObject[] = [
    {
        path: '/', element: <MainLayout/>, children: [
            {index:true, element: <HomePage/>},
            {path:'login', element: <LoginPage/>},
            {path:'users', element: <UsersPage/>},
            {path:'users/:id', element: <UserDetailsPage/>},
            {path:'recipes', element:<RecipesPage/>},
            {path:'recipes/:id', element:<RecipeDetailsPage/>},
            {path:'recipes/tag/:tag', element:<RecipesByTagPage/>}
        ]
    }
];
export const router = createBrowserRouter(routes);