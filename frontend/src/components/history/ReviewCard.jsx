import { useNavigate } from "react-router-dom";

function ReviewCard({ review }) {
    const navigate = useNavigate();

    // Check both _id (MongoDB) and id formats safely
    const reviewId = review?._id || review?.id;

    const handleClick = () => {
        if (reviewId) {
            navigate(`/review/${reviewId}`);
        } else {
            console.error("Review ID is missing on this card:", review);
            alert("Unable to open review: ID is missing.");
        }
    };

    const language = review?.language ? review.language.toUpperCase() : "UNKNOWN";
    const overallScore = review?.review?.score?.overall ?? "N/A";
    const summary = review?.review?.summary || "No summary available for this review.";
    const formattedDate = review?.createdAt 
        ? new Date(review.createdAt).toLocaleString() 
        : "Recent";

    return (
        <div 
            onClick={handleClick}
            className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-md hover:border-blue-600/50 hover:bg-[#1a1a1e] transition-all cursor-pointer group"
        >
            <h2 className="text-xl font-semibold mb-3 text-zinc-100 group-hover:text-blue-400 transition-colors">
                {language}
            </h2>

            <p className="text-yellow-400 mb-2 font-medium text-base">
                ⭐ Overall Score : {overallScore}
            </p>

            <p className="text-zinc-300 mb-4 text-base leading-relaxed line-clamp-2">
                {summary}
            </p>

            <div className="flex items-center justify-between text-sm text-zinc-500">
                <span>{formattedDate}</span>
                <span className="text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details ➔
                </span>
            </div>
        </div>
    );
}

export default ReviewCard;