import React from 'react';
import ChatbotWidget from './ChatbotWidget';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo content to show the widget in action */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Electricity Bill Chatbot Widget
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How to Use This Widget
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                This is a demo page showing the electricity bill chatbot widget in action. 
                The floating button in the bottom-right corner opens the chatbot.
              </p>
              <p>
                <strong>Try asking questions like:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>"My electricity bill is too high, how can I reduce it?"</li>
                <li>"Should I install solar panels?"</li>
                <li>"How can I make my appliances more efficient?"</li>
                <li>"What are the benefits of LED lighting?"</li>
                <li>"How do smart home devices help save energy?"</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Mobile-friendly responsive design</li>
                <li>• Step-by-step energy saving advice</li>
                <li>• Appliance optimization tips</li>
                <li>• Smart home recommendations</li>
                <li>• Solar panel guidance</li>
                <li>• Real-time chat interface</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Integration
              </h3>
              <p className="text-gray-600 mb-4">
                This widget can be easily integrated into any website by copying the component code.
              </p>
              <div className="bg-gray-100 rounded p-3 text-sm font-mono">
                &lt;ChatbotWidget /&gt;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The actual chatbot widget */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
