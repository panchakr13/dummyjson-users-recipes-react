import { useSearchParams } from "react-router-dom";

const LIMIT = 10; // Кількість користувачів на сторінку

export const PaginationComponent = () => {
    const [query, setQuery] = useSearchParams({ skip: '0' });

    const skip = parseInt(query.get('skip') || '0', 10);

    const handlePrev = () => {
        if (skip >= LIMIT) {
            setQuery({ skip: (skip - LIMIT).toString() });
        }
    };

    const handleNext = () => {
        setQuery({ skip: (skip + LIMIT).toString() });
    };

    return (
        <div>
            <button onClick={handlePrev} disabled={skip === 0}>Prev</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};
