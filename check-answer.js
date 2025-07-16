export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const answers = {
    1: "4",
    2: "Delhi"
  };

  const { questionId, userAnswer } = req.body;

  // ✅ Fix: force questionId to be a number
  const correct =
    answers[parseInt(questionId)].trim().toLowerCase() === userAnswer.trim().toLowerCase();

  res.json({ correct });
}
