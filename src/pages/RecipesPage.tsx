import { useAppSelector } from "../redux/hooks/useAppSelector";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { recipeSliceActions } from "../redux/slices/recipeSlice";
import { PaginationComponent } from "../components/pagination/PaginationComponent";
import SearchBar from "../components/SearchBar";

export const RecipesPage = () => {
    const dispatch = useAppDispatch();
    const { recipes, loadState } = useAppSelector(({ recipeSlice }) => recipeSlice);

    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = 10;
    const queryParam = searchParams.get("q") || "";

    useEffect(() => {
        if (queryParam) {
            dispatch(recipeSliceActions.searchRecipes(queryParam));
        } else {
            dispatch(recipeSliceActions.loadRecipes({ skip, limit }));
        }
    }, [dispatch, skip, limit, queryParam]);

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
