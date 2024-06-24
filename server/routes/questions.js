import express from "express";
const router = express.Router();
import { Question } from "../models/Questions.js";
// Get all questions or filter by subject and chapter
router.get("/", async (req, res) => {
  try {
    const { subject, chapter, limit, level } = req.query;
    let filter = {};

    if (subject) {
      filter.Subject = subject;
    }

    if (chapter) {
      filter.Chapter = chapter;
    }
    if (level) {
      filter.Level = level;
    }
    const SIZE = limit;
    const questions = await Question.aggregate([
      { $match: { $where: filter } },
      {
        $sample: {
          size: SIZE,
        },
      },
    ]);

    if (questions)
      res
        .status(201)
        .json({ data: questions, message: "question fetched successfully" });
    else res.status(203).json({ data: [], message: "No question found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// Submit an answer
router.post("/answer", async (req, res) => {
  const { questionId, selectedOption } = req.body;
  try {
    const question = await Question.findById(questionId);
    if (question) {
      const isCorrect = question.Answer === selectedOption;
      res.json({ isCorrect });
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create  new question
router.post("/", async (req, res) => {
  const { question, optionsList, answer, subject, chapter } = req.body;
  const newQuestion = new Question({
    question,
    answer,
    subject,
    chapter,
    optionsList: optionsList?.map((option) => ({ text: option, imageUrl: "" })),
  });
  try {
    const savedQuestion = await newQuestion.save();
    res
      .status(201)
      .json({ message: "data uploaded successfully", data: savedQuestion });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export { router };
