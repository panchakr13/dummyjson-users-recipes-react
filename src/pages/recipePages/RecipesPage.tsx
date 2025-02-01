import { Link } from "react-router-dom";
import { PaginationComponent } from "../../components/pagination/PaginationComponent.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import useRecipeData from "../../hooks/recipeHooks/useRecipeData.tsx";

export const RecipesPage = () => {

    const { recipes, loadState } = useRecipeData()

    return (
        <div>
            <SearchBar placeholder="Search recipes..." searchRoute="/recipes" />

            {!loadState && <div>Loading</div>}

            {recipes.map((recipe) => (
                <div key={recipe.id} className="div-for-recipes">
                    <Link to={`/recipes/${recipe.id}`}>
                        <p className="recipe-name">{recipe.name}</p>
                    </Link>
                    <p className="recipe-tags">
                        {recipe.tags.map(tag => (
                            <Link
                                key={tag}
                                to={`/recipes/tag/${encodeURIComponent(tag)}`}
                                style={{ marginRight: "8px", textDecoration: "underline" }}
                            >
                                {tag}
                            </Link>
                        ))}
                    </p>
                </div>
            ))}
            <PaginationComponent />
        </div>
    );
};

//
