import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AllRespondPage() {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
    if (surveys.length === 0) {
      console.warn("No surveys found in localStorage.");
      setSurvey(null);
      setResponses([]);
      return;
    }

    const foundSurvey = surveys.find((s) => String(s.s_id) === surveyId);
    if (!foundSurvey) {
      console.warn(`Survey with id ${surveyId} not found.`);
      setSurvey(null);
      setResponses([]);
      return;
    }

    setSurvey(foundSurvey);

    const key = `responses_${foundSurvey.s_id}`;
    const storedResponses = JSON.parse(localStorage.getItem(key) || "[]");
    setResponses(storedResponses);
  }, [surveyId]);

  if (!survey) {
    return <div className="p-8 text-center text-red-500">Survey not found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">All Responses for Survey: {survey.name || survey.s_id}</h1>

      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        responses.map((resp, index) => (
          <div
            key={resp.res_id || index}
            className="border rounded p-4 bg-gray-50 shadow-sm"
          >
            <h2 className="font-semibold mb-2">Response #{index + 1}</h2>
            {resp.answers.map((ans, i) => (
              <div key={i} className="mb-1">
                <p className="font-medium">
                  {i + 1}. {ans.question}
                </p>
                <p className="ml-4">{ans.answer || <i>No answer provided</i>}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
