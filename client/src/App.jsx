import QuestionCard from "./components/QuestionCard";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";

const subList = [
  "Physics 1st Paper",
  "Physics 2nd Paper",
  "Chemistry 1st Paper",
  "Chemistry 2nd Paper",
  "Math 1st Paper",
  "HSC - উচ্চতর গণিত ২য় পত্র",
  "Biology 1st Paper",
  "Biology 2nd Paper",
  "ICT",
  "Bangla 1st Paper",
  "Bangla 2nd Paper",
];
const chapters = [
  "Chapter 1",
  "Chapter 2",
  "Chapter 3",
  "Chapter 4",
  "Chapter 5",
  "অধ্যায়-০৬ঃ কনিক",
  "Chapter 7",
  "Chapter 8",
  "Chapter 9",
  "Chapter 10",
];
const limits = [5, 10, 15, 20, 25, 30, 50, 100, 200, 500, 1000];
const types = ["বহুনির্বাচনি প্রশ্ন", "সৃজনশীল প্রশ্ন"];
const levels = ["{'MCQ: All Levels'}", "{'CQ: All Levels'}"];

function App() {
  const [selectedSub, setSelectSub] = useState("");
  const [selectChap, setSelectChap] = useState("");
  const [prog, setProg] = useState(0);
  const [ansList, setAnsList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [level, setLevel] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [range, setrange] = useState({
    start: 0,
    end: 5,
  });
  function handleAnswer(ans, id, oid) {
    setAnsList((pre) => {
      const newAns = [...pre];
      newAns[id] = { ans: ans, oid: oid };
      return newAns;
    });
  }
  const rangeControl = (action) => {
    switch (action) {
      case "next":
        setrange((pre) => ({
          start: pre.start + 5,
          end: pre.end + 5,
        }));
        break;
      case "prev":
        setrange((pre) => ({
          start: pre.start - 5,
          end: pre.end - 5,
        }));
        break;
    }
  };
  const [curQuesId, dispatch] = useReducer(reducer, 0);

  function reducer(state, action) {
    switch (action) {
      case "next":
        if (state < data.length) setProg(((state + 1) / data.length) * 100);
        return state < data.length - 1 ? state + 1 : state;
      case "prev":
        if (state > 0) setProg(((state - 1) / data.length) * 100);
        return state > 0 ? state - 1 : state;
      default:
        return state;
    }
  }
  const [start, setStart] = useState(false);
  useEffect(() => {
    if (!start) setSelectChap("");
  }, [start]);

  const fetchQuestion = async () => {
    const API_URL = import.meta.env.VITE_DB_URL;
    try {
      setLoading(true);
      axios
        .get(API_URL + "/api/questions", {
          params: {
            subject: selectedSub,
            chapter: selectChap,
            limit: limit,
            level: level,
          },
        })
        .then((res) => {
          setdata(res.data?.data);
          setLoading(false);
        });
    } catch (error) {
      alert("Failed");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setResult();
  };

  return (
    <div
      className={`h-screen bg-slate-700 p-0 m-0 poppins-regular overflow-y-hidden`}
    >
      {/* <Navbar /> */}
      <div className="questionsList p-10 space-y-6  mx-auto max-w-screen-xl">
        <div
          className="grid justify-start gap-3 overflow-x-hidden flex-wrap aria-disabled:pointer-events-none md:grid-cols-3"
          // hidden={start}
          // aria-disabled={start}
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

          <select
            className="select"
            name="chapter"
            id="chapter"
            onChange={(e) => setSelectChap(e.target.value)}
            value={selectChap}
          >
            <option value="">Select Chapter</option>
            {chapters.map((chap, cid) => (
              <option key={cid} value={chap}>
                {chap}
              </option>
            ))}
          </select>
          <select
            className="select"
            name="type"
            id="type"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="">Question Type</option>
            {types.map((chap, cid) => (
              <option key={cid} value={levels[cid]}>
                {chap}
              </option>
            ))}
          </select>
          <select
            className="select"
            name="limit"
            id="limit"
            onChange={(e) => setLimit(e.target.value)}
            value={limit}
          >
            <option value="">Number of Questions</option>
            {limits.map((chap, cid) => (
              <option key={cid} value={chap}>
                {chap}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-2xl text-blue-400 underline decoration-blue-500 mt-10 text-left">
          Subject: {selectedSub}
        </h2>
        <h2 className="text-2xl text-blue-400 underline decoration-blue-500 text-left">
          Chapter: {selectChap}
        </h2>
        <h2 className="text-2xl text-blue-400 underline decoration-blue-500 text-left">
          Total Question: {data?.length}
        </h2>
        {selectedSub && selectChap && limit && level && (
          <button
            className="btn btn-accent"
            onClick={() => {
              setStart(true);
              fetchQuestion();
            }}
          >
            Start
          </button>
        )}

        {/* main question */}
        <div className="quesBox flex overflow-y-scroll h-[54vh] relative p-2 bg-white space-x-4 rounded-lg">
          {data.length > 0 &&
            (loading ? (
              <div className="scale-150 text-2xl text-center text-blue-400 font-bold">
                Loading...
              </div>
            ) : (
              <div className="space-y-2">
                {data.map((q, id) => {
                  if (id >= range.start && id < range.end)
                    return (
                      <QuestionCard
                        key={id + "_ques"}
                        question={q.Question}
                        sId={id}
                        optionsList={q.Options?.split("----")}
                        answer={q?.Answer}
                        board={q.Board}
                        handleAnswer={handleAnswer}
                        stdAnswer={{
                          ans: ansList[id]?.ans,
                          oid: ansList[id]?.oid,
                        }}
                        solve={{ txt: q?.Solution, img: q?.Solution_Img }}
                        Answer_img={q?.Answer_img}
                      />
                    );
                })}
                {data.length === 0 && (
                  <div className="text-center text-2xl text-blue-400 font-bold">
                    No Questions Found
                  </div>
                )}
              </div>
            ))}
          {data.length > 0 && (
            <div className="flex justify-center gap-4 top-0 float-end sticky">
              <button
                className="btn btn-accent disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
                onClick={() => rangeControl("prev")}
                disabled={range.start === 0}
              >
                Previous
              </button>
              <p className="flex p-2 h-fit">
                <span className="px-4 mx-1 text-blue-600 font-bold">
                  {range.start}
                </span>
                <span className="px-1 font-bold">:</span>
                <span className="px-4 mx-1 text-blue-600 font-bold">
                  {range.end}
                </span>
              </p>
              <button
                className="btn btn-accent disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
                onClick={() => rangeControl("next")}
                disabled={range.end === data.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
