import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  image?: string;
  details?: string[];
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const activeItem = items[activeIndex];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Timeline Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Previous milestone"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div className="flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                index === activeIndex
                  ? 'bg-primary-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to milestone ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Next milestone"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Active Timeline Item */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="animate-fade-in">
          <div className="flex items-center mb-4">
            <activeItem.icon className="h-8 w-8 text-primary-600 mr-3" />
            <div className="text-4xl font-bold text-primary-600">{activeItem.year}</div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{activeItem.title}</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{activeItem.description}</p>
          
          {activeItem.details && (
            <ul className="space-y-2">
              {activeItem.details.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {activeItem.image && (
          <div className="animate-scale-in">
            <img
              src={activeItem.image}
              alt={`${activeItem.title} - ${activeItem.year}`}
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>{items[0].year}</span>
          <span>{items[items.length - 1].year}</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveTimeline;