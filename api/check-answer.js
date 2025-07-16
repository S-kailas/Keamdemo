module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  // Manual body parsing (Vercel doesn't auto-parse JSON)
  let body = '';
  await new Promise(resolve => {
    req.on('data', chunk => body += chunk);
    req.on('end', resolve);
  });

  const { questionId, userAnswer } = JSON.parse(body);

  const answers = {
    1: "4",
    2: "Delhi"
  };

  const correct =
    answers[parseInt(questionId)].trim().toLowerCase() === userAnswer.trim().toLowerCase();

  res.status(200).json({ correct });
};
