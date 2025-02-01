import { Link } from "react-router-dom";
import useRecipeDetailsData from "../../../hooks/recipeHooks/useRecipeDetailsData.tsx";
import './RecipeDetailsPage.css'

export const RecipeDetailsPage = () => {

    const { recipe } = useRecipeDetailsData()

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            <h3>Name: {recipe.name}</h3>
            <div>
                <img src={recipe.image} alt={recipe.name} width={200} />
            </div>
            <p>
                Ingredients:{" "}
                {Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join(", ")
                    : recipe.ingredients}
            </p>
            <p>
                Instructions:{" "}
                {Array.isArray(recipe.instructions)
                    ? recipe.instructions.join(", ")
                    : recipe.instructions}
            </p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>User ID: {recipe.userId}</p>

            <Link to={`/users/${recipe.userId}`}>View user details</Link>
        </div>
    );
};
