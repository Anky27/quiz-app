import React, { useState } from 'react';

function Start({ onStartQuiz }) { 
    const [email, setEmail] = useState(''); 
    const [emailError, setEmailError] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!email) {
            setEmailError('Email address is required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');
        onStartQuiz(email); 
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center transform transition-all duration-300 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to the Quiz!</h1>
                <p className="text-lg text-gray-600 mb-8">Please enter your email to begin.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
                            aria-label="Email Address"
                        />
                        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-xl"
                    >
                        Start Quiz
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Start; 
