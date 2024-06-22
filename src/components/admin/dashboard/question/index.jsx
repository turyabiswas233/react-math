import React, { useEffect, useState } from "react";
import Input from "../../Input";
import { FaImage } from "react-icons/fa";
import MathTemplate from "./MathTemplate";
import LatexHint from "./LatexHint";
import QuestionCard from "./Card";
import Papa from "papaparse";
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
    options: [
      { key: 0, value: "" },
      { key: 1, value: "" },
      { key: 2, value: "" },
      { key: 3, value: "" },
    ],
  });
  const [qLis, setqList] = useState([]);
  const [options, setOptions] = useState([{ key: 0, value: "" }]);
  const [q_img, setimg] = useState(null);
  function handleInfo(e, key) {
    if (e.target.name?.includes("option")) {
      setQuestion((pre) => ({ ...pre, options: handleOption(e, key) }));
    } else setQuestion((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }

  function handleOption(e, key) {
    setOptions((pre) => {
      const upOpt = [...pre];
      upOpt[key] = { key: key, value: e.target.value };
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
            onSubmit={(e) => {
              e.preventDefault();
              setqList((pre) => [
                ...pre,
                {
                  ques: questionInfo.qt,
                  optiList: options,
                  ans: questionInfo.ans,
                  image: q_img,
                },
              ]);
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
                    options={options}
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
                        value={options[0]?.value}
                      />
                      <Input
                        title={"option 2"}
                        placeholder={"option 2"}
                        setValue={(e) => handleOption(e, 1)}
                        value={options[1]?.value}
                      />
                      <Input
                        title={"option 3"}
                        placeholder={"option 3"}
                        setValue={(e) => handleOption(e, 2)}
                        value={options[2]?.value}
                      />
                      <Input
                        title={"option 4"}
                        placeholder={"option 3"}
                        setValue={(e) => handleOption(e, 3)}
                        value={options[3]?.value}
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

                        {options?.map((opt, id) => (
                          <option
                            className="transition-all hover:text-rose-500"
                            key={id + "_op"}
                            value={opt.key}
                          >
                            {opt.value}
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
                          <option key={id + "_sub"} value={sub.name}>
                            {sub.name}
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
