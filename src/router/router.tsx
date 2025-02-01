import {createBrowserRouter, RouteObject} from "react-router-dom";
import {MainLayout} from "../components/layouts/MainLayout.tsx";
import HomePage from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {UserDetailsPage} from "../pages/UserDetailsPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {RecipeDetailsPage} from "../pages/RecipeDetailsPage.tsx";
import {RecipesByTagPage} from "../pages/RecipesByTagPage.tsx";

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