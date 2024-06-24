import React from "react";
import Latex from "react-latex";
import { levels } from "../App";
function QuestionCard({
  sId,
  question,
  qImg,
  optionsList,
  answer,
  Answer_img,
  handleAnswer,
  stdAnswer,
  board,
  solve,
  showSolve,
  level,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto text-sblack bg-swhite border shadow-md rounded-lg bangla-font backdrop-blur-md p-3 overflow-x-auto">
      {/* question title */}
      <div id="question_header" className="text-xl my-2 p-2">
        {sId + 1 + ".\t"}
        {qImg && (
          <img className="aspect-auto object-cover" src={qImg} width={300} />
        )}
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
        <p className="my-2 text-sm text-right">
          {board}
          {showSolve && stdAnswer?.ans != undefined && (
            <span
              className={`${
                stdAnswer?.ans?.includes(
                  answer ? answer?.trim() : Answer_img?.trim()
                )
                  ? "text-green-500"
                  : "text-rose-500"
              } uppercase block`}
            >
              {stdAnswer?.ans?.includes(
                answer ? answer?.trim() : Answer_img?.trim()
              )
                ? "Correct"
                : "Wrong"}
            </span>
          )}
          {showSolve && stdAnswer?.ans == undefined && (
            <span className={` uppercase block`}>skipped</span>
          )}
        </p>
      </div>
      {/* question options */}
      <div
        id="options"
        className="grid justify-normal space-y-2 px-3 my-2 aria-disabled:pointer-events-none"
        aria-disabled={showSolve}
      >
        {optionsList?.length > 0 &&
          level == levels[0] &&
          optionsList?.map((opt, oid) => {
            let optId = oid == 0 ? "ক" : oid == 1 ? "খ" : oid == 2 ? "গ" : "ঘ";

            return (
              <div
                key={`q_op_${oid + 1}`}
                className={`transition  rounded-md h-fit p-2 group hover:cursor-pointer ${
                  stdAnswer?.ans && stdAnswer.oid === oid
                    ? "bg-syellow/80 text-sblack"
                    : "bg-sblack hover:bg-sblack/60 text-swhite"
                }`}
                onClick={() => handleAnswer(opt, sId, oid)}
              >
                <p className="flex gap-3">
                  {optId + "."}
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
      <div
        id="question_answer"
        className="aria-hidden:hidden bg-green-900/80 m-3 rounded-md ring-1 ring-green-400 p-2 text-white"
        aria-hidden={!showSolve}
      >
        <p className={` font-bold ${!stdAnswer?.ans && "hidden"}`}>
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
          {Answer_img && (
            <img
              className="bg-swhite rounded-md"
              src={Answer_img}
              width={250}
              height={250}
            />
          )}
        </p>
        {/* solution */}
        <div
          className="mt-3 rounded-md aria-hidden:hidden grid"
          aria-hidden={!showSolve}
        >
          <p>
            <u>Solve:</u>
          </p>
          {solve?.txt && (
            <span className="break-words p-2">
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
          {solve?.img && (
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
    </div>
  );
}

export default QuestionCard;
