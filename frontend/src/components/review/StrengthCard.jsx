import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function StrengthCard({ strengths = [] }) {
  return (
    <Card>

      <SectionTitle>
        ✅ Strengths
      </SectionTitle>

      <div className="space-y-3">

        {strengths.map((item, index) => (

          <div
            key={index}
            className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-green-200"
          >
            ✔ {item}
          </div>

        ))}

      </div>

    </Card>
  );
}

export default StrengthCard;