import React, { useState, useEffect } from 'react';
import { X, Brain, Lightbulb, Recycle, Leaf, Loader, AlertTriangle, Send } from 'lucide-react';

interface AITipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  'Segregation': Recycle,
  'Composting': Leaf,
  'Reduce/Reuse': Lightbulb,
};

type Tip = {
  icon: React.ElementType;
  title: string;
  tip: string;
  category?: string;
};

const fallbackTips: Tip[] = [
    { icon: Recycle, title: 'The Two-Bin Rule', tip: 'Always keep two separate bins for wet (kitchen waste) and dry (plastic, paper, metal) waste. This is the first and most important step in recycling.' },
    { icon: Leaf, title: 'Balcony Composting', tip: 'You don\'t need a large garden to compost. A simple pot on your balcony can turn vegetable scraps into "black gold" for your plants.' },
    { icon: Lightbulb, title: 'The Bottle-to-Broom Trick', tip: 'Before throwing away a plastic bottle, consider reusing it. They can be cut and repurposed into funnels, small planters, or even parts of a DIY broom.' }
];

const AITipsModal: React.FC<AITipsModalProps> = ({ isOpen, onClose }) => {
  const [generatedTips, setGeneratedTips] = useState<Tip[]>([]);
  const [isLoadingTips, setIsLoadingTips] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- State for Q&A Feature ---
  const [userQuery, setUserQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  // --- Generic Gemini API Caller Function ---
  const callGeminiAPI = async (prompt: string) => {
    const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyAiX0xWD9p4c-QsZ0-EHI7x_IJP9ka6o-s"; // API key is handled by the environment
    // Correct endpoint for web clients
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API call failed with status: ${response.status}. Please check the console for details.`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error("Received an invalid response structure from the AI.");
    }
    return text;
  };


  useEffect(() => {
    if (isOpen) {
      setAiAnswer('');
      setUserQuery('');
      
      const fetchInitialTips = async () => {
        setIsLoadingTips(true);
        setError(null);
        setGeneratedTips([]);

        const prompt = `You are an AI assistant for "Swachh Saathi", an app for clean living in Indian cities. Generate 3 distinct, practical waste disposal tips for an Indian household, one for each category: 'Segregation', 'Composting', and 'Reduce/Reuse'. Provide a short, catchy 'title' and a 'tip' (1-2 sentences). Respond ONLY with a valid JSON array.`;

        try {
          const rawText = await callGeminiAPI(prompt);
          const cleanedJsonString = rawText.replace(/```json|```/g, '').trim();
          const parsedTips: Array<{ title: string; tip: string; category?: string }> = JSON.parse(cleanedJsonString);
          const finalTips = parsedTips.map(tip => ({
            ...tip,
            icon: tip.category && iconMap.hasOwnProperty(tip.category)
              ? iconMap[tip.category as keyof typeof iconMap]
              : Recycle
          }));
          setGeneratedTips(finalTips);
        } catch (err) {
          console.error("Error fetching AI tips:", err);
          setError("Could not load live AI tips. Showing our top suggestions!");
          setGeneratedTips(fallbackTips);
        } finally {
          setIsLoadingTips(false);
        }
      };

      fetchInitialTips();
    }
  }, [isOpen]);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || isAnswering) return;

    setIsAnswering(true);
    setAiAnswer('');

    const prompt = `As the AI assistant for the "Swachh Saathi" app in India, please answer the following user's question about waste disposal. IMPORTANT: First, detect the language of the user's question. Then, provide a helpful, concise, and easy-to-understand answer IN THE SAME LANGUAGE. Question: "${userQuery}"`;
    
    try {
        const answer = await callGeminiAPI(prompt);
        setAiAnswer(answer);
    } catch (err) {
        console.error("Q&A API call failed:", err);
        setAiAnswer("There was an error connecting to the AI. This might be a network issue or a problem with the service. Please try again.");
    } finally {
        setIsAnswering(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">AI Disposal Tips</h3>
                <p className="text-sm text-gray-600">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="flex items-center p-3 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
              <AlertTriangle className="flex-shrink-0 inline w-4 h-4 mr-3" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <div className="space-y-6 min-h-[250px] flex flex-col justify-center">
            {isLoadingTips ? (
              <div className="flex flex-col items-center justify-center text-center">
                <Loader size={32} className="text-green-500 animate-spin" />
                <p className="mt-4 text-gray-600">Generating smart tips for you...</p>
              </div>
            ) : (
              generatedTips.map((tip, index) => (
                <div key={index} className="flex space-x-4 p-4 bg-green-50 rounded-2xl">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <tip.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{tip.tip}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* --- Q&A Section --- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-center">Have a specific question? Ask our AI!</h4>
            <form onSubmit={handleAskQuestion} className="flex items-center space-x-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="e.g., How do I dispose of old clothes?"
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                disabled={isAnswering}
              />
              <button type="submit" className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition" disabled={!userQuery.trim() || isAnswering}>
                {isAnswering ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>

            {isAnswering && (
                <div className="mt-4 text-center text-gray-600">AI is thinking...</div>
            )}

            {aiAnswer && (
                <div className="mt-4 p-4 bg-blue-50 text-blue-900 rounded-lg">
                    <p className="text-sm leading-relaxed">{aiAnswer}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITipsModal;
