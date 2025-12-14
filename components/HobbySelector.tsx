'use client';

import { ChevronDown, Sparkles } from 'lucide-react';
import { HOBBIES, ELEMENTS } from '@/lib/constants';

interface HobbySelectorProps {
  primary: string;
  secondary: string;
  onPrimaryChange: (value: string) => void;
  onSecondaryChange: (value: string) => void;
  isLoading?: boolean;
}

export default function HobbySelector({
  primary,
  secondary,
  onPrimaryChange,
  onSecondaryChange,
  isLoading = false,
}: HobbySelectorProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 rotate-3">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Fuse Your Passions</h2>
        <p className="text-gray-500 text-lg max-w-md mx-auto">Combine what you love with what intrigues you to discover something new.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Primary Hobby Selector */}
        <div className="relative group">
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
            I'm good at...
          </label>
          <div className="relative">
            <select
              value={primary}
              onChange={(e) => onPrimaryChange(e.target.value)}
              disabled={isLoading}
              className="w-full p-5 pl-14 pr-10 text-lg font-medium border-2 border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all appearance-none bg-gray-50 hover:bg-white hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select your hobby</option>
              {HOBBIES.map((hobby) => (
                <option key={hobby} value={hobby}>
                  {hobby}
                </option>
              ))}
            </select>
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-primary rounded-lg shadow-sm"></div>
            </div>
            <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Secondary Element Selector */}
        <div className="relative group">
          <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
            I'm curious about...
          </label>
          <div className="relative">
            <select
              value={secondary}
              onChange={(e) => onSecondaryChange(e.target.value)}
              disabled={isLoading}
              className="w-full p-5 pl-14 pr-10 text-lg font-medium border-2 border-gray-100 rounded-2xl focus:border-secondary focus:ring-4 focus:ring-secondary/10 focus:outline-none transition-all appearance-none bg-gray-50 hover:bg-white hover:border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">Select an element</option>
              {ELEMENTS.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-secondary rounded-lg shadow-sm"></div>
            </div>
            <ChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-secondary transition-colors" />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      {/* <button
        onClick={() => { }}
        disabled={!primary || !secondary || isLoading}
        className="w-full py-6 bg-gradient-to-r from-primary to-secondary text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10">
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              Crafting Your Idea...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-3" />
              Fuse & Generate Idea
            </span>
          )}
        </span>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button> */}

      {/* Helper Text */}
      <p className="text-center text-gray-400 text-sm mt-6 font-medium">
        We'll combine your skills with something new to create a unique project
      </p>
    </div>
  );
}