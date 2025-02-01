
import { Link } from "react-router-dom";
import { PaginationComponent } from "../../components/pagination/PaginationComponent.tsx";
import SearchBar from "../../components/SearchBar.tsx";
import useUserData from "../../hooks/userHooks/useUserData.tsx";

export const UsersPage = () => {

    const { users, loadState } = useUserData()

    return (
        <div>
            <SearchBar placeholder="Search users..." searchRoute="/users" />

            {!loadState && <div>Loading</div>}

            {users.map((user) => (
                <div key={user.id}>
                    <Link to={`/users/${user.id}`}>
                        {user.id}. {user.firstName} {user.lastName}
                        {user.image && <img src={user.image} alt={user.lastName} width={40} />}
                    </Link>
                </div>
            ))}
            <PaginationComponent />
        </div>
    );
};


