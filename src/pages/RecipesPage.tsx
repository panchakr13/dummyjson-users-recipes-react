import {useAppSelector} from "../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {recipeSliceActions} from "../redux/slices/recipeSlice.ts";

export const RecipesPage = () => {
    const {recipes,loadState} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipes());
    }, [dispatch]);

    return (
        <div>
            {!loadState && <div>Loading</div>}

            {
                recipes.map((recipe) => (
                    <div key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.id} - {recipe.tags}
                        </Link>

                    </div>
                ))
            }

        </div>
    );
};