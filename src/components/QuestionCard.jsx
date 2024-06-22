import React from "react";
import Latex from "react-latex";

function QuestionCard({
  sId,
  question,
  optionsList,
  answer,
  handleAnswer,
  stdAnswer,
}) {
  console.log(stdAnswer);
  return (
    <div className="w-auto bg-sblack text-swhite rounded-lg bangla-font backdrop-blur-md p-3 md:col-span-2">
      {/* question title */}
      <div id="question_header" className="text-xl my-2 p-2 font-semibold">
        <p>
          <span>{sId || "1"}. </span>
          <span>
            <Latex children={`${question || "What is lorem ipsum?"}`} />
          </span>
        </p>
      </div>
      {/* question options */}
      <div id="options" className="grid justify-normal space-y-2 px-3 my-2">
        {optionsList?.map((opt, oid) => {
          let optId = oid == 0 ? "ক" : oid == 1 ? "খ" : oid == 2 ? "গ" : "ঘ";
          return (
            <div
              key={`q_op_${oid + 1}`}
              className={`transition text-black rounded-md h-fit p-2 group hover:cursor-pointer ${
                !stdAnswer?.ans
                  ? "bg-stone-100 hover:bg-slate-200"
                  : stdAnswer.oid === oid
                  ? stdAnswer.ans === answer
                    ? "bg-green-200"
                    : "bg-rose-200"
                  : "bg-stone-100 hover:bg-slate-200"
              }`}
              onClick={() => handleAnswer(opt)}
            >
              <p className="flex gap-3">
                <span className="text-base w-4 h-4 flex justify-center items-center p-3 ring-2 ring-blue-500 rounded-full transition">
                  {optId}
                </span>
                <span className="font-semibold">
                  <Latex children={`$${opt}$`} />
                </span>
              </p>
            </div>
          );
        })}
      </div>
      {/* question answer */}
      <div id="question_answer">
        <p
          className={`bg-green-100 m-3 rounded-md ring-1 ring-green-400 p-2 text-green-600 font-bold ${
            !stdAnswer?.ans && "hidden"
          }`}
        >
          Answer: <Latex children={`$${answer}$`} />
        </p>
      </div>
    </div>
  );
}

export default QuestionCard;
