import React, { useState } from "react";
import Latex from "react-latex";

function QuestionCard({
  sId,
  question,
  optionsList,
  answer,
  Answer_img,
  handleAnswer,
  stdAnswer,
  board,
  solve,
}) {
  const [toggleSolve, setSolve] = useState(false);

  function hasMatchingBlock(x, y, z) {
    if (z) return y.includes(z);
    else return y?.includes(x?.replaceAll("<math>", ""));
  }

  return (
    <div className="w-full bg-sblack text-swhite rounded-lg bangla-font backdrop-blur-md p-3">
      {/* question title */}
      <div id="question_header" className="text-xl my-2 p-2">
        {sId + 1 + ".\t"}
        <span className="break-words">
          <Latex fleqn={true} leqno={true} errorColor="red">
            {question
              ?.replaceAll("<math>", "$")
              ?.replaceAll("</math>", "$")
              ?.replaceAll("\t", " \\t")
              ?.replaceAll("\f", " \\f")
              ?.replaceAll("\r", " \\r")
              ?.replaceAll("\\n", "")
              ?.replaceAll(`\s`, "s")}
          </Latex>
        </span>
        <p className="my-2 text-sm text-right">{board}</p>
      </div>
      {/* question options */}
      <div id="options" className="grid justify-normal space-y-2 px-3 my-2">
        {optionsList?.length > 0 &&
          optionsList?.map((opt, oid) => {
            let optId = oid == 0 ? "ক" : oid == 1 ? "খ" : oid == 2 ? "গ" : "ঘ";
            return (
              <div
                key={`q_op_${oid + 1}`}
                className={`transition text-white rounded-md h-fit p-2 group hover:cursor-pointer ${
                  !stdAnswer?.ans
                    ? "bg-stone-800 hover:bg-slate-800/60"
                    : stdAnswer.oid === oid
                    ? hasMatchingBlock(answer, stdAnswer.ans, Answer_img)
                      ? "bg-green-500"
                      : "bg-rose-500"
                    : "bg-stone-800 hover:bg-slate-800/60"
                }`}
                onClick={() => handleAnswer(opt, sId, oid)}
              >
                <p className="flex gap-3">
                  <span
                    className="text-lg w-4 h-4 flex justify-center items-center p-3 ring-2 ring-blue-500 rounded-full transition "
                    hidden={!opt?.includes("http") ? true : false}
                  >
                    {optId}
                  </span>
                  <span className="font-semibold">
                    {opt?.includes("http") ? (
                      <img
                        className="object-contain bg-white rounded-md"
                        src={opt}
                        width={75}
                        height={75}
                      />
                    ) : (
                      <Latex
                        displayMode={false}
                        fleqn={true}
                        leqno={true}
                        errorColor="red"
                      >
                        {`${opt
                          ?.replaceAll("<math>", "$")
                          ?.replaceAll("</math>", "$")
                          ?.replaceAll("\t", " \\t")
                          ?.replaceAll("\f", " \\f")
                          ?.replaceAll("\r", " \\r")
                          ?.replaceAll("\\n", "")
                          ?.replaceAll(`\s`, "s")}`}
                      </Latex>
                    )}
                  </span>
                </p>
              </div>
            );
          })}
      </div>
      {/* question answer */}
      <div id="question_answer">
        <p
          className={`bg-green-900/80 m-3 rounded-md ring-1 ring-green-400 p-2 text-white font-bold ${
            !stdAnswer?.ans && "hidden"
          }`}
        >
          Answer:
          {answer && (
            <Latex
              displayMode={true}
              fleqn={true}
              leqno={true}
              errorColor="red"
              children={answer
                ?.replaceAll("<math>", "$")
                ?.replaceAll("</math>", "$")
                ?.replaceAll("\t", " \\t")
                ?.replaceAll("\f", " \\f")
                ?.replaceAll("\r", " \\r")
                ?.replaceAll("\\n", "")
                ?.replaceAll(`\s`, "s")
                ?.replaceAll(`\l`, "l")}
            />
          )}
          {Answer_img && <img src={Answer_img} width={250} height={250} />}
        </p>
      </div>

      {/* solution */}
      <div className="ring-2 ring-green-400 bg-green-900/50 mt-3 p-2 rounded-md">
        <button
          className="btn btn-primary btn-block mb-3"
          onClick={() => setSolve((pre) => !pre)}
        >
          Solve: ➡️
        </button>
        {solve?.txt && toggleSolve && (
          <span className="break-words">
            <Latex
              displayMode={true}
              fleqn={true}
              leqno={true}
              errorColor="red"
            >
              {solve?.txt
                ?.replaceAll("<math>", "$")
                ?.replaceAll("</math>", "$")
                ?.replaceAll("\t", " \\t")
                ?.replaceAll("\f", " \\f")
                ?.replaceAll("\r", " \\r")
                ?.replaceAll(`\s`, "s")}
            </Latex>
          </span>
        )}
        {solve?.img && toggleSolve && (
          <img
            className="object-contain bg-white rounded-md"
            src={solve?.img}
            width={250}
            height={250}
            onClick={() => {
              window.open(solve?.img);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionCard;
