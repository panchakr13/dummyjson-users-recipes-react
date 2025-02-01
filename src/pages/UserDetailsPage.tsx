import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { userSliceActions } from "../redux/slices/userSlice";
import { recipeSliceActions } from "../redux/slices/recipeSlice";

export const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const user = useAppSelector(({ userSlice }) =>
        userSlice.users.find((u) => u.id.toString() === id)
    );


    const userRecipes = useAppSelector(({ recipeSlice }) =>
        recipeSlice.recipes.filter((r) => r.userId.toString() === id)
    );

    useEffect(() => {
        if (!user) {
            dispatch(userSliceActions.loadUser({ id: Number(id) }));
        }

        if (!userRecipes.length) {
            dispatch(recipeSliceActions.loadRecipesByUserId({ userId: Number(id) }));
        }
    }, [dispatch, id, user, userRecipes.length]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <div>
            <h3>
                {user.id}. {user.firstName} {user.lastName}
            </h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>BirthDate: {user.birthDate}</p>
            <p>Country: {user.address.country}</p>
            <p>City: {user.address.city}</p>
            <p>Crypto: {user.crypto.coin}</p>

            <h4>Recipes by this user:</h4>
            {userRecipes.length ? (
                <ul>
                    {userRecipes.map((recipe) => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes found for this user.</p>
            )}
        </div>
    );
};
