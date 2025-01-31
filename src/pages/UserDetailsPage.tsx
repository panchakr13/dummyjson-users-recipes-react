import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector.tsx";

export const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const user = useAppSelector(({ userSlice }) =>
        userSlice.users.find((u) => u.id.toString() === id)
    );

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>BirthDate: {user.birthDate}</p>
            <p></p>
        </div>
    );
};
