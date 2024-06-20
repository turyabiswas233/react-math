import QuestionCard from "./components/QuestionCard";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Dropbox from "./components/Dropbox";

const subList = [
  {
    name: "Physics 1st",
    link: "#phy_1",
  },
  {
    name: "Physics 2nd",
    link: "#phy_2",
  },
  {
    name: "Math 1st",
    link: "#math_1",
  },
  {
    name: "Math 2nd",
    link: "#math_2",
  },
  {
    name: "Chemistry 1st",
    link: "#chem_1",
  },
  {
    name: "Chemistry 2nd",
    link: "#chem_2",
  },
  {
    name: "Biology 1st",
    link: "#bio_1",
  },
  {
    name: "Biology 2nd",
    link: "#bio_2",
  },
];
const chapters = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "ch8"];
const qLis = [
  {
    ques: "What is your country?",
    optiList: ["Bangladesh", "Australia", "India", "Pakistan"],
    ans: "Bangladesh",
  },
  {
    ques: "What is your mother tongue?",
    optiList: ["Bangla", "English", "Hindi", "Arabic"],
    ans: "Bangla",
  },
  {
    ques: "Which class do you read in?",
    optiList: ["8", "9", "11", "12"],
    ans: "11",
  },
];
function App() {
  const [selectedSub, setSelectSub] = useState(null);

  const [loading, setload] = useState(true);

  const loader = document.getElementById("loader");

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setload(false);
      }, 3000);
    loader.style.display = loading ? "block" : "none";
  }, [loading]);
  if (!loading)
    return (
      <div className={`min-h-screen bg-white p-0 m-0 dm-sans-normal`}>
        <Navbar />
        <div className="questionsList p-10 space-y-6  mx-auto max-w-xl">
          <div className="flex justify-start gap-3 overflow-x-hidden flex-wrap">
            <Dropbox
              id="subject_list"
              title={"Subject"}
              list={subList}
              setOption={setSelectSub}
              type={"subject"}
            />
            {selectedSub && (
              <Dropbox
                id="chp_list"
                title={"Chapters"}
                list={chapters}
                setOption={setSelectSub}
                type={"chapter"}
              />
            )}
          </div>
          <h2 className="text-2xl underline decoration-blue-500">
            {selectedSub?.name}{" "}
            {selectedSub?.chapter && `: ${selectedSub?.chapter}`}
          </h2>
          {qLis.map((q, id) => (
            <QuestionCard
              key={id + "_ques"}
              question={q.ques}
              sId={id + 1}
              optionsList={q.optiList}
              answer={q.ans}
            />
          ))}
        </div>
      </div>
    );
}

export default App;
