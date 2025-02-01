import {Link } from "react-router-dom";
import useUserDetailsData from "../../hooks/userHooks/useUserDetailsData.tsx";


export const UserDetailsPage = () => {

    const { user, userRecipes } = useUserDetailsData()

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
