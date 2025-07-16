export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const answers = {
    1: "4",
    2: "Delhi"
  };

  const body = await req.json();
  const { questionId, userAnswer } = body;

  const correct =
    answers[parseInt(questionId)].trim().toLowerCase() === userAnswer.trim().toLowerCase();

  res.status(200).json({ correct });
}
