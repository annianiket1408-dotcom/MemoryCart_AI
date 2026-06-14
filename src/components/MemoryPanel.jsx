import React from 'react';
import { Package, AlertCircle, RefreshCw, Sparkles, Brain, X } from 'lucide-react';
import MemoryCard from './MemoryCard';

export const MemoryPanel = ({ onClose }) => {
  const memoryData = [
    {
      id: 'prev-issues',
      icon: AlertCircle,
      title: 'Previous Issues',
      description: '• Delayed shipment\n• Wrong product received',
      timestamp: 'Last ticket closed 5 days ago',
      status: 'Resolved',
      statusColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    },
    {
      id: 'last-order',
      icon: Package,
      title: 'Last Order',
      description: 'Order #MC-2034 • Expected Delivery: May 18',
      timestamp: 'Placed on June 12, 2026',
      status: 'Shipped',
      statusColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    },
    {
      id: 'last-refund',
      icon: RefreshCw,
      title: 'Last Refund',
      description: 'Refund #RF-881 • Value: ₹499',
      timestamp: 'Approved June 13, 2026',
      status: 'Processing',
      statusColor: 'bg-amber-50 text-amber-700 border border-amber-200',
    },
    {
      id: 'mem-summary',
      icon: Brain,
      title: 'Memory Summary',
      description: 'Customer previously contacted support regarding delayed shipments and refund requests. Prefers quick email updates.',
      timestamp: 'Updated 10 hours ago',
      status: 'Active',
      statusColor: 'bg-purple-50 text-purple-700 border border-purple-200',
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] border-l border-gray-200 p-6 overflow-y-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="text-indigo-600 w-5 h-5" />
          <h2 className="text-lg font-bold text-black tracking-tight">
            Customer Memory
          </h2>
        </div>
        
        {/* Mobile close button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-black hover:bg-gray-100 md:hidden transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        Past interactions and customer traits automatically indexed and remembered by MemoryCart AI's Hindsight Memory system.
      </p>

      {/* Cards List */}
      <div className="flex flex-col gap-4">
        {memoryData.map((item) => (
          <MemoryCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={
              <div className="whitespace-pre-line text-gray-600">
                {item.description}
              </div>
            }
            timestamp={item.timestamp}
            status={item.status}
            statusColor={item.statusColor}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-gray-200 flex items-center gap-2 text-[10px] text-gray-400 justify-center">
        <Sparkles size={11} className="text-indigo-500" />
        <span className="font-medium">Hindsight Memory Core v1.4.2</span>
      </div>
    </div>
  );
};

export default MemoryPanel;
