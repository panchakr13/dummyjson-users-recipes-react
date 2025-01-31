import {useAppSelector} from "../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {userSliceActions} from "../redux/slices/userSlice.ts";
import {Link, useSearchParams} from "react-router-dom";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";

export const UsersPage = () => {
    const {users,loadState} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAppDispatch();
    const [query] = useSearchParams();

    const skip = parseInt(query.get('skip') || '0', 10);
    const limit = 10;

    useEffect(() => {
        dispatch(userSliceActions.loadUsers({skip, limit}));
    }, [dispatch, skip]);

    return (
        <div>
            {!loadState && <div>Loading</div>}

            {
                users.map((user) => (
                    <div key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            {user.id} - {user.firstName} {user.lastName}
                        </Link>

                    </div>
                    ))
            }
            <PaginationComponent/>


        </div>
    );
};