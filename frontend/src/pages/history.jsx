import { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { API_URL } from "../config/api";
import ReviewCard from "../components/history/ReviewCard";

const DEFAULT_LIMIT = 10;

function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);
    const [limit] = useState(DEFAULT_LIMIT);

    const fetchReviews = useCallback(async (page = 1) => {
        setLoading(true);

        try {
            const response = await apiClient.get(`${API_URL}/api/v1/reviews`, {
                params: {
                    page,
                    limit,
                },
            });

            const paginationData = response.data?.data || {};

            setReviews(Array.isArray(paginationData.reviews) ? paginationData.reviews : []);
            setCurrentPage(Number(paginationData.page) || 1);
            setTotalPages(Number(paginationData.totalPages) || 1);
            setTotalReviews(Number(paginationData.totalReviews) || 0);
        } catch (error) {
            console.log(error.response?.data || error.message);
            setReviews([]);
            setCurrentPage(1);
            setTotalPages(1);
            setTotalReviews(0);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchReviews(currentPage);
    }, [currentPage, fetchReviews]);

    const filteredReviews = useMemo(() => {
        const query = searchQuery.toLowerCase();

        return reviews.filter((review) => {
            const language = review?.language?.toLowerCase() || "";
            const summary = review?.review?.summary?.toLowerCase() || "";

            return language.includes(query) || summary.includes(query);
        });
    }, [reviews, searchQuery]);

    const handlePreviousPage = () => {
        if (currentPage <= 1 || loading) return;
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage >= totalPages || loading) return;
        setCurrentPage((prevPage) => prevPage + 1);
    };

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-1">Review History</h1>
                    <p className="text-zinc-400 text-sm">
                        Total Reviews: {totalReviews}
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

            {totalReviews === 0 ? (
                <div className="text-center mt-20 bg-[#18181b] border border-zinc-800 rounded-xl p-10 max-w-lg mx-auto shadow-xl">
                    <h2 className="text-xl font-medium mb-2 text-zinc-200">No Reviews Yet</h2>
                    <p className="text-zinc-400 text-base">
                        Generate your first AI review to see it here.
                    </p>
                </div>
            ) : (
                <div>
                    {filteredReviews.length > 0 ? (
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

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1 || loading}
                            className="px-4 py-2 rounded-lg border border-zinc-700 bg-[#121214] text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-500 transition-colors"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-zinc-300">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            type="button"
                            onClick={handleNextPage}
                            disabled={currentPage >= totalPages || loading}
                            className="px-4 py-2 rounded-lg border border-zinc-700 bg-[#121214] text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-zinc-500 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default History;