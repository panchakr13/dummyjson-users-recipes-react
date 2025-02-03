import { Link } from "react-router-dom";
import { PaginationComponent } from "../../../components/pagination/PaginationComponent.tsx";
import SearchBar from "../../../components/searchBar/SearchBar.tsx";
import useRecipesData from "../../../hooks/recipeHooks/useRecipesData.tsx";
import './RecipesPage.css';

export const RecipesPage = () => {
    const { recipes, loadState } = useRecipesData();

    return (
        <div className="recipes-page-container">
            <div className="recipes-page-header">
                <nav className="nav-links-container">
                    <Link to="/users" className="nav-links-users-by-recipes-page">Users Page</Link>
                </nav>
                <h1 className="page-title">Recipes</h1>

                <SearchBar placeholder="Search recipes..." searchRoute="/recipes" />
            </div>
            {!loadState ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="recipes-list">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
                                {recipe.image && (
                                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                )}
                                <div className="recipe-info">
                                    <span className="recipe-name">{recipe.name}</span>
                                </div>
                            </Link>
                            <div className="recipe-tags">
                                {recipe.tags.map(tag => (
                                    <Link
                                        key={tag}
                                        to={`/recipes/tag/${tag}`}
                                        className="tag-link"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <PaginationComponent />
        </div>
    );
};
