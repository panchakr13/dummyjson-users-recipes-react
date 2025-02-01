//
//
// const HomePage = () => {
//     return (
//         <div>
//             {/*<Outlet/>*/}
//         </div>
//     );
// };
//
// export default HomePage;

import { useAppSelector } from '../redux/hooks/useAppSelector.tsx';

const HomePage = () => {
    const { isAuthenticated } = useAppSelector((state) => state.authSlice);

    return (
        <div>
            {isAuthenticated ? (
                <div>Welcome to the Home Page!</div>
            ) : (
                <div>Please log in to view the content</div>
            )}
        </div>
    );
};

export default HomePage;
