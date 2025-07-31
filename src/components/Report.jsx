import React from 'react';
import { decodeHtml } from '../utils/helpers'; 

function Report({ questions, userAnswers, userEmail }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-teal-600 p-4 sm:p-8 flex flex-col items-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Quiz Report</h1>
                <p className="text-lg text-gray-600 mb-6">Thank you for completing the quiz, <span className="font-semibold text-blue-700">{userEmail}</span>!</p>
            </div>

            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Performance</h2>
                {questions.map((question, index) => {
                    const userAnswer = userAnswers[question.id];
                    const isCorrect = userAnswer === question.correct_answer; 

                    return (
                        <div key={question.id} className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                Q{index + 1}: <span dangerouslySetInnerHTML={{ __html: decodeHtml(question.question) }}></span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                                {/* Display user's answer */}
                                <div className="p-3 bg-blue-100 rounded-md">
                                    <p className="font-medium text-blue-800">Your Answer:</p>
                                    <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: decodeHtml(userAnswer || 'Not Answered') }}></p>
                                </div>
                                {/* Display correct answer, with color indicating correctness */}
                                <div className={`p-3 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                                    <p className="font-medium text-gray-800">Correct Answer:</p>
                                    <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`} dangerouslySetInnerHTML={{ __html: decodeHtml(question.correct_answer) }}></p>
                                </div>
                            </div>
                            {/* Feedback messages */}
                            {!isCorrect && userAnswer && (
                                <p className="mt-4 text-sm text-red-600">
                                    Your answer was incorrect.
                                </p>
                            )}
                            {!userAnswer && (
                                <p className="mt-4 text-sm text-yellow-600">
                                    You did not answer this question.
                                </p>
                            )}
                        </div>
                    );
                })}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => window.location.reload()} 
                        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 text-xl"
                    >
                        Restart Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Report;
