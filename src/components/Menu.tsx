import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector.tsx";

const Menu = () => {
    const location = useLocation();
    const { isAuthenticated, user } = useAppSelector((state) => state.authSlice);

    return (
        <ul>
            {location.pathname !== "/" && <li><Link to="/">Back to homepage</Link></li>}

            {isAuthenticated ? (
                <>
                    <li>
                        <div>
                            {user && (
                                <span>
                  Welcome, {user.firstName}
                                    {user.image && <img src={user.image} alt="User Avatar" width={30} height={30} />}
                </span>
                            )}
                        </div>
                    </li>
                    {location.pathname !== "/users" && <li><Link to="/users">Users Page</Link></li>}
                    {location.pathname !== "/recipes" && <li><Link to="/recipes">Recipes Page</Link></li>}
                </>
            ) : (
                <>
                    {location.pathname !== "/login" && <li><Link to="/login">Login Page</Link></li>}
                </>
            )}
        </ul>
    );
};

export default Menu;
