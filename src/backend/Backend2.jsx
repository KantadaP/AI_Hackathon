import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

const saveSurvey = (surveyId, name, questions, status) => {
  const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');

  const newSurvey = {
    s_id: surveyId,
    name,
    status,
    questions,
    createdAt: new Date().toISOString(),
  };

  const existingIndex = surveys.findIndex(s => s.s_id === surveyId);
  if (existingIndex !== -1) {
    surveys[existingIndex] = { ...surveys[existingIndex], ...newSurvey };
  } else {
    surveys.push(newSurvey);
  }

  localStorage.setItem('surveys', JSON.stringify(surveys));
  return newSurvey;
};

const deleteSurveyById = (surveyId) => {
  const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
  const filtered = surveys.filter(s => s.s_id !== surveyId);
  localStorage.setItem('surveys', JSON.stringify(filtered));
};

function FCreateSurveyForm() {
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [questions, setQuestions] = useState([
    { question: '', choice: [''], type: 'multiple_choice' },
  ]);

  useEffect(() => {
    if (!surveyId) return;

    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    const existingSurvey = surveys.find(s => s.s_id === surveyId);

    if (existingSurvey) {
      setName(existingSurvey.name);
      setStatus(existingSurvey.status);
      setQuestions(existingSurvey.questions.length > 0 ? existingSurvey.questions : [
        { question: '', choice: [''], type: 'multiple_choice' }
      ]);
    }
  }, [surveyId]);

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

  // New: Delete a choice
  const deleteChoice = (qIndex, cIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choice.splice(cIndex, 1);
    // if no choice left, add an empty one to prevent zero choice
    if (newQuestions[qIndex].choice.length === 0) {
      newQuestions[qIndex].choice.push('');
    }
    setQuestions(newQuestions);
  };

  // New: Delete a question
  const deleteQuestion = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    // If no questions left, add a blank default question
    if (newQuestions.length === 0) {
      newQuestions.push({ question: '', choice: [''], type: 'multiple_choice' });
    }
    setQuestions(newQuestions);
  };

  // New: Delete entire survey and reset form
  const deleteSurvey = () => {
    if (!surveyId) {
      // If no surveyId (new form), just reset form
      setName('');
      setStatus('Active');
      setQuestions([{ question: '', choice: [''], type: 'multiple_choice' }]);
      setIsSubmitted(false);
      return;
    }

    if (window.confirm('Are you sure you want to delete this entire survey? This action cannot be undone.')) {
      deleteSurveyById(surveyId);
      alert('Survey deleted.');

      // Reset the form fields after deletion
      setName('');
      setStatus('Active');
      setQuestions([{ question: '', choice: [''], type: 'multiple_choice' }]);
      setIsSubmitted(false);
    }
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

    const savedSurvey = saveSurvey(surveyId || Date.now().toString(), name.trim(), cleanedQuestions, status);
    if (savedSurvey) {
      setIsSubmitted(true);
    } else {
      alert('Failed to save survey');
    }
  };

  return (
    <div className="p-6 w-full bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">{surveyId ? 'Edit Survey' : 'Create New Survey'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="border rounded p-4 bg-gray-50 space-y-2 relative"
          >
            <button
              type="button"
              onClick={() => deleteQuestion(qIndex)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-bold"
              title="Delete Question"
            >
              &times;
            </button>

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
              required
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
                  <div key={cIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="w-full border p-2"
                      placeholder={`Choice ${cIndex + 1}`}
                      value={c}
                      onChange={(e) =>
                        handleChoiceChange(qIndex, cIndex, e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => deleteChoice(qIndex, cIndex)}
                      className="text-red-600 hover:text-red-800 font-bold px-2"
                      title="Delete Choice"
                    >
                      &times;
                    </button>
                  </div>
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

        <div className="flex space-x-4 items-center">
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {surveyId ? "Update Survey" : "Create Survey"}
          </button>

          <button
            type="button"
            onClick={deleteSurvey}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete Entire Survey
          </button>
        </div>

        {isSubmitted && (
          <div className="p-4 bg-green-100 text-green-800 rounded mt-4">
            ✅ Survey {surveyId ? 'updated' : 'created'} successfully!
          </div>
        )}
      </form>
    </div>
  );
}

export default function CreateSurveyForm() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <FCreateSurveyForm />
    </div>
  );
}
