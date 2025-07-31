import React, { useState, useEffect, useRef } from 'react';
import Start from './components/Start.jsx';       
import Quiz from './components/Quiz.jsx';         
import Report from './components/Report.jsx';    
import Question from './components/Question.jsx';
import { decodeHtml } from './utils/helpers.js';

// Main App component - Manages overall application flow and data
function App() {
    const [currentPage, setCurrentPage] = useState('start');
    const [userEmail, setUserEmail] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const timerRef = useRef(null);

    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        setIsAuthReady(true); 
    }, []); 

    useEffect(() => {
        if (currentPage === 'quiz' && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1); 
            }, 1000);
        } else if (timeLeft === 0 && currentPage === 'quiz') {
            clearInterval(timerRef.current);
            handleSubmitQuiz(); 
        }

        return () => clearInterval(timerRef.current);
    }, [currentPage, timeLeft]); 
    const handleStartQuiz = async (email) => {
        setUserEmail(email); 
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=15');
            const data = await response.json();

            const processedQuestions = data.results.map((q, index) => {
                const allAnswers = [...q.incorrect_answers, q.correct_answer];
                const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
                return {
                    ...q,
                    shuffled_answers: shuffledAnswers,
                    id: index 
                };
            });
            setQuestions(processedQuestions); 
            setCurrentPage('quiz'); 
            setTimeLeft(30 * 60);
            setUserAnswers({}); 
        } catch (error) {
            console.error('Error fetching questions:', error);
            alert('Failed to load quiz questions. Please check your internet connection and try again.');
        }
    };

    const handleAnswerSelect = (questionId, selectedAnswer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedAnswer, 
        }));
    };

    const handleNavigateToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        clearInterval(timerRef.current); 
        setCurrentPage('report'); 
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'start':
                return <Start onStartQuiz={handleStartQuiz} />; 
            case 'quiz':
                return (
                    <Quiz
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        timeLeft={timeLeft}
                        userAnswers={userAnswers}
                        onAnswerSelect={handleAnswerSelect}
                        onNavigateToQuestion={handleNavigateToQuestion}
                        onNextQuestion={handleNextQuestion}
                        onPreviousQuestion={handlePreviousQuestion}
                        onSubmitQuiz={handleSubmitQuiz}
                    />
                ); 
            case 'report':
                return <Report questions={questions} userAnswers={userAnswers} userEmail={userEmail} />; 
            default:
                return <Start onStartQuiz={handleStartQuiz} />; 
        }
    };

    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl font-semibold text-gray-700">Loading application...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            {renderPage()} {/* Render the appropriate page */}
        </div>
    );
}

export default App;
