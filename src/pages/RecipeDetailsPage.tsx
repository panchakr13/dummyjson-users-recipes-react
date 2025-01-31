import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector.tsx";

export const RecipeDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const recipe = useAppSelector(({ recipeSlice }) =>
        recipeSlice.recipes.find((u) => u.id.toString() === id)
    );

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <div>
            <h3>{recipe.id} - {recipe.name}</h3>
            <p></p>
        </div>
    );
};
