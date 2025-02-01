
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks/useAppSelector.tsx';

const Menu = () => {
    const location = useLocation();  // Отримуємо поточний шлях
    const { isAuthenticated, user } = useAppSelector((state) => state.authSlice);

    return (
        <ul>
            {/* Якщо поточна сторінка не є Home, то показуємо лінку на Home */}
            {location.pathname !== '/' && <li><Link to="/">Home Page</Link></li>}

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
                    <li><Link to="/users">Users Page</Link></li>
                    <li><Link to="/recipes">Recipes Page</Link></li>
                </>
            ) : (
                <li><Link to="/login">Login Page</Link></li>
            )}
        </ul>
    );
};

export default Menu;
