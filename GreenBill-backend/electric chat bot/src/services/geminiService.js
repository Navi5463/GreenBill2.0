import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // Get API key from environment variables or use a default
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(userMessage) {
    try {
      const prompt = `You are an expert electricity bill assistant and home energy optimization specialist. Your role is to help users understand and reduce their electricity bills through practical, actionable advice.

User's question: "${userMessage}"

Please provide a helpful, detailed response that includes:
1. Specific, actionable steps they can take
2. Cost-saving tips and energy optimization strategies
3. Appliance-specific advice when relevant
4. Smart home solutions if applicable
5. Maintenance tips for energy efficiency
6. Real-world examples and calculations when possible

Keep your response:
- Conversational and friendly
- Easy to understand for homeowners
- Focused on practical solutions
- Encouraging and motivating
- Under 500 words for readability

If the question is not related to electricity, energy, or home optimization, politely redirect them to ask about electricity-related topics.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Fallback response if API fails
      return this.getFallbackResponse(userMessage);
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('high bill') || message.includes('expensive') || message.includes('cost')) {
      return `I understand you're concerned about your high electricity bill. Here are some immediate steps you can take:

**🔍 Quick Actions:**
1. **Check for phantom loads** - Unplug devices that aren't in use (chargers, TVs on standby)
2. **Adjust your thermostat** - Set AC to 78°F (26°C) or higher, use fans to circulate air
3. **Switch to LED bulbs** - Replace incandescent bulbs with LEDs (saves 80% energy)
4. **Use natural light** - Open curtains during the day, turn off unnecessary lights

**🏠 Appliance Optimization:**
• **Refrigerator**: Clean coils monthly, check door seals, set temp to 37-40°F
• **Washing Machine**: Use cold water, full loads only, air dry when possible
• **Dishwasher**: Run only when full, use eco mode
• **Water Heater**: Lower to 120°F, insulate tank

**💡 Smart Upgrades:**
• Install smart thermostats (saves 10-15%)
• Use smart plugs for scheduling devices
• Consider energy-efficient appliances (ENERGY STAR rating)
• Install solar panels for long-term savings

Would you like me to elaborate on any of these suggestions?`;
    }

    if (message.includes('solar') || message.includes('panel')) {
      return `Great question about solar panels! Here's what you should know:

**☀️ Solar Panel Benefits:**
• **Immediate savings**: 20-50% reduction in electricity bills
• **Long-term investment**: Payback period typically 6-10 years
• **Tax incentives**: Federal tax credits up to 30% of installation cost
• **Property value**: Increases home value by 3-4%

**💰 Cost Considerations:**
• Average residential system: $15,000-$25,000 (before incentives)
• Monthly savings: $100-$300 depending on usage and location
• Financing options: Solar loans, leases, or power purchase agreements

**🔧 Installation Factors:**
• Roof condition and orientation (south-facing ideal)
• Local regulations and permits
• Net metering policies in your area
• System size based on your energy consumption

Would you like help calculating potential savings for your home?`;
    }

    if (message.includes('led') || message.includes('light') || message.includes('bulb')) {
      return `LED lighting is one of the easiest ways to save energy! Here's the complete guide:

**💡 LED vs Traditional Bulbs:**
• **Energy savings**: 80-90% less electricity than incandescent
• **Lifespan**: 25,000-50,000 hours vs 1,000 hours for incandescent
• **Heat output**: 90% less heat, reducing AC load
• **Cost**: Higher upfront but saves $50-100 per bulb over lifetime

**🏠 Where to Replace:**
• **High-use areas**: Kitchen, living room, bathroom
• **Outdoor lighting**: Security lights, porch lights
• **Decorative lighting**: String lights, accent lighting

**📊 Quick Savings Calculator:**
• Replace 10 incandescent bulbs (60W each) with LEDs (9W each)
• Daily savings: 5.1 kWh = $0.51/day = $186/year
• Bulb cost: $50 vs annual savings: $186

Ready to start your LED upgrade? I can help you prioritize which lights to replace first!`;
    }

    if (message.includes('appliance') || message.includes('fridge') || message.includes('ac') || message.includes('washing')) {
      return `Let's optimize your appliances for maximum energy efficiency! Here's a comprehensive guide:

**❄️ Refrigerator (Biggest Energy Hog):**
• **Temperature settings**: 37-40°F (fridge), 0-5°F (freezer)
• **Maintenance**: Clean coils every 6 months, check door seals
• **Location**: Keep away from heat sources, ensure proper ventilation
• **Upgrade**: ENERGY STAR models use 15% less energy

**🌡️ Air Conditioning:**
• **Thermostat**: Set to 78°F (26°C) or higher, use programmable thermostat
• **Maintenance**: Clean/replace filters monthly, service annually
• **Insulation**: Seal windows, doors, and ducts
• **Smart upgrades**: Smart thermostats save 10-15% automatically

**🧺 Washing Machine:**
• **Water temperature**: Use cold water for most loads (saves 90% energy)
• **Load size**: Full loads only, use appropriate water level
• **Drying**: Air dry when possible, clean lint trap
• **Upgrade**: Front-loading machines use 50% less water

Which appliance would you like to focus on optimizing first?`;
    }

    if (message.includes('smart') || message.includes('automation') || message.includes('timer')) {
      return `Smart home technology can significantly reduce your energy bills! Here's how to get started:

**🏠 Smart Thermostats:**
• **Nest, Ecobee, Honeywell**: Learn your schedule, auto-adjust
• **Savings**: 10-15% on heating/cooling costs
• **Features**: Remote control, geofencing, energy reports
• **Installation**: DIY-friendly, professional installation available

**🔌 Smart Plugs & Switches:**
• **Scheduling**: Turn off devices during peak hours
• **Monitoring**: Track energy usage of individual devices
• **Voice control**: Works with Alexa, Google Assistant
• **Cost**: $15-50 per plug, easy to install

**💰 Expected Savings:**
• Smart thermostat: $100-200/year
• Smart plugs: $50-100/year
• Smart lighting: $30-80/year
• Total potential savings: $180-380/year

Would you like help choosing specific smart devices for your home?`;
    }

    return `I'm here to help with your electricity bill questions! I can assist with:

• **High bill analysis** - Understanding why your bill is expensive
• **Energy-saving tips** - Practical ways to reduce consumption
• **Appliance optimization** - Making your devices more efficient
• **Smart home solutions** - Technology to automate savings
• **Solar panel advice** - Renewable energy options
• **LED lighting** - Upgrading to efficient lighting
• **Maintenance schedules** - Keeping appliances running efficiently

Just ask me about any of these topics, or tell me what's concerning you about your electricity bill!`;
  }

  // Method to check if API key is configured
  isApiKeyConfigured() {
    return this.apiKey && this.apiKey !== 'YOUR_GEMINI_API_KEY_HERE';
  }

  // Method to get API key status
  getApiKeyStatus() {
    if (!this.isApiKeyConfigured()) {
      return {
        configured: false,
        message: 'Gemini API key not configured. Using fallback responses. Please set REACT_APP_GEMINI_API_KEY environment variable.'
      };
    }
    return {
      configured: true,
      message: 'Gemini API is configured and ready to use.'
    };
  }
}

export default new GeminiService();
