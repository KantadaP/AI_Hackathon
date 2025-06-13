import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RespondSurveyForm() {
  const { surveyId } = useParams(); // Get ID from URL
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    console.log("Loaded surveys from localStorage:", surveys);

    if (surveys.length === 0) {
      console.warn("No surveys found in localStorage.");
      return;
    }

    const found = surveys.find((s) => String(s.s_id) === surveyId); // Match surveyId

    if (!found) {
      console.warn("Survey with the given ID not found.");
      setNotFound(true);
      return;
    }

    console.log("Using survey:", found);
    setSurvey(found);
    setAnswers(new Array(found.questions.length).fill(""));
  }, [surveyId]);

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!survey) return;

    const response = {
      res_id: Date.now(),
      s_id: survey.s_id,
      answers: survey.questions.map((q, i) => ({
        question: q.question,
        answer: answers[i] || "",
      })),
    };

    const key = `responses_${survey.s_id}`;
    const storedResponses = JSON.parse(localStorage.getItem(key) || "[]");
    storedResponses.push(response);
    localStorage.setItem(key, JSON.stringify(storedResponses));

    alert("Response submitted!");
  };

  if (notFound) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Survey not found.
      </div>
    );
  }

  if (!survey) {
    return <div className="p-8 text-center">Loading survey...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text">Respond to Survey</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {survey.questions.map((q, qIndex) => (
          <div key={qIndex} className="border rounded p-4 bg-gray-50">
            <label className="block font-semibold mb-2">
              {qIndex + 1}. {q.question}
            </label>

            {q.type === "multiple_choice" ? (
              <div className="space-y-2">
                {q.choice.map((choice, cIndex) => (
                  <label key={cIndex} className="block">
                    <input
                      type="radio"
                      name={`q${qIndex}`}
                      value={choice}
                      checked={answers[qIndex] === choice}
                      onChange={(e) => handleChange(qIndex, e.target.value)}
                      className="mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>
            ) : (
              <input
                type="text"
                className="w-full border p-2"
                placeholder="Your answer"
                value={answers[qIndex]}
                onChange={(e) => handleChange(qIndex, e.target.value)}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="block bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
}

export default function RespondPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <RespondSurveyForm />
    </div>
  );
}
