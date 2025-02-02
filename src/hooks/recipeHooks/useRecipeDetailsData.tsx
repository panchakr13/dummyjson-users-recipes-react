import {useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/reduxHooks/useAppSelector.tsx";


const useRecipeDetailsData = () => {

    const { id } = useParams<{ id: string }>();
    const recipe = useAppSelector(({ recipeSlice }) =>
        recipeSlice.recipes.find((r) => r.id.toString() === id)
    );

    return { recipe }
};

export default useRecipeDetailsData;