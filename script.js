const questions = [
  {
    id: 1,
    text: "What is 2 + 2?",
    options: {
      a: "3",
      b: "4",
      c: "5"
    }
  },
  {
    id: 2,
    text: "What is the capital of India?",
    options: {
      a: "Mumbai",
      b: "Delhi",
      c: "Kolkata"
    }
  },
  {
    id: 3,
    text: "Who is kailas?",
    options: {
      a: "Dev",
      b: "hacker",
      c: "Pro"
    }
  },
  {
    id: 4,
    text: "Quad includes?",
    options: {
      a: "Japan",
      b: "china",
      c: "Kollam"
    }
  }
];

let current = 0;
let correctCount = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const formEl = document.getElementById("quiz-form");
const resultEl = document.getElementById("result");

function loadQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";

  for (let key in q.options) {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="option" value="${key}" required>
      (${key.toUpperCase()}) ${q.options[key]}
    `;
    optionsEl.appendChild(label);
    optionsEl.appendChild(document.createElement("br"));
  }
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return;

  const userAnswer = selected.value;
  const questionId = questions[current].id;

  try {
    const res = await fetch('/api/check-answer', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, userAnswer })
    });

    const data = await res.json();
    if (data.correct) correctCount++;
  } catch (err) {
    console.error("API error:", err);
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    formEl.style.display = "none";
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    resultEl.style.display = "block";
    resultEl.textContent = `You got ${correctCount} out of ${questions.length} correct.`;
  }
});

loadQuestion();
