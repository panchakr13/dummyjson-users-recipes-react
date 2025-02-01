import { Link } from "react-router-dom";
import SearchBar from "../../../components/searchBar/SearchBar.tsx";
import useRecipeByTagData from "../../../hooks/recipeHooks/useRecipeByTagData.tsx";
import './RecipesByTagPage.css'

export const RecipesByTagPage = () => {

    const { tag, recipes, loadState } = useRecipeByTagData()

    return (
        <div>
            <h3>Recipes with tag: {tag}</h3>
            <SearchBar placeholder="Search recipes..." searchRoute="/recipes" />

            {!loadState && <div>Loading</div>}

            {recipes.map((recipe) => (
                <div key={recipe.id} className="div-for-recipes">
                    <Link to={`/recipes/${recipe.id}`}>
                        <p className="recipe-name">{recipe.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};
