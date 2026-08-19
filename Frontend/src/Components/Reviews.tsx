import { useState, useEffect } from "react";

function Reviews() {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <>
          <p>{reviews}</p>
        </>
    );
}

export default Reviews;