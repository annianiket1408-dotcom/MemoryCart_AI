import React from 'react';
import { motion } from 'framer-motion';

export const MemoryCard = ({ icon: Icon, title, description, timestamp, status, statusColor }) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-2.5 transition-shadow shadow-xs relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Icon size={16} />
            </div>
          )}
          <h4 className="font-semibold text-sm text-black">{title}</h4>
        </div>
        
        {status && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${statusColor || 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
            {status}
          </span>
        )}
      </div>

      <div className="text-xs text-gray-600 leading-relaxed pl-0.5">
        {description}
      </div>

      {timestamp && (
        <div className="text-[10px] text-gray-400 font-medium pl-0.5 mt-0.5">
          {timestamp}
        </div>
      )}
    </motion.div>
  );
};

export default MemoryCard;
