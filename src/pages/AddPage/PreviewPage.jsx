//ANSWER THE SURVEY
import React, { useEffect, useState, useContext } from "react";
import { QuestionsContext } from "../../contexts/QuestionsContext";
import { useNavigate } from "react-router-dom";

function fRespondSurveyForm() {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const { questions } = useContext(QuestionsContext);

  let surveys;

  useEffect(() => {
    // surveys = JSON.parse(localStorage.getItem("surveys") || "[]");

    console.log("Loaded surveys from localStorage:", surveys);

    if (surveys.length === 0) {
      console.warn("No surveys found in localStorage.");
      return;
    }

    const found = surveys[0]; // Just use the first survey for now
    console.log("Using survey:", found);

    setSurvey(found);
    setAnswers(new Array(found.questions.length).fill(""));
  }, []);

  surveys = [{"s_id":1749565599703,"status":"Active","questions": questions}]

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  


  if (!survey) return <div className="p-8 text-center">Loading survey...</div>;

  return (
    <div className="p-6 w-full h-full overflow-y-scroll bg-white space-y-6">
      <h1 className="text-2xl font-bold">Preview Survey</h1>

      <form className="space-y-6">
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

        {/* <button
          type="submit"
          className="block bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          Copy Link
        </button> */}
      </form>
    </div>
  );
}

export default function PreviewPage() {
  return <>{fRespondSurveyForm()}</>;
}
