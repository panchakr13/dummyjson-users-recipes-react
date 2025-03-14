import {useAppDispatch} from "../../redux/reduxHooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/reduxHooks/useAppSelector.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {userSliceActions} from "../../redux/slices/userSlice.ts";

const useUsersData = () => {

    const dispatch = useAppDispatch();
    const { users, loadState } = useAppSelector(({ userSlice }) => userSlice);

    const [ searchParams ] = useSearchParams();
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

    return { users, loadState }
};

export default useUsersData;