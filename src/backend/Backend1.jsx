//GET THE RESPOND
import React, { useEffect, useState } from 'react';

export default function RawResponseList() {
  const [rawAnswers, setRawAnswers] = useState([]);
  const [surveyId, setSurveyId] = useState(null);

  useEffect(() => {
    // Step 1: Get the first or latest survey
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    if (!surveys.length) return;

    const firstSurvey = surveys[0];
    const s_id = firstSurvey.s_id;
    setSurveyId(s_id);

    // Step 2: Get responses and reformat
    const storedResponses = JSON.parse(localStorage.getItem(`responses_${s_id}`) || '[]');
    const simplified = storedResponses.map(res => ({
      answers: res.answers
    }));

    setRawAnswers(simplified);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Raw Answers for Survey ID: {surveyId}</h1>

        <pre className="bg-gray-100 text-sm p-4 rounded overflow-x-auto">
          {JSON.stringify(rawAnswers, null, 2)}
        </pre>
      </div>
    </div>
  );
}
