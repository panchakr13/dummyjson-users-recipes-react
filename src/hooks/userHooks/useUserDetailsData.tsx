import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useEffect} from "react";
import {userSliceActions} from "../../redux/slices/userSlice.ts";
import {recipeSliceActions} from "../../redux/slices/recipeSlice.ts";


export const useUserDetailsData = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const user = useAppSelector(({ userSlice }) =>
        userSlice.users.find((u) => u.id.toString() === id)
    );


    const userRecipes = useAppSelector(({ recipeSlice }) =>
        recipeSlice.recipes.filter((r) => r.userId.toString() === id)
    );

    useEffect(() => {
        if (!user) {
            dispatch(userSliceActions.loadUser({ id: Number(id) }));
        }

        if (!userRecipes.length) {
            dispatch(recipeSliceActions.loadRecipesByUserId({ userId: Number(id) }));
        }
    }, [dispatch, id, user, userRecipes.length]);


    return { user, userRecipes }
};

export default useUserDetailsData;