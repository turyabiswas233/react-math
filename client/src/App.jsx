import QuestionCard from "./components/QuestionCard";
import "./App.css";
import Navbar from "./components/Navbar";
import { useState, useReducer, useEffect } from "react";
import axios from "axios";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";

const subList = [
  "HSC- BANGLA 1ST PAPER",
  "HSC- BANGLA 2ND PAPER",
  "HSC - PHYSICS 1ST PAPER",
  "HSC - PHYSICS 2ND PAPER",
  "HSC - CHEMISTRY 1ST PAPER",
  "HSC - CHEMISTRY 2ND PAPER",
  "HSC - HIGHER MATH 1ST PAPER",
  "HSC - HIGHER MATH 2ND PAPER",
  "HSC - BIOLOGY 1ST PAPER",
  "HSC - BIOLOGY 2ND PAPER",
  "HSC - ICT",
];
const chapters = [
  "Chapter 1",
  "Chapter 2",
  "Chapter 3",
  "Chapter 4",
  "Chapter 5",
  "Chapter-06: Conics",
  "Chapter 7",
  "Chapter 8",
  "Chapter 9",
  "Chapter 10",
];
const limits = [10, 20, 25, 30, 60, 100];
const types = ["বহুনির্বাচনি প্রশ্ন", "সৃজনশীল প্রশ্ন"]; // "সৃজনশীল প্রশ্ন"
export const levels = ["{'MCQ: All Levels'}", "{'CQ: All Levels'}"];

