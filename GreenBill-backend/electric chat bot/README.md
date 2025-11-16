# Electricity Bill Chatbot Widget

A modern, responsive chatbot widget designed to help users understand and reduce their electricity bills through AI-powered advice and energy optimization tips.

## Features

- 🤖 **AI-Powered Responses**: Google Gemini AI integration for intelligent, contextual advice
- 📱 **Mobile-Friendly**: Fully responsive design that works on all devices
- 🎨 **Modern UI**: Clean, professional interface built with TailwindCSS
- ⚡ **Easy Integration**: Simple copy-paste integration for any website
- 🔧 **Smart Fallback**: Intelligent responses even without API key
- 💡 **Comprehensive Coverage**: Covers appliances, lighting, smart home, solar panels, and more
- 🚀 **Real-time Chat**: Smooth typing indicators and instant responses
- 🛡️ **Error Handling**: Graceful fallbacks and user-friendly error messages

## Quick Start

### Option 1: React Component with Gemini AI (Recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Gemini API:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory:
   ```bash
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

> **Note:** Without the Gemini API key, the chatbot will use intelligent fallback responses. The API key enables advanced AI-powered responses for any electricity-related question.

### Option 2: Direct HTML Integration

Simply copy the contents of `embed-script.html` and paste it into your website. The widget will work immediately without any build process.

## Usage

### React Integration

```jsx
import ChatbotWidget from './ChatbotWidget';

function App() {
  return (
    <div>
      {/* Your website content */}
      <ChatbotWidget />
    </div>
  );
}
```

### HTML Integration

```html
<!-- Copy the entire content from embed-script.html -->
<!-- The widget will automatically appear as a floating button -->
```

## Chatbot Capabilities

The chatbot can help users with:

### 🔍 High Bill Analysis
- Identifies common causes of high electricity bills
- Provides immediate action steps
- Offers appliance-specific optimization tips

### 🏠 Appliance Optimization
- **Refrigerator**: Temperature settings, maintenance, efficiency tips
- **Air Conditioning**: Thermostat optimization, maintenance schedules
- **Washing Machine**: Water temperature, load optimization
- **Dishwasher**: Eco modes, load management

### 💡 Smart Home Solutions
- Smart thermostat recommendations
- Smart plug and switch guidance
- Energy monitoring devices
- Automation setup tips

### ☀️ Solar Panel Advice
- Cost-benefit analysis
- Installation considerations
- Financing options
- Tax incentives

### 🔆 LED Lighting
- Energy savings calculations
- Installation guidance
- Smart lighting options
- Cost comparisons

## Gemini AI Integration

### Getting Started with Gemini API

1. **Get API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy the key for use in your application

2. **Configure Environment:**
   ```bash
   # Create .env file in project root
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **API Features:**
   - **Intelligent Responses**: Context-aware answers to any electricity question
   - **Natural Language**: Understands complex queries and provides detailed solutions
   - **Fallback System**: Works even without API key using smart pre-built responses
   - **Error Handling**: Graceful degradation when API is unavailable

### Customization

### Styling
The widget uses TailwindCSS for styling. You can customize colors by modifying the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      'electric-blue': '#3B82F6',
      'energy-green': '#10B981',
      'warning-orange': '#F59E0B',
      'danger-red': '#EF4444'
    }
  }
}
```

### Response Logic
Modify the `geminiService.js` file to customize the AI prompt or integrate with other AI services. The service includes:
- Custom prompt engineering for electricity expertise
- Fallback responses for offline mode
- Error handling and retry logic
- API key validation

## File Structure

```
electricity-chatbot-widget/
├── public/
│   └── index.html
├── src/
│   ├── App.js                 # Main app component
│   ├── ChatbotWidget.js       # Chatbot widget component
│   ├── index.js              # React entry point
│   └── index.css             # Global styles and TailwindCSS
├── embed-script.html         # Standalone HTML version
├── package.json              # Dependencies
├── tailwind.config.js        # TailwindCSS configuration
└── README.md                 # This file
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Future Enhancements

- [ ] OpenAI API integration
- [ ] User authentication
- [ ] Conversation history
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Custom branding options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this widget in your projects!

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for energy-conscious homeowners**
