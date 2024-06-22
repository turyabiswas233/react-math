import QuestionCard from "./components/QuestionCard";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useReducer, useEffect } from "react";

const subList = [
  "Physics 1st",
  "Physics 2nd",
  "Math 1st",
  "Math 2nd",
  "Chemistry 1st",
  "Chemistry 2nd",
  "Biology 1st",
  "Biology 2nd",
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
  const [selectedSub, setSelectSub] = useState("");
  const [selectChap, setSelectChap] = useState("");
  const [prog, setProg] = useState(0);
  const [ansList, setAnsList] = useState([]);

  function handleAnswer(ans) {
    setAnsList((pre) => {
      const newAns = [...pre];
      newAns[curQuesId] = ans;
      return newAns;
    });
  }
  const [curQuesId, dispatch] = useReducer(reducer, 0);
  function reducer(state, action) {
    switch (action) {
      case "next":
        if (state < qLis.length) setProg(((state + 1) / qLis.length) * 100);
        return state < qLis.length - 1 ? state + 1 : state;
      case "prev":
        if (state > 0) setProg(((state - 1) / qLis.length) * 100);
        return state > 0 ? state - 1 : state;
      default:
        return state;
    }
  }
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!start) setSelectChap("");
  }, [selectedSub, start]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setResult();
  };

  return (
    <div className={`min-h-screen bg-white p-0 m-0 poppins-regular`}>
      <Navbar />
      <div className="questionsList p-10 space-y-6  mx-auto max-w-xl">
        <div
          className="flex justify-start gap-3 overflow-x-hidden flex-wrap aria-disabled:pointer-events-none"
          hidden={start}
          aria-disabled={start}
        >
          <select
            className="select"
            name="subject"
            id="subject"
            onChange={(e) => setSelectSub(e.target.value)}
            value={selectedSub}
          >
            <option value="">Select Subject</option>
            {subList.map((sub, sid) => (
              <option key={sid} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          {selectedSub && (
            <select
              className="select"
              name="chapter"
              id="chapter"
              onChange={(e) => setSelectChap(e.target.value)}
              value={selectChap}
            >
              <option value="">Select Subject</option>
              {chapters.map((chap, cid) => (
                <option key={cid} value={chap}>
                  {chap}
                </option>
              ))}
            </select>
          )}
        </div>
        <h2 className="text-2xl text-blue-400 underline decoration-blue-500 mt-10 text-left">
          Subject: {selectedSub}
        </h2>
        <h2 className="text-2xl text-blue-400 underline decoration-blue-500 text-left">
          Chapter: {selectChap}
        </h2>
        {selectedSub && selectChap && !start && (
          <button className="btn btn-accent" onClick={() => setStart(true)}>
            Start
          </button>
        )}
        <div
          className="QuestionPage ring-2 ring-sblack rounded-lg p-5 space-y-4 bg-sblack"
          hidden={!start}
        >
          <p className="text-center text-2xl bg-sblack text-swhite rounded-md">
            Mark Progress
          </p>
          <div className="h-1 w-full bg-green-200/80 rounded-full relative my-5">
            <p
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all ease-in-out"
              style={{
                width: prog + "%",
              }}
            >
              <span className="absolute w-2 h-2 rounded-full bg-green-400 right-0 top-1/2 -translate-y-1/2"></span>
            </p>
          </div>
          <p className="alert text-xl bg-syellow text-sblack bangla-font">
            বিশেষ দ্রষ্টব্য:- একবার উত্তর দাগানো হলে সেটা আর পরিবর্তন করা যাবে
            না। ভুলক্রমে ওয়েবপেজটি রিলোড করলে পুনরায় মক টেস্ট শুরু করতে হবে।{" "}
          </p>
          <QuestionCard
            key={curQuesId + "_ques"}
            question={qLis[curQuesId].ques}
            sId={curQuesId + 1}
            optionsList={qLis[curQuesId].optiList}
            answer={qLis[curQuesId].ans}
            handleAnswer={handleAnswer}
            stdAnswer={{ ans: ansList[curQuesId], oid: curQuesId }}
          />
          <div className="grid grid-cols-2 w-1/2 min-w-fit items-center space-x-3 justify-center mx-auto my-5">
            <button
              className="btn bg-sred text-swhite btn-ghost"
              onClick={() => dispatch("prev")}
            >
              Previous
            </button>
            <button
              className={`btn bg-sgreen text-swhite btn-ghost ${
                qLis.length - 1 === curQuesId && "hidden"
              }`}
              onClick={() => dispatch("next")}
            >
              Next
            </button>
            <button
              className={`btn btn-ghost bg-sgreen text-swhite ${
                qLis.length - 1 === curQuesId ? "block" : "hidden"
              }`}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        {false &&
          qLis.map((q, id) => (
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
