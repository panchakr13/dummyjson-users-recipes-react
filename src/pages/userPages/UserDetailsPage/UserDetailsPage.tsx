import { Link } from "react-router-dom";
import useUserDetailsData from "../../../hooks/userHooks/useUserDetailsData.tsx";
import './UserDetailsPage.css';

export const UserDetailsPage = () => {
    const { user, userRecipes } = useUserDetailsData();

    if (!user) {
        return <div className="loading">Loading user...</div>;
    }

    return (
        <div className="user-details-container">
            <div className="user-details-header">
                <div className="nav-links-by-details-page">
                    <Link to="/users" className="nav-links-by-details-page">Users Page</Link>
                    <Link to="/recipes" className="nav-links-by-details-page">Recipes Page</Link>
                </div>
            </div>

            <div className="user-info-by-details-page">
                {user.image && (
                    <img src={user.image} alt={user.firstName} className="user-avatar-by-details-page" />
                )}

                <h3>{user.firstName} {user.lastName}</h3>
                <p><strong>ID: </strong>{user.id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>BirthDate:</strong> {user.birthDate}</p>
                <p><strong>Country:</strong> {user.address.country}</p>
                <p><strong>City:</strong> {user.address.city}</p>
            </div>

            <div className="recipe-list-by-details-page">
                <h4>Recipes by this user:</h4>
                {userRecipes.length ? (
                    <ul>
                        {userRecipes.map((recipe) => (
                            <li key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`} className="recipe-link-by-details-page">
                                    {recipe.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No recipes found for this user.</p>
                )}
            </div>
        </div>
    );
};
