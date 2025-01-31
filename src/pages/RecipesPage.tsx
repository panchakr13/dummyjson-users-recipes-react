import {useAppSelector} from "../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {recipeSliceActions} from "../redux/slices/recipeSlice.ts";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";

export const RecipesPage = () => {
    const {recipes,loadState} = useAppSelector(({recipeSlice}) => recipeSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    const skip = parseInt(query.get('skip') || '0', 10);
    const limit = 10;

    useEffect(() => {
        dispatch(recipeSliceActions.loadRecipes({skip, limit}));
    }, [dispatch, skip]);

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
            <PaginationComponent/>

        </div>
    );
};