import {useAppSelector} from "../redux/hooks/useAppSelector.tsx";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {userSliceActions} from "../redux/slices/userSlice.ts";
import {Link} from "react-router-dom";

export const UsersPage = () => {
    const {users,loadState} = useAppSelector(({userSlice}) => userSlice);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(userSliceActions.loadUsers());
    }, [dispatch]);

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


        </div>
    );
};