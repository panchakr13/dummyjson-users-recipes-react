import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHooks/useAppSelector";
import "./Menu.css";

const Menu = () => {
    const { isAuthenticated, user } = useAppSelector((state) => state.authSlice);
    if (!isAuthenticated) return null;
    return (
        <div className="menu-container">
            <div className="header-box">
                {user?.image && <img src={user.image} alt={user.lastName} className="user-logo" />}
                <span className="username-span">{user?.firstName} {user?.lastName}</span>
            </div>
            <div className="welcome-promt">Welcome to Menu!</div>
            <div className='box-for-nav-links'></div>
            <div className="nav-links">
                <Link to="/users" className="nav-links">Users Page</Link>
                <Link to="/recipes" className="nav-links">Recipes Page</Link>
            </div>
        </div>
    );
};

export default Menu;
