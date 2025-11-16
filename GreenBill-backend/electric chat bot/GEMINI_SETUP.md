# Gemini API Setup Guide

## Quick Setup (5 minutes)

### Step 1: Get Your API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Step 2: Configure Your Environment
1. Create a `.env` file in your project root:
   ```bash
   touch .env
   ```

2. Add your API key to the `.env` file:
   ```bash
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm start
   ```

### Step 3: Test the Integration
1. Open the chatbot by clicking the floating button
2. Ask any electricity-related question
3. You should see "AI Powered" in the header instead of "Basic Mode"

## What You Get

### With Gemini API:
- **Intelligent Responses**: AI understands context and provides detailed, personalized advice
- **Natural Language**: Ask questions in your own words
- **Comprehensive Coverage**: Handles any electricity-related topic
- **Real-time Processing**: Instant, contextual responses

### Without API Key (Fallback Mode):
- **Smart Responses**: Pre-built responses for common electricity questions
- **Categorized Topics**: High bills, appliances, solar, LED, smart home
- **Still Functional**: Works perfectly for basic electricity advice

## Example Questions to Try

### With Gemini API:
- "My electricity bill is $300 this month, what's causing it to be so high?"
- "I have a 2000 sq ft house with central AC, how can I reduce cooling costs?"
- "Should I replace my 10-year-old refrigerator with an energy-efficient model?"
- "What's the best way to optimize my home office for energy efficiency?"
- "I'm considering solar panels but my roof faces north, what are my options?"

### Fallback Mode:
- "My electricity bill is too high"
- "Should I install solar panels?"
- "How can I make my appliances more efficient?"
- "What are the benefits of LED lighting?"

## Troubleshooting

### API Key Not Working
1. Check that your `.env` file is in the project root
2. Ensure the variable name is exactly `REACT_APP_GEMINI_API_KEY`
3. Restart the development server after adding the key
4. Check the browser console for error messages

### Still Seeing "Basic Mode"
1. Verify your API key is valid
2. Check your internet connection
3. Ensure the `.env` file is properly formatted (no spaces around the = sign)

### Getting API Errors
1. Check your API key permissions
2. Verify you have access to the Gemini API
3. Check your API usage limits

## Cost Information

- **Free Tier**: Google provides free usage for Gemini API
- **Pricing**: Check [Google AI Pricing](https://ai.google.dev/pricing) for current rates
- **Usage**: The chatbot is optimized for efficiency to minimize API calls

## Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure and don't share it publicly
- The API key is only used client-side for this demo (in production, consider server-side implementation)

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is correctly configured
3. Test with simple questions first
4. Check the fallback responses are working

The chatbot will work in both modes, so you can always test the basic functionality even without the API key!
