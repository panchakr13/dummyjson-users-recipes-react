import { Link } from "react-router-dom";
import { PaginationComponent } from "../../../components/pagination/PaginationComponent";
import SearchBar from "../../../components/searchBar/SearchBar";
import useUsersData from "../../../hooks/userHooks/useUsersData.tsx";
import "./UsersPage.css";

export const UsersPage = () => {
    const { users, loadState } = useUsersData();

    return (
        <div className="users-page-container">
            <div className="users-page-header">
                <div className="nav-links-by-users-page">
                    <Link to="/recipes" className="nav-link-recipes-by-users-page">Recipes Page</Link>
                </div>
                <SearchBar placeholder="Search users..." searchRoute="/users" />
            </div>
            {!loadState ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="users-list">
                    {users.map((user) => (
                        <Link key={user.id} to={`/users/${user.id}`} className="user-card">
                            <div className="user-info">
                                <span className="user-id">{user.id}.</span>
                                <span className="user-name">{user.firstName} {user.lastName}</span>
                            </div>
                            {user.image && (
                                <img src={user.image} alt={user.lastName} className="user-avatar" />
                            )}
                        </Link>
                    ))}
                </div>
            )}
            <div className="pagination-wrapper-in-users-page">
                <PaginationComponent />
            </div>
        </div>
    );
};
