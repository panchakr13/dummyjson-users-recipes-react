import { useAppSelector } from "../redux/hooks/useAppSelector";
import { useAppDispatch } from "../redux/hooks/useAppDispatch";
import { useEffect} from "react";
import { userSliceActions } from "../redux/slices/userSlice";
import { Link, useSearchParams } from "react-router-dom";
import { PaginationComponent } from "../components/pagination/PaginationComponent";
import SearchBar from "../components/SearchBar"; // Імпортуємо SearchBar

export const UsersPage = () => {
    const dispatch = useAppDispatch();
    const { users, loadState } = useAppSelector(({ userSlice }) => userSlice);

    const [searchParams] = useSearchParams();
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = 10;
    const queryParam = searchParams.get("q") || "";

    useEffect(() => {
        if (queryParam) {
            dispatch(userSliceActions.searchUsers(queryParam));
        } else {
            dispatch(userSliceActions.loadUsers({ skip, limit }));
        }
    }, [dispatch, skip, limit, queryParam]);

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


