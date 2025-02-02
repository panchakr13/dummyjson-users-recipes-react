import {useAppDispatch} from "../../redux/reduxHooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/reduxHooks/useAppSelector.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";


const useRecipeData = () => {

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

    return { recipes, loadState };
};

export default useRecipeData;