import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, MessageSquare, Package, RefreshCw, ChevronRight, HelpCircle, ArrowRight, Brain } from 'lucide-react';

export const ChatWindow = ({ messages, isTyping, onSendMessage }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Render Order Card Component inline
  const renderOrderCard = (order) => {
    if (!order) return null;
    const isShipped = order.status === 'Shipped';
    
    return (
      <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-4 mt-3.5 space-y-3.5 shadow-xs max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
              <Package size={16} />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Tracking</span>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {order.status}
          </span>
        </div>

        <div>
          <div className="text-sm font-bold text-black">Order #{order.id}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">Expected Delivery: <span className="font-semibold text-indigo-600">{order.deliveryDate}</span></div>
        </div>

        {/* Stepper Progress */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium mb-1.5 px-1">
            <span className="text-indigo-600 font-semibold">Placed</span>
            <span className="text-indigo-600 font-semibold">Shipped</span>
            <span>Delivered</span>
          </div>
          <div className="relative flex items-center justify-between">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0 rounded-full" />
            {/* Active Line Progress */}
            <div className="absolute left-0 w-1/2 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 rounded-full" />
            
            {/* Dots */}
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100 z-10" />
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100 z-10" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white z-10" />
          </div>
        </div>
      </div>
    );
  };

  // Render Refund Card Component inline
  const renderRefundCard = (refund) => {
    if (!refund) return null;
    
    return (
      <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-4 mt-3.5 space-y-3 shadow-xs max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600">
              <RefreshCw size={16} />
            </div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Refund Details</span>
          </div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
            {refund.status}
          </span>
        </div>

        <div className="flex justify-between items-baseline">
          <div>
            <div className="text-sm font-bold text-black">Refund #{refund.id}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Credited to Original Method</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-black">{refund.amount}</div>
            <div className="text-[10px] text-gray-400 font-medium">Est. 3-5 Business Days</div>
          </div>
        </div>

        {/* Small Progress bar */}
        <div className="pt-1">
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-2/3 animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  const emptyStateCards = [
    {
      title: "Policy Questions",
      description: "Ask about store returns, shipment rules, or FAQ.",
      example: "What is your return policy?"
    },
    {
      title: "Order Tracking",
      description: "Track shipment progress and check delivery estimates.",
      example: "Where is Order MC-2034?"
    },
    {
      title: "Refund Tracking",
      description: "Check the status and amounts of transaction refunds.",
      example: "What is the status of Refund RF-881?"
    },
    {
      title: "Memory Assistance",
      description: "Ask the AI assistant to trace what it remembers about you.",
      example: "What does my Customer Memory say?"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 select-text bg-white">
      {messages.length === 0 ? (
        <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
          {/* Welcome Intro */}
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 mb-2">
              <MessageSquare size={28} />
            </div>
            <h3 className="text-xl font-bold text-black tracking-tight">MemoryCart AI Assistant</h3>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Welcome to your intelligent support terminal. I track store policies, orders, refunds, and remember details across sessions to avoid repetitive questions.
            </p>
          </div>

          {/* Core Feature Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emptyStateCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -2, border: '1px solid #D1D5DB', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-4 text-left transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">{card.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{card.description}</p>
                </div>
                <button
                  onClick={() => onSendMessage && onSendMessage(card.example)}
                  className="w-full mt-auto text-left py-2 px-3 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 hover:text-black font-medium transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>"{card.example}"</span>
                  <ArrowRight size={12} className="text-gray-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((message) => {
              const isBot = message.sender === 'bot';
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex items-start gap-3.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Bot Avatar */}
                  {isBot && (
                    <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex-shrink-0 mt-0.5">
                      <Bot size={16} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-[80%] space-y-1.5 ${!isBot ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isBot
                          ? 'bg-white border border-gray-200 text-black shadow-xs'
                          : 'bg-black text-white font-normal'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      
                      {/* Render custom tracking cards if present */}
                      {isBot && message.orderCard && renderOrderCard(message.orderCard)}
                      {isBot && message.refundCard && renderRefundCard(message.refundCard)}
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`text-[9px] font-semibold uppercase tracking-wider text-gray-400 px-1 ${
                        isBot ? 'text-left' : 'text-right'
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {!isBot && (
                    <div className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 flex-shrink-0 mt-0.5 order-3">
                      <User size={16} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3.5 justify-start"
            >
              <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-gray-200 text-black px-4 py-3 rounded-2xl flex items-center space-x-1 shadow-xs">
                <span className="text-xs text-gray-400 mr-2 font-medium">MemoryCart AI is typing</span>
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full inline-block"
                />
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                  className="w-1.5 h-1.5 bg-indigo-400 rounded-full inline-block"
                />
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                  className="w-1.5 h-1.5 bg-gray-600 rounded-full inline-block"
                />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
