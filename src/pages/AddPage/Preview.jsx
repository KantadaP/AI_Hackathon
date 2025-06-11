import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FPreviewSurveyForm() {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    const foundSurvey = surveys.find((s) => s.s_id === surveyId);
    setSurvey(foundSurvey || null);
  }, [surveyId]);

  if (!survey) {
    return (
      <div className="p-6 w-full bg-white rounded-xl shadow-md space-y-6 text-center text-red-600">
        Survey with ID "{surveyId}" not found.
      </div>
    );
  }

  return (
    <div className="p-6 w-full bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">{survey.name}</h1>
      <p className="text-gray-600 font-semibold">Status: {survey.status}</p>

      {survey.questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="border rounded p-4 bg-gray-50 space-y-2"
        >
          <label className="block font-semibold mb-1">
            Question {qIndex + 1}
          </label>
          <p className="w-full border p-2 bg-white">{q.question}</p>

          <div>
            <label className="block font-semibold mb-1">Type:</label>
            <p className="border p-2 bg-white">
              {q.type === "multiple_choice"
                ? "Multiple Choice"
                : "Fill in the Blank"}
            </p>
          </div>

          {q.type === "multiple_choice" && (
            <div className="space-y-2">
              {q.choice.map((c, cIndex) => (
                <p
                  key={cIndex}
                  className="w-full border p-2 bg-white"
                >
                  {c}
                </p>
              ))}
            </div>
          )}

          {q.type === "fill_answer" && (
            <div className="mt-2">
              <label className="block font-medium text-sm mb-1">
                Answer Field Preview:
              </label>
              <input
                type="text"
                disabled
                className="w-full border p-2 bg-gray-200 text-gray-600"
                placeholder="User will type their answer here"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PreviewSurveyPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FPreviewSurveyForm />
    </div>
  );
}
