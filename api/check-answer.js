export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const answers = {
    1: "4",
    2: "Delhi"
  };

  const { questionId, userAnswer } = req.body;
  const correct = answers[questionId] === userAnswer;
  res.json({ correct });
}
