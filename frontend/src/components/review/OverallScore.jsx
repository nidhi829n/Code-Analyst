import Card from "../common/Card";

function OverallScore({ score }) {

    let title = "";
    let color = "";
    let message = "";

    if (score >= 90) {
        title = "Excellent";
        color = "text-green-400";
        message =
            "Your code follows excellent coding practices.";
    }

    else if (score >= 70) {
        title = "Good";
        color = "text-blue-400";
        message =
            "Good implementation with room for improvement.";
    }

    else if (score >= 50) {
        title = "Average";
        color = "text-yellow-400";
        message =
            "Several improvements can make this code better.";
    }

    else {
        title = "Needs Improvement";
        color = "text-red-400";
        message =
            "This code requires significant improvements.";
    }

    return (

        <Card>

            <div className="flex flex-col items-center">

                <h2
                    className="
                    text-3xl
                    font-bold
                    text-white
                    mb-6
                "
                >
                    ⭐ AI Code Review
                </h2>

                <div
                    className={`
                    text-7xl
                    font-extrabold
                    ${color}
                `}
                >
                    {score}
                </div>

                <p
                    className="
                    text-xl
                    text-zinc-400
                "
                >
                    /100
                </p>

                <h3
                    className={`
                    mt-5
                    text-2xl
                    font-bold
                    ${color}
                `}
                >
                    {title}
                </h3>

                <p
                    className="
                    mt-3
                    text-zinc-400
                    text-center
                    max-w-xl
                "
                >
                    {message}
                </p>

            </div>

        </Card>

    );

}

export default OverallScore;