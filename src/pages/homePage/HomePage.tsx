import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHooks/useAppSelector";
import "./HomePage.css";
import Menu from "../../components/menu/Menu.tsx";

const HomePage = () => {
    const { isAuthenticated } = useAppSelector((state) => state.authSlice);
    if (!isAuthenticated) {
        return (
            <div className="homepage">
                <div className="login-message">
                    Please log in to view the content
                    <Link to="/login" className="login-link">Login Page</Link>
                </div>
            </div>
        );
    }
    return (
        <div className="homepage">
            <Menu />
        </div>
    );
};

export default HomePage;
