import React from 'react';
import Question from './Question.jsx';

function Quiz({ 
    questions,
    currentQuestionIndex,
    timeLeft,
    userAnswers,
    onAnswerSelect,
    onNavigateToQuestion,
    onNextQuestion,
    onPreviousQuestion,
    onSubmitQuiz,
}) {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQuestionIndex]; 

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-4 lg:p-8">
            {/* Navigation Panel (Left/Top) */}
            <div className="lg:w-1/4 w-full bg-white p-6 rounded-xl shadow-lg lg:mr-6 mb-6 lg:mb-0 overflow-y-auto max-h-[calc(100vh-32px)]">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Quiz Overview</h2>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {questions.map((q, index) => (
                        <button
                            key={q.id} 
                            onClick={() => onNavigateToQuestion(index)} 
                            className={`
                                w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold
                                transition-all duration-200 ease-in-out
                                ${index === currentQuestionIndex 
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : userAnswers[q.id] 
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                                }
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            `}
                            aria-label={`Go to question ${index + 1}`}
                        >
                            {index + 1} {/* Display question number */}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Quiz Content (Right/Bottom) */}
            <div className="lg:w-3/4 w-full bg-white p-8 rounded-xl shadow-lg flex flex-col">
                {/* Timer and Question Counter */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="text-xl font-bold text-gray-700">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className="text-2xl font-extrabold text-red-600 bg-red-100 px-4 py-2 rounded-lg shadow-inner">
                        <span role="img" aria-label="timer-icon" className="mr-2">⏳</span> {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Current Question Display */}
                {currentQuestion && (
                    <Question
                        question={currentQuestion}
                        selectedAnswer={userAnswers[currentQuestion.id]}
                        onAnswerSelect={onAnswerSelect}
                    />
                )}

                {/* Navigation Buttons (Previous, Next, Submit) */}
                <div className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-center">
                    <button
                        onClick={onPreviousQuestion}
                        disabled={currentQuestionIndex === 0} 
                        className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        aria-label="Previous Question"
                    >
                        Previous
                    </button>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <button
                            onClick={onNextQuestion}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
                            aria-label="Next Question"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={onSubmitQuiz}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
                            aria-label="Submit Quiz"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz; 
