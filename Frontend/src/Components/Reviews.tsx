import { useState, useEffect } from "react";

type Review = {
    id: number,
    dateTime: string,
    rating: number,
    isPublic: boolean,
    body: string,
    admins: string[],
    reports: string[]
};

function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    if (reviews.length == 0) {
        return <p>No reviews found</p>;
    }

    setReviews([...reviews]);

    return (
        <>
            {reviews.map((review) => {
                <div key={review.id}>
                    <li key={review.id}>{review.body}</li>
                </div>
            })}
        </>
    );
}

export default Reviews;