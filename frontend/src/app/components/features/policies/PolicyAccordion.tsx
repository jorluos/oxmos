import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface PolicyAccordionProps {
  key?: React.Key;
  section: PolicySection;
  isOpen: boolean;
  darkMode: boolean;
  onToggle: () => void;
}

export function PolicyAccordion({
  section,
  isOpen,
  darkMode,
  onToggle,
}: PolicyAccordionProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors ${
        darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-white'
      }`}
    >
      <button
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
          darkMode ? 'hover:bg-white/5' : 'hover:bg-black/3'
        }`}
        onClick={onToggle}
      >
        <span className={`text-sm font-medium tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
          {section.title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className={darkMode ? 'text-white/70' : 'text-black/70'} />
        ) : (
          <ChevronDown size={16} className={darkMode ? 'text-white/70' : 'text-black/70'} />
        )}
      </button>

      {isOpen && (
        <div className={`px-5 pb-5 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`pt-4 text-sm leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-white/70' : 'text-black/65'}`}>
            {section.content.split('\n').map((line, index) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <p key={index} className={`font-medium mt-3 mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                    {line.replace(/\*\*/g, '')}
                  </p>
                );
              }

              if (line.startsWith('•')) {
                return (
                  <p key={index} className="flex gap-2 mt-1">
                    <span>•</span>
                    <span>{line.slice(1).trim()}</span>
                  </p>
                );
              }

              if (line.match(/^\d\./)) {
                return <p key={index} className="mt-1 ml-4">{line}</p>;
              }

              if (line === '') {
                return <div key={index} className="h-2" />;
              }

              return <p key={index}>{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
