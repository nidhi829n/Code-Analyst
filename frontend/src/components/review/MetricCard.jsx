import Card from "../common/Card";

function MetricCard({
    title,
    score,
    icon,
    color,
}) {

    return (

        <Card>

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-zinc-400">

                        {title}

                    </p>

                    <h2
                        className={`text-4xl font-bold ${color}`}
                    >
                        {score}
                    </h2>

                    <p className="text-zinc-500">

                        /100

                    </p>

                </div>

                <div className="text-4xl">

                    {icon}

                </div>

            </div>

            <div
                className="mt-6 h-2 rounded-full bg-zinc-800 overflow-hidden"
            >

                <div

                    className={`h-full ${color.replace("text", "bg")}`}

                    style={{

                        width: `${score}%`

                    }}

                />

            </div>

        </Card>

    );

}

export default MetricCard;