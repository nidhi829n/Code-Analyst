import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { API_URL } from "../config/api";
import { FaBook, FaBolt, FaShieldAlt, FaTools, FaArrowLeft } from "react-icons/fa";
import OverallScore from "../components/review/OverallScore";
import MetricCard from "../components/review/MetricCard";
import SummaryCard from "../components/review/SummaryCard";
import StrengthCard from "../components/review/StrengthCard";
import WeaknessCard from "../components/review/WeaknessCard";
import ImprovedCodeCard from "../components/review/ImprovedCodeCard";

function ReviewDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchSingleReview = async () => {
            try {
                const response = await apiClient.get(`${API_URL}/api/v1/reviews/${id}`);
                
                // Adjust based on your backend response structure (e.g., response.data.data)
                setReviewData(response.data.data || response.data);
            } catch (error) {
                console.error("Failed to fetch review details:", error);
                setErrorMsg(error.response?.data?.message || "Failed to load review details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSingleReview();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 flex items-center justify-center">
                <p className="text-zinc-400 animate-pulse text-base">Loading review details...</p>
            </div>
        );
    }

    // Agar error aaye ya data na mile toh blank page ki jagah yeh dikhega
    if (errorMsg || !reviewData) {
        return (
            <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-2 text-red-400">Oops! Something went wrong</h2>
                <p className="text-zinc-400 mb-6 max-w-md">{errorMsg || "Review data could not be found."}</p>
                <button 
                    onClick={() => navigate("/history")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg"
                >
                    <FaArrowLeft /> Back to History
                </button>
            </div>
        );
    }

    const { language, review, createdAt } = reviewData;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 lg:p-10">
            <div className="max-w-5xl mx-auto space-y-6">
                
                {/* Back Button */}
                <button
                    onClick={() => navigate("/history")}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium cursor-pointer mb-2"
                >
                    <FaArrowLeft className="text-xs" /> Back to History
                </button>

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white uppercase">
                            {language || "Code"} Review
                        </h1>
                        <p className="text-zinc-400 text-sm mt-1">
                            Generated on {createdAt ? new Date(createdAt).toLocaleString() : "Recently"}
                        </p>
                    </div>
                </div>

                {/* Review Components Breakdown Structure */}
                <div className="space-y-6">
                    {review?.score?.overall !== undefined && (
                        <div className="bg-[#121214] border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
                            <OverallScore score={review.score.overall} />
                        </div>
                    )}

                    {review?.score && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <MetricCard title="Readability" score={review.score.readability} icon={<FaBook />} color="text-blue-400" />
                            <MetricCard title="Performance" score={review.score.performance} icon={<FaBolt />} color="text-yellow-400" />
                            <MetricCard title="Security" score={review.score.security} icon={<FaShieldAlt />} color="text-green-400" />
                            <MetricCard title="Maintainability" score={review.score.maintainability} icon={<FaTools />} color="text-purple-400" />
                        </div>
                    )}

                    {review?.summary && <SummaryCard summary={review.summary} />}

                    {(review?.strengths || review?.weaknesses) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <StrengthCard strengths={review.strengths || []} />
                            <WeaknessCard weaknesses={review.weaknesses || []} />
                        </div>
                    )}

                    {review?.improvedCode && (
                        <ImprovedCodeCard code={review.improvedCode} language={language} />
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default ReviewDetails;