import Latex from "react-latex";
import LatexHint from './LatexHint.jsx'
function MathTemplate({ tex }) {
  return (
    <div className="text-2xl">
      <pre className="border-black border-2 p-2 rounded-md m-2 dm-sans-normal">

        <Latex >{tex}</Latex>

      </pre>
      <LatexHint />
    </div>
  );
}

export default MathTemplate;
