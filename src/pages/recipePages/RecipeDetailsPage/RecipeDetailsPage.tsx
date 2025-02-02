import { Link } from "react-router-dom";
import useRecipeDetailsData from "../../../hooks/recipeHooks/useRecipeDetailsData.tsx";
import './RecipeDetailsPage.css';
//
export const RecipeDetailsPage = () => {
    const { recipe } = useRecipeDetailsData();

    if (!recipe) {
        return <div className="not-found">Recipe not found</div>;
    }

    return (
        <div className="recipe-details-container">
            <div className="navigation-links-recipe-details">
                <Link to="/users" className="nav-links-recipe-details">Users Page</Link>
                <Link to="/recipes" className="nav-links-recipe-details">Recipes Page</Link>
            </div>
            <div className="recipe-card-details">
                <img src={recipe.image} alt={recipe.name} className="recipe-image-details" />
                <div className="recipe-content-details">
                    <h3 className="recipe-name-details">{recipe.name}</h3>
                    <div className="recipe-meta-details">
                        <span>Serves: {recipe.servings || 2}</span>
                        <span>Time: {recipe.cookTimeMinutes || '20 minutes'}</span>
                        <span className="recipe-difficulty-details">{recipe.difficulty}</span>
                    </div>
                    <div className="recipe-ingredients-details">
                        <h4>Ingredients</h4>
                        <ul>
                            {Array.isArray(recipe.ingredients)
                                ? recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
                                : <li>{recipe.ingredients}</li>}
                        </ul>
                    </div>
                    <div className="recipe-directions-details">
                        <h4>Directions</h4>
                        <ol>
                            {Array.isArray(recipe.instructions)
                                ? recipe.instructions.map((step, index) => <li key={index}>{step}</li>)
                                : <li>{recipe.instructions}</li>}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
};