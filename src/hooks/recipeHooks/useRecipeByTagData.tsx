import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/reduxHooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/reduxHooks/useAppSelector.tsx";
import {useEffect} from "react";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";

const useRecipeByTagData = () => {

    const { tag } = useParams<{ tag: string }>();
    const dispatch = useAppDispatch();
    const { recipes, loadState } = useAppSelector(({ recipeSlice }) => recipeSlice);

    useEffect(() => {
        if (tag) {
            dispatch(recipeSliceActions.searchRecipesByTag(tag));
        }
    }, [dispatch, tag]);

    return { tag, recipes, loadState }
};

export default useRecipeByTagData;