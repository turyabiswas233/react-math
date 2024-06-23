import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { FaImage } from "react-icons/fa";
import MathTemplate from "./MathTemplate";
import LatexHint from "./LatexHint";
import QuestionCard from "./Card";
import axios from "axios";
const subList = [
  "Physics 1st Paper",
  "Physics 2nd Paper",
  "Chemistry 1st Paper",
  "Chemistry 2nd Paper",
  "Math 1st Paper",
  "Math 2nd Paper",
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
  "Chapter 6",
  "Chapter 7",
  "Chapter 8",
  "Chapter 9",
  "Chapter 10",
];
const exmType = [
  "Du Admission",
  "Engineering",
  "BUET",
  "GST",
  "Medical",
  "Academic",
  "Board",
];
function Question() {
  const [questionInfo, setQuestion] = useState({
    qt: "",
    ans: "",
    subject: "",
    chapter: "",
    examType: "",
    options: ["", "", "", ""],
  });
  const [qLis, setqList] = useState([]);

  const [q_img, setimg] = useState(null);
  function handleInfo(e, key) {
    if (e.target.name?.includes("option")) {
      handleOption(e, key);
    } else setQuestion((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }

  function handleOption(e, key) {
    setQuestion((pre) => {
      const upOpt = { ...pre };
      upOpt.options[key] = e.target.value;
      return upOpt;
    });
  }

  return (
    <div className="poppins-regular overflow-x-hidden p-10 w-full">
      <h2 className="text-4xl xl:text-5xl poppins-semibold">Question Panel</h2>
      <div className="main">
        <div className="rounded-lg my-5 shadow-md max-w-7xl mx-auto lg:grid grid-cols-1">
          <form
            className="card-body "
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                questionInfo.qt &&
                questionInfo.ans &&
                questionInfo.subject &&
                questionInfo.chapter
              )
                try {
                  const API_URL = import.meta.env.VITE_DB_URL;

                  axios
                    .post(
                      API_URL + "/api/questions",
                      {
                        question: { text: questionInfo.qt },
                        optionsList: questionInfo.options,
                        answer: { text: questionInfo.ans },
                        subject: questionInfo.subject,
                        chapter: questionInfo.chapter,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        withCredentials: true,
                      }
                    )
                    .then((res) => {
                      console.log(res.data);
                      alert("success");
                    })
                    .catch((err) => alert("failed"));
                } catch (error) {
                  console.log(error);
                  alert("failed");
                }
            }}
          >
            <h2 className="text-left card-title poppins-medium text-3xl">
              Create a question
            </h2>
            <div className="main grid lg:grid-cols-2 space-x-5">
              <div className="quest flex flex-col gap-4 pb-10">
                <Input
                  title={"Question"}
                  name={"qt"}
                  resize={true}
                  value={questionInfo.qt}
                  setValue={handleInfo}
                  placeholder={"বাংলাদেশের জাতীয় ফলের নাম কি?"}
                />
                {(q_img || questionInfo.qt) && (
                  <MathTemplate
                    tex={`${questionInfo.qt}`}
                    image={q_img}
                    options={questionInfo.options}
                  />
                )}
                {/* question image */}
                <div className="bg-blue-200/80 ring ring-blue-400 rounded-full overflow-hidden h-8 flex items-center gap-4">
                  <label
                    className="bg-blue-600 text-blue-200 font-semibold px-5 flex items-center gap-2 h-full w-fit"
                    htmlFor="q_img"
                  >
                    <FaImage /> Choose a file
                  </label>
                  <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-1 text-blue-700 text-xs pr-3">
                    {q_img?.name || "No File choosen"}
                  </p>
                  <input
                    id="q_img"
                    type="file"
                    multiple={false}
                    accept="image/*"
                    onChange={(e) => setimg(e.target.files[0])}
                    aria-hidden
                    hidden
                  />
                </div>
              </div>

              {/* text info */}
              {questionInfo.qt !== "" && (
                <div className="gap-x-5 my-5 others border-2 border-blue-600 p-2 rounded-md">
                  <div className="option">
                    <h3 className="stat-title text-black/50 font-bold ">
                      Options
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-3">
                      <Input
                        title={"option 1"}
                        placeholder={"option 1"}
                        setValue={(e) => handleOption(e, 0)}
                        name={"options"}
                        value={questionInfo.options[0]}
                      />
                      <Input
                        title={"option 2"}
                        placeholder={"option 2"}
                        setValue={(e) => handleOption(e, 1)}
                        name={"options"}
                        value={questionInfo.options[1]}
                      />
                      <Input
                        title={"option 3"}
                        placeholder={"option 3"}
                        setValue={(e) => handleOption(e, 2)}
                        name={"options"}
                        value={questionInfo.options[2]}
                      />
                      <Input
                        title={"option 4"}
                        placeholder={"option 3"}
                        setValue={(e) => handleOption(e, 3)}
                        name={"options"}
                        value={questionInfo.options[3]}
                      />
                    </div>
                  </div>
                  <div className="groupSubject flex flex-col p-4 space-y-3">
                    <div className="subjects space-y-1">
                      <h3 className="stat-title text-black/50 font-bold ">
                        Select Answer
                      </h3>

                      <select
                        className=" bg-slate-100 px-3 py-1 rounded-md w-full text-lg"
                        onChange={handleInfo}
                        name="ans"
                      >
                        <option value="">Choose an Option</option>

                        {questionInfo.options?.map((opt, id) => (
                          <option
                            className="transition-all hover:text-rose-500"
                            key={id + "_op"}
                            value={opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="subjects space-y-1">
                      <h3 className="stat-title text-black/50 font-bold ">
                        Select subject
                      </h3>

                      <select
                        className=" bg-slate-100 px-3 py-1 rounded-md w-full text-lg"
                        onChange={handleInfo}
                        name="subject"
                      >
                        <option value="">Choose a subject</option>

                        {subList.map((sub, id) => (
                          <option key={id + "_sub"} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="chap space-y-1">
                      <h3 className="stat-title text-black/50 font-bold ">
                        Select chapter
                      </h3>

                      <select
                        className=" bg-slate-100 px-3 py-1 rounded-md w-full text-lg"
                        onChange={(e) => {
                          setQuestion((pre) => ({
                            ...pre,
                            chapter: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Choose a chapter</option>
                        {chapters.map((sub, id) => (
                          <option key={id + "_chp"} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="chap space-y-1">
                      <h3 className="stat-title text-black/50 font-bold ">
                        Exam Type
                      </h3>

                      <select
                        className=" bg-slate-100 px-3 py-1 rounded-md w-full text-lg"
                        onChange={(e) => {
                          setQuestion((pre) => ({
                            ...pre,
                            examType: e.target.value,
                          }));
                        }}
                      >
                        <option value="">Choose Exam type</option>
                        {exmType.map((sub, id) => (
                          <option
                            className="uppercase"
                            key={id + "_exm"}
                            value={sub}
                          >
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className="btn btn-primary w-full text-lg text-green-900 bg-green-500/70 hover:bg-green-600/70 border-0"
              type="submit"
            >
              Add Question
            </button>
          </form>
          <LatexHint />
        </div>
      </div>
      {/* question query template */}
      <div>
        <h2 className="text-center py-10 underline text-4xl">
          Question on student End
        </h2>
        <div className="md:grid md:grid-cols-4 gap-2 mx-auto max-w-screen-lg ">
          {qLis.map((q, id) => (
            <QuestionCard
              key={id + "_ques"}
              question={q.ques}
              sId={id + 1}
              optionsList={q.optiList}
              answer={q?.ans || ""}
              image={q?.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
