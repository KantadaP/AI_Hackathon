import React from "react";
import { useParams } from "react-router-dom";

export default function AllQuestionPage() {
  const { surveyId } = useParams();

  const surveys = JSON.parse(localStorage.getItem("surveys")) || [];
  const survey = surveys.find((s) => String(s.s_id) === surveyId);

  if (!survey) {
    return <p className="text-red-500">Survey not found.</p>;
  }

  return (
    <div className="p-6">
      {survey.questions.length === 0 ? (
        <p>No questions found in this survey.</p>
      ) : (
        <div className="space-y-4">
          {survey.questions.map((q, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg bg-white shadow"
            >
              <p className="font-semibold text-lg">
                {index + 1}. {q.question}
              </p>
              {q.choice && Array.isArray(q.choice) && (
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  {q.choice.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
