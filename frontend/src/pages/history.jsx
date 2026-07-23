import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import ReviewCard from "../components/history/ReviewCard"; // Update this import path if needed based on your folder structure

function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/api/v1/reviews`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReviews(response.data.data);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const filteredReviews = reviews.filter((review) => {
        const query = searchQuery.toLowerCase();
        const language = review?.language?.toLowerCase() || "";
        const summary = review?.review?.summary?.toLowerCase() || "";
        
        return language.includes(query) || summary.includes(query);
    });

    if (loading) {
        return (
            <div className="p-8 text-zinc-100 min-h-screen bg-[#09090b]">
                <h1 className="text-3xl font-semibold mb-6">Review History</h1>
                <p className="text-zinc-400 text-base animate-pulse">Loading your review history...</p>
            </div>
        );
    }

    return (
        <div className="p-8 text-zinc-100 min-h-screen bg-[#09090b]">
            {/* Header & Search Bar Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-1">Review History</h1>
                    <p className="text-zinc-400 text-sm">
                        Total Reviews: {filteredReviews.length}
                    </p>
                </div>
                
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
                        🔍
                    </span>
                    <input
                        type="text"
                        placeholder="Search by language or summary..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-2.5 pl-10 pr-4 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-sm transition-all shadow-inner"
                    />
                </div>
            </div>

            {reviews.length === 0 ? (
                <div className="text-center mt-20 bg-[#18181b] border border-zinc-800 rounded-xl p-10 max-w-lg mx-auto shadow-xl">
                    <h2 className="text-xl font-medium mb-2 text-zinc-200">No Reviews Yet</h2>
                    <p className="text-zinc-400 text-base">
                        Generate your first AI review to see it here.
                    </p>
                </div>
            ) : (
                <div>
                    {filteredReviews.length > 0 ? (
                        /* ⬅️ Grid layout fills the screen width evenly (2 columns on medium screens, 3 on large/extra-large screens) */
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredReviews.map((review, index) => (
                                <ReviewCard key={review._id || index} review={review} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl mt-6">
                            <p className="text-zinc-400 text-base">
                                No reviews found matching "{searchQuery}".
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default History;