import { Link } from "react-router-dom";
import SearchBar from "../../../components/searchBar/SearchBar.tsx";
import useRecipeByTagData from "../../../hooks/recipeHooks/useRecipeByTagData.tsx";
import './RecipesByTagPage.css';

export const RecipesByTagPage = () => {
    const { tag, recipes, loadState } = useRecipeByTagData();

    return (
        <div className="recipes-by-tag-container">
            <div className="recipes-by-tag-header">
                <nav className="nav-links-container-by-tag">
                    <Link to="/users" className="nav-links-by-tag">Users Page</Link>
                    <Link to="/recipes" className="nav-links-by-tag">Recipes Page</Link>
                </nav>
            </div>
                <SearchBar placeholder="Search recipes..." searchRoute="/recipes"/>
            <h2 className="tag-title">Recipes with tag: <span className="tag-highlight">#{tag}</span></h2>
            {!loadState ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="recipes-list-by-tag">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card-by-tag">
                            <Link to={`/recipes/${recipe.id}`} className="recipe-name-by-tag">
                                {recipe.name} <img src={recipe.image} alt={recipe.name}/>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
