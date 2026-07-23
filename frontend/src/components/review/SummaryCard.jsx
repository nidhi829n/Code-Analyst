import Card from "../common/Card";
import SectionTitle from "./SectionTitle";
import { FaRegFileAlt } from "react-icons/fa";

function SummaryCard({ summary }) {

    return (

        <Card className="mt-6">

            <SectionTitle
                icon={<FaRegFileAlt />}
                title="Summary"
            />

            <p
                className="
                    text-zinc-300
                    leading-8
                    text-lg
                "
            >
                {summary}
            </p>

        </Card>

    );

}

export default SummaryCard;