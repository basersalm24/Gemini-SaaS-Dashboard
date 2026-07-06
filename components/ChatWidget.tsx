import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { CloseIcon, SendIcon, SparklesIcon } from './icons';

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
    messages: ChatMessage[];
    onSendMessage: (input: string) => void;
    isLoading: boolean;
}

const formatMessage = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\* (.*?)(?=\n\* |$)/g, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br />');
};

const SuggestionButton: React.FC<{text: string, onSelect: (prompt: string) => void}> = ({text, onSelect}) => (
    <button
        onClick={() => onSelect(text)}
        className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-slate-300 text-sm px-3 py-1.5 rounded-full transition-colors duration-200"
    >
        {text}
    </button>
);


const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, messages, onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            // A small delay ensures the scroll happens after any opening animations.
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, isLoading, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        onSendMessage(input);
        setInput('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end sm:items-center">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>
            <div className="bg-slate-800 border border-slate-700 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg h-[80%] sm:h-[70vh] flex flex-col relative animate-slide-up-fast">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <div className="flex items-center">
                        <SparklesIcon className="text-indigo-400" />
                        <h2 className="text-lg font-bold text-white ml-2">AI Assistant</h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && !isLoading ? (
                        <div className="text-center py-8 px-4 flex flex-col justify-center h-full">
                            <div className="flex justify-center mb-4">
                                <div className="bg-slate-700 p-3 rounded-full">
                                    <SparklesIcon className="w-8 h-8 text-indigo-400" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Hello!</h3>
                            <p className="text-slate-400 mt-1">I'm your AI Data Analyst. Ask me anything about the dashboard data.</p>
                            <div className="mt-8">
                                <p className="text-sm text-slate-500 mb-3">Or try one of these suggestions:</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    <SuggestionButton text="What was our best month for revenue?" onSelect={onSendMessage} />
                                    <SuggestionButton text="Summarize the key metrics for me." onSelect={onSendMessage} />
                                    <SuggestionButton text="How is our churn rate performing?" onSelect={onSendMessage} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`max-w-xs md:max-w-md p-3 rounded-xl ${
                                        msg.sender === 'user' 
                                            ? 'bg-indigo-600 text-white rounded-br-none' 
                                            : 'bg-slate-700 text-slate-200 rounded-bl-none'
                                    }`}
                                >
                                    <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}></div>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                         <div className="flex justify-start">
                            <div className="bg-slate-700 text-slate-200 rounded-xl rounded-bl-none p-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-700 flex-shrink-0">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your data..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-full py-3 pl-4 pr-12 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-indigo-400 hover:text-indigo-300 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;