function App() {
  const [error, setError] = useState("");
  const [selectedSub, setSelectSub] = useState("");
  const [selectChap, setSelectChap] = useState("");
  const [ansList, setAnsList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [level, setLevel] = useState("");
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [range, setrange] = useState({
    start: 0,
    end: 5,
  });
  const [finish, setFinish] = useState(false);
  const [result, setResult] = useState({
    correct: 0,
    inCorrect: 0,
    total: 0,
  });

  function handleAnswer(ans, id, oid) {
    setAnsList((pre) => {
      const newAns = [...pre];
      if (data[id]?.Answer)
        newAns[id] = {
          ans: ans,
          oid: oid,
          isCorrect: ans?.includes(data[id].Answer?.trim()),
        };
      else if (data[id]?.Answer_img)
        newAns[id] = {
          ans: ans,
          oid: oid,
          isCorrect: ans?.includes(data[id].Answer_img?.trim()),
        };
      else
        newAns[id] = {
          ans: ans,
          oid: oid,
          isCorrect: false,
        };

      return newAns;
    });
  }
  const rangeControl = (action) => {
    switch (action) {
      case "next":
        if (range.end >= data?.length)
          setrange({ start: data?.length - 5, end: data?.length });
        else
          setrange((pre) => ({
            start: pre.start + 5,
            end: pre.end + 5,
          }));
        break;
      case "prev":
        if (range.start <= 0) setrange({ start: 0, end: 5 });
        else
          setrange((pre) => ({
            start: pre.start - 5,
            end: pre.end - 5,
          }));
        break;
    }
  };

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
        })
        .catch((err) => {
          setError(err);
        });
    } catch (error) {
      alert("Failed");
      setLoading(false);
      setStart(false);
      setFinish(false);
      setError(error);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setFinish(true);
    const correct = ansList?.filter((ans) => ans?.isCorrect)?.length;
    const incorrect =
      ansList?.filter((ans) => !ans?.isCorrect)?.length -
      ansList?.filter((ans) => !ans)?.length;
    alert(`Exam finished `);
    setResult({
      correct: correct,
      inCorrect: incorrect,
      total: data?.length,
    });
  };

  useEffect(() => {
    if (finish) handleSubmit();
  }, [finish]);

  return (
    <div
      className={`h-screen bg-swhite  p-0 m-0 poppins-regular overflow-y-scroll relative`}
    >
      <Navbar />
      <div className="questionsList py-10 px-2 space-y-6  mx-auto max-w-screen-xl">
        <div
          className="grid justify-start gap-3 grid-cols-2 flex-wrap aria-disabled:pointer-events-none lg:grid-cols-4 aria-hidden:hidden"
          aria-hidden={data?.length !== 0}
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
        <div className={`examInfo flex items-start flex-wrap gap-3 `}>
          <h2 className="bg-swhite text-sblack px-2 py-px rounded-sm text-left">
            Subject: {selectedSub}
          </h2>
          <h2 className="bg-swhite text-sblack px-2 py-px rounded-sm text-left">
            Chapter: {selectChap}
          </h2>
          <h2 className="bg-swhite text-sblack px-2 py-px rounded-sm text-left">
            Total Question: {data?.length}
          </h2>
        </div>
        {selectedSub && selectChap && limit && level && data?.length === 0 && (
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
        {/* score board */}
        {finish && (
          <ScoreBoard
            correct={result.correct}
            inCorrect={result.inCorrect}
            skip={result.total - (result.correct + result.inCorrect)}
            total={data?.length}
          />
        )}
        {finish && (
          <button
            className="btn btn-neutral"
            onClick={() => {
              const confirm = prompt(
                "Are you sure you want to take new exam? [yes/no]"
              );
              if (confirm?.toLocaleLowerCase() === "yes")
                window.location.reload();
              else;
            }}
          >
            Take New Exam
          </button>
        )}
        {/* main question */}
        {start && !finish && data?.length > 0 && (
          <Timer
            start={start}
            limit={
              level === levels[0]
                ? 60 * (data?.length - 5)
                : 60 * 20 * (data?.length - 1)
            }
            setFinish={setFinish}
          />
        )}
        {data.length > 0 &&
          !finish &&
          (loading ? (
            <div className="scale-150 text-2xl text-center text-blue-400 font-bold">
              Loading...
            </div>
          ) : (
            <div className="space-y-2">
              {level == levels[1] && (
                <p className="alert alert-info">
                  এই পরীক্ষাটি শুধুমাত্র নিজেকে যাচাই করার জন্যে। তাই উত্তরপত্র
                  upload এর কোনো দরকার নেই।
                </p>
              )}
              {data.map((q, id) => {
                if (id >= range.start && id < range.end)
                  return (
                    <QuestionCard
                      key={id + "_ques"}
                      question={q.Question}
                      sId={id}
                      optionsList={q.Options?.split("----")}
                      qImg={q?.Question_img}
                      answer={q?.Answer}
                      board={q.Board}
                      handleAnswer={handleAnswer}
                      level={q?.Level}
                      stdAnswer={{
                        ans: ansList[id]?.ans,
                        oid: ansList[id]?.oid,
                      }}
                      solve={{ txt: q?.Solution, img: q?.Solution_Img }}
                      Answer_img={q?.Answer_img}
                      showSolve={finish}
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
      </div>
      {/* page controller */}
      {data.length > 0 && !finish && (
        <div className="flex justify-center items-center mb-5 bg-sblack rounded-md py-2">
          <button
            className="btn btn-error disabled:bg-gray-400 disabled:text-black disabled:cursor-not-allowed"
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
            className="btn btn-info disabled:bg-gray-400 aria-hidden:hidden"
            onClick={() => rangeControl("next")}
            aria-hidden={range.end >= data.length}
          >
            Next
          </button>
          <button
            className="btn btn-success disabled:bg-gray-400 aria-hidden:hidden"
            onClick={() => handleSubmit()}
            aria-hidden={range.end <= data.length || finish}
            type="submit"
          >
            Finish
          </button>
        </div>
      )}

      {finish && (
        <div className="space-y-2 p-2">
          {level == levels[0] && (
            <p className="alert alert-info">
              এই পরীক্ষাটি শুধুমাত্র নিজেকে যাচাই করার জন্যে। তাই submission
              নেওয়া হয় নি।
            </p>
          )}
          {data.map((q, id) => {
            return (
              <QuestionCard
                key={id + "_ques"}
                question={q?.Question}
                sId={id}
                optionsList={q?.Options?.split("----")}
                answer={q?.Answer}
                board={q?.Board}
                handleAnswer={handleAnswer}
                level={q?.Level}
                stdAnswer={{
                  ans: ansList[id]?.ans,
                  oid: ansList[id]?.oid,
                }}
                solve={{ txt: q?.Solution, img: q?.Solution_Img }}
                Answer_img={q?.Answer_img}
                showSolve={finish}
              />
            );
          })}
        </div>
      )}

      {error && <p className="alert alert-error">{error?.message}</p>}
    </div>
  );
}

export default App;
