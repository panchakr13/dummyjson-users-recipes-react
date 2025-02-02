import { useSearchParams } from "react-router-dom";
import "./PaginationComponent.css";

const limit = 10;

export const PaginationComponent = () => {
    const [query, setQuery] = useSearchParams({ skip: "0" });
    const skip = parseInt(query.get("skip") || "0", 10);

    const handlePrev = () => {
        if (skip >= limit) {
            setQuery({ skip: (skip - limit).toString() });
        }
    };

    const handleNext = () => {
        setQuery({ skip: (skip + limit).toString() });
    };

    return (
        <div className="pagination">
            <button className="pagination-btn" onClick={handlePrev} disabled={skip === 0}>
                Prev
            </button>
            <button className="pagination-btn" onClick={handleNext}>
                Next
            </button>
        </div>
    );
};

