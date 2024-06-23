import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  Question: {
    type: String,
  },
  Options: { type: String },
  Answer: {
    type: String,
  },
  Board: {
    type: String,
  },
  Subject: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
  Chapter: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
  Level: {
    type: String,
  },
  Type: {
    type: String,
  },
  Solution: {
    type: String,
  },
  Solution_Img: {
    type: String,
  },
  Answer_Img: {
    type: String,
  },
});

const Question = mongoose.model("Question", questionSchema);

export { Question };
