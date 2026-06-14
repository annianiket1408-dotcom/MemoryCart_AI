// Mock service for MemoryCart AI Chatbot responses.
// Note: Frontend only - no backend connections.

export const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! I am MemoryCart AI, your e-commerce personal support assistant. I remember our past conversations to help you faster. How can I assist you with your orders, refunds, or policies today?",
    timestamp: new Date(Date.now() - 60000 * 5).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }
];

const mockBotResponses = [
  {
    keywords: ['order', 'tracking', '#mc-2034', 'mc-2034', 'shipment', 'where is my', 'arrive', 'delivery'],
    response: "Checking our records... I see your last Order #MC-2034 was shipped on June 12 via Express Delivery. It is currently in transit and is estimated to arrive by Tuesday, May 18. I've noted down that you previously had shipment delays, so I have flagged this with our logistics partner to ensure priority handling.",
    orderCard: {
      id: 'MC-2034',
      status: 'Shipped',
      deliveryDate: 'May 18'
    }
  },
  {
    keywords: ['refund', 'money', 'charge', '#rf-881', 'rf-881', 'status of my refund'],
    response: "I've checked the status of Refund #RF-881. It is currently in the 'Processing' state. The funds were approved on our side and should appear in your account within 3 to 5 business days, depending on your bank. Since your last interaction was about an incorrect item refund, we have waived any return restocking fees for you.",
    refundCard: {
      id: 'RF-881',
      amount: '₹499',
      status: 'Processing'
    }
  },
  {
    keywords: ['policy', 'return policy', 'guarantee', 'days', 'ship back', 'returns'],
    response: "Our standard policy allows returns within 30 days of delivery for a full refund. However, because you are a loyal customer and experienced an incorrect item issue recently, we have extended your return window to 45 days. You can download a prepaid return label directly from your dashboard.",
  },
  {
    keywords: ['memory', 'remember', 'history', 'past', 'issue', 'previous issue'],
    response: "My Customer Memory log remembers that you contacted support regarding a delayed shipment and an incorrect item. I also track your Order #MC-2034 (Shipped) and Refund #RF-881 (Processing). This allows me to tailor my replies without you having to re-explain your history!",
    orderCard: {
      id: 'MC-2034',
      status: 'Shipped',
      deliveryDate: 'May 18'
    },
    refundCard: {
      id: 'RF-881',
      amount: '₹499',
      status: 'Processing'
    }
  },
  {
    keywords: ['hi', 'hello', 'hey', 'start'],
    response: "Hello! Hope you are having a wonderful day. Let me know if you want to track Order #MC-2034, check Refund #RF-881, or ask about our return policies.",
  }
];

export const sendMessageToBot = async (userMessageText) => {
  // Simulate network delay of 1.2 seconds to show typing indicator
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const textLower = userMessageText.toLowerCase();
  
  // Find a matching response
  const matched = mockBotResponses.find(item => 
    item.keywords.some(keyword => textLower.includes(keyword))
  );

  if (matched) {
    return {
      id: Date.now(),
      sender: 'bot',
      text: matched.response,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderCard: matched.orderCard || null,
      refundCard: matched.refundCard || null
    };
  }

  // Default response
  return {
    id: Date.now(),
    sender: 'bot',
    text: `Thanks for messaging! I've noted that in your Customer Memory summary. Regarding "${userMessageText}", let me look into that for you. Is there a specific order or refund you are asking about?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    orderCard: textLower.includes('order') || textLower.includes('mc-') ? { id: 'MC-2034', status: 'Shipped', deliveryDate: 'May 18' } : null,
    refundCard: textLower.includes('refund') || textLower.includes('rf-') ? { id: 'RF-881', amount: '₹499', status: 'Processing' } : null
  };
};
