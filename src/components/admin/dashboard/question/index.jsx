import React, { useState } from "react";
import Input from "../../Input";
import { FaImage } from "react-icons/fa";
import MathTemplate from "./MathTemplate";

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
    opt: [""],
    ans: "",
    subject: "",
    chapter: "",
  });
  const [q_img, setimg] = useState(null);

  function handleInfo(e) {
    if (e.target.name?.includes("option"));
    else setQuestion((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }
  return (
    <div className="dm-sans-normal overflow-x-hidden p-10 w-full">
      <h2 className="text-4xl xl:text-5xl dm-sans-medium">Question Panel</h2>
      <div className="main">
        <div className="card shadow-md max-w-7xl mx-auto">
          <form
            className="card-body"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(questionInfo);
            }}
          >
            <h2 className="text-left card-title text-3xl">
              Create a question <button className="btn">Hint</button>
            </h2>
            <div className="main">
              <div className="quest grid grid-cols-1 items-start pb-10 lg:grid-cols-2 gap-10">
                <Input
                  title={"Question"}
                  name={"qt"}
                  resize={true}
                  value={questionInfo.qt}
                  setValue={handleInfo}
                  placeholder={"বাংলাদেশের জাতীয় ফলের নাম কি?"}
                />
                <MathTemplate tex={`${questionInfo.qt}`} />
              </div>
              <div className="others">
                <div className="upload-img w-fit lg:w-1/2 px-2 py-5 items-center justify-center bg-blue-100 border-2 border-blue-500 rounded-xl border-double grid mx-auto">
                  {q_img && (
                    <img
                      className="w-auto max-w-md object-contain aspect-video rounded-lg"
                      src={URL.createObjectURL(q_img)}
                      width={600}
                      height={600}
                    />
                  )}
                  {q_img && (
                    <div className="caption-bottom mt-4">
                      <p>SIZE: {(q_img?.size / 1024)?.toFixed(2)} KB</p>
                    </div>
                  )}
                  <label
                    htmlFor="ques_img"
                    className="text-xl text-blue-500 mt-10"
                  >
                    {!q_img ? (
                      <FaImage className="mx-auto" size={100} color="#3366ffaa" />
                    ) : (
                      <FaImage
                        className="mx-auto inline-flex mr-2"
                        size={40}
                        color="#3366ffaa"
                      />
                    )}
                    Upload a question
                  </label>
                  <input
                    hidden
                    type="file"
                    name="ques_img"
                    id="ques_img"
                    multiple={false}
                    aria-label="hidden"
                    onChange={(e) => setimg(e.target.files[0])}
                  />
                </div>
                <div className="lg:grid-cols-2 lg:justify-between grid gap-x-5 my-5">
                  <div className="option">
                    <h3 className="stat-title text-black/50 font-bold ">
                      Options
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-3">
                      <Input title={"option 1"} placeholder={"কাঁঠাল"} />
                      <Input title={"option 2"} placeholder={"আম"} />
                      <Input title={"option 3"} placeholder={"পেঁপে"} />
                      <Input title={"option 4"} placeholder={"লিচু"} />
                    </div>
                  </div>
                  <div className="groupSubject flex flex-col lg:items-center space-y-3">
                    <div className="subjects space-y-1">
                      <h3 className="stat-title text-black/50 font-bold ">
                        Select subject
                      </h3>

                      <select
                        className=" bg-slate-100 px-3 py-1 rounded-md w-full text-lg"
                        onChange={(e) => {
                          setQuestion((pre) => ({
                            ...pre,
                            subject: e.target.value,
                          }));
                        }}
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
                            chapter: e.target.value,
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
              </div>


            </div>
            <button
              className="btn btn-primary w-full text-lg text-green-900 bg-green-500/70 hover:bg-green-600/70 border-0"
              type="submit"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Question;
