import React from 'react';
import { decodeHtml } from '../utils/helpers'; 

function Question({ question, selectedAnswer, onAnswerSelect }) {
    const decodedQuestion = decodeHtml(question.question);

    return (
        <div className="flex-grow">
            {/* Question text, rendered with decoded HTML */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: decodedQuestion }}>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Map through shuffled answers to create choice buttons */}
                {question.shuffled_answers.map((answer, index) => {
                    const decodedAnswer = decodeHtml(answer);
                    return (
                        <button
                            key={index} 
                            onClick={() => onAnswerSelect(question.id, answer)} 
                            className={`
                                p-4 border rounded-lg text-left text-lg
                                transition-all duration-200 ease-in-out
                                ${selectedAnswer === answer 
                                    ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-105'
                                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                                }
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            `}
                            aria-pressed={selectedAnswer === answer} 
                        >
                            <span dangerouslySetInnerHTML={{ __html: decodedAnswer }}></span> {/* Render decoded answer */}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Question;
