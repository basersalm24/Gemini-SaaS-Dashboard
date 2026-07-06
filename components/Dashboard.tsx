import React, { useState } from 'react';
import MetricCard from './MetricCard';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';
import SubscriptionTiers from './SubscriptionTiers';
import ChatWidget from './ChatWidget';
import { generateDashboardSummary, getChatResponse } from '../services/geminiService';
import { Metric, ChartDataPoint, ChatMessage } from '../types';
import { SparklesIcon, ChatIcon } from './icons';

// Mock Data
const metrics: Metric[] = [
  { title: 'Total Revenue', value: '$405,091.00', change: '+4.2%', changeType: 'increase' },
  { title: 'Subscriptions', value: '2,350', change: '+120', changeType: 'increase' },
  { title: 'Avg. Response Time', value: '28.7s', change: '-1.5s', changeType: 'decrease' },
  { title: 'Churn Rate', value: '1.2%', change: '+0.1%', changeType: 'increase' },
];

const revenueData: ChartDataPoint[] = [
  { name: 'Jan', revenue: 21000 }, { name: 'Feb', revenue: 25000 }, { name: 'Mar', revenue: 32000 },
  { name: 'Apr', revenue: 28000 }, { name: 'May', revenue: 35000 }, { name: 'Jun', revenue: 41000 },
  { name: 'Jul', revenue: 45000 }, { name: 'Aug', revenue: 42000 }, { name: 'Sep', revenue: 51000 },
  { name: 'Oct', revenue: 55000 }, { name: 'Nov', revenue: 62000 }, { name: 'Dec', revenue: 68000 },
];

const formatSummary = (text: string) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\* (.*?)(?=\n\* |$)/g, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br />');
};

const SummaryModal: React.FC<{ summary: string; onClose: () => void }> = ({ summary, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full p-6 relative animate-slide-up">
            <div className="flex items-center mb-4">
                <SparklesIcon className="text-indigo-400" />
                <h2 className="text-xl font-bold text-white ml-2">AI Generated Summary</h2>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">&times;</button>
            <div className="prose prose-invert prose-sm max-w-none text-slate-300" dangerouslySetInnerHTML={{ __html: formatSummary(summary) }}>
            </div>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    setSummary('');
    const result = await generateDashboardSummary(metrics, revenueData);
    setSummary(result);
    setIsSummaryLoading(false);
    setShowSummaryModal(true);
  };

  const handleSendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    const newUserMessage: ChatMessage = { id: Date.now(), sender: 'user', text: userInput };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);

    const aiResponse = await getChatResponse(userInput, metrics, revenueData);
    const newAiMessage: ChatMessage = { id: Date.now() + 1, sender: 'ai', text: aiResponse };
    setChatMessages(prev => [...prev, newAiMessage]);
    setIsChatLoading(false);
  };

  return (
    <div className="relative min-h-full">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back, Jane!</h1>
          <button
            onClick={handleGenerateSummary}
            disabled={isSummaryLoading}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg disabled:cursor-not-allowed"
          >
            <SparklesIcon />
            <span className="ml-2">{isSummaryLoading ? 'Generating...' : 'Generate AI Summary'}</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
        
        <SubscriptionTiers />
      </div>

      {showSummaryModal && <SummaryModal summary={summary} onClose={() => setShowSummaryModal(false)} />}
      
      {/* Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Open AI Assistant"
          >
              <ChatIcon />
          </button>
      </div>

      <ChatWidget 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
      />
    </div>
  );
};

export default Dashboard;