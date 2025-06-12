import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// ✅ Updated createSurvey to include name
const createSurvey = (surveyId, name, questions, status) => {
  const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
  const newSurvey = {
    s_id: surveyId,
    name,
    status,
    questions,
    createdAt: new Date().toISOString(),
  };
  surveys.push(newSurvey);
  localStorage.setItem('surveys', JSON.stringify(surveys));
  return newSurvey;
};

// ✅ Updated form component
function FCreateSurveyForm() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [questions, setQuestions] = useState([
    { question: '', choice: [''], type: 'multiple_choice' },
  ]);
  const { surveyId } = useParams();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choice[cIndex] = value;
    setQuestions(newQuestions);
  };

  const addChoice = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choice.push('');
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', choice: [''], type: 'multiple_choice' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedQuestions = questions.map((q) => ({
      ...q,
      choice:
        q.type === 'fill_answer'
          ? ''
          : q.choice.filter((c) => c.trim() !== ''),
    }));

    const newSurvey = createSurvey(surveyId, name.trim(), cleanedQuestions, status);
    if (newSurvey) {
      alert(`Survey created with ID: ${newSurvey.s_id}`);
    } else {
      alert('Failed to create survey');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Create New Survey</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ New Survey Name Input */}
        <div>
          <label className="block font-semibold mb-1">Survey Name:</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter survey name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Survey Status:</label>
          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border rounded p-4 bg-gray-50 space-y-2"
          >
            <label className="block font-semibold mb-1">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Enter your question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, 'question', e.target.value)
              }
            />

            <div>
              <label className="block font-semibold mb-1">Type:</label>
              <select
                className="border p-2"
                value={q.type}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'type', e.target.value)
                }
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="fill_answer">Fill in the Blank</option>
              </select>
            </div>

            {q.type === 'multiple_choice' && (
              <div className="space-y-2">
                {q.choice.map((c, cIndex) => (
                  <input
                    key={cIndex}
                    type="text"
                    className="w-full border p-2"
                    placeholder={`Choice ${cIndex + 1}`}
                    value={c}
                    onChange={(e) =>
                      handleChoiceChange(qIndex, cIndex, e.target.value)
                    }
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addChoice(qIndex)}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  + Add Choice
                </button>
              </div>
            )}

            {q.type === 'fill_answer' && (
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

        <button
          type="button"
          onClick={addQuestion}
          className="text-green-600 font-semibold hover:underline"
        >
          + Add Another Question
        </button>

        <button
          type="submit"
          className="block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Survey
        </button>
      </form>
    </div>
  );
}

// ✅ Page-level wrapper
export default function CreateSurveyForm() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FCreateSurveyForm />
    </div>
  );
}
