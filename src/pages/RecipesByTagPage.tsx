import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { recipeSliceActions } from "../redux/slices/recipeSlice";
import SearchBar from "../components/SearchBar";

export const RecipesByTagPage = () => {
    const { tag } = useParams<{ tag: string }>();
    const dispatch = useAppDispatch();
    const { recipes, loadState } = useAppSelector(({ recipeSlice }) => recipeSlice);

    useEffect(() => {
        if (tag) {
            dispatch(recipeSliceActions.searchRecipesByTag(tag));
        }
    }, [dispatch, tag]);

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
