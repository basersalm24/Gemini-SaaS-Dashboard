import { Metric, ChartDataPoint, ActivityItem } from '../types';

const callGemini = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        
        if (!response.ok) {
           throw new Error(data.error || 'Failed to communicate with the AI.');
        }
        
        return data.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return `Error: Failed to communicate with the AI. ${error.message}`;
        }
        return "An unknown error occurred while communicating with the AI.";
    }
}

export const generateDashboardSummary = async (
    metrics: Metric[],
    revenueData: ChartDataPoint[]
): Promise<string> => {
    const metricsString = metrics.map(m => `${m.title}: ${m.value} (${m.change} ${m.changeType})`).join('\n');
    const revenueString = `Monthly revenue data for the past year: ${revenueData.map(d => `${d.name}: $${d.revenue}`).join(', ')}.`;

    const prompt = `
        You are a senior business analyst AI assistant for a SaaS company.
        Analyze the following dashboard data and provide a concise, insightful summary for a busy executive.
        Focus on key trends, significant changes, and potential areas of concern or opportunity.
        Present the output as a clean, well-formatted summary. Use markdown for formatting, like bullet points for key takeaways.

        **Dashboard Data:**

        **Key Metrics:**
        ${metricsString}

        **Revenue Trend:**
        ${revenueString}

        ---

        Begin your summary now.
    `;

    return callGemini(prompt);
};

export const getChatResponse = async (
    question: string,
    metrics: Metric[],
    revenueData: ChartDataPoint[]
): Promise<string> => {
    const metricsString = metrics.map(m => `${m.title}: ${m.value} (${m.change} ${m.changeType})`).join('\n');
    const revenueString = `Monthly revenue data for the past year: ${revenueData.map(d => `${d.name}: $${d.revenue}`).join(', ')}.`;

    const prompt = `
        You are a helpful and clever AI data analyst for a SaaS company.
        A user is asking a question about their dashboard.
        Answer the question based *only* on the data provided below.
        If the question cannot be answered with the data, say so politely.
        Be concise and helpful. Use markdown for formatting if it improves clarity.

        **Available Data:**

        **Key Metrics:**
        ${metricsString}

        **Revenue Trend:**
        ${revenueString}

        ---
        
        **User's Question:** "${question}"

        ---

        Your answer:
    `;

    return callGemini(prompt);
}