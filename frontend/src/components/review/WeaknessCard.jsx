import Card from "../common/Card";
import SectionTitle from "../common/SectionTitle";

function WeaknessCard({ weaknesses = [] }) {

  return (

    <Card>

      <SectionTitle>
        ❌ Weaknesses
      </SectionTitle>

      <div className="space-y-3">

        {weaknesses.map((item, index) => (

          <div
            key={index}
            className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-200"
          >
            ✖ {item}
          </div>

        ))}

      </div>

    </Card>

  );
}

export default WeaknessCard;