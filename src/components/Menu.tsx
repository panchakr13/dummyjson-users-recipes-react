import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <ul>
            <li><Link to={'/'}>Home Page</Link></li>
            <li><Link to={'/login'}>login page</Link></li>
            <li><Link to={'users'}>Users Page</Link></li>
            <li><Link to={'recipes'}>Recipes Page</Link></li>
        </ul>
    );
};

export default Menu;