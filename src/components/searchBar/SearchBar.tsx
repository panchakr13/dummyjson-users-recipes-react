import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

interface SearchBarProps {
    placeholder?: string;
    searchRoute: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = "Search...", searchRoute }) => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`${searchRoute}?q=${searchText}&skip=0`);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholder}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;

