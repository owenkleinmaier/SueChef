"use client";

import React, { useState } from 'react';
import { UserProfile } from '@/contexts/UserContext';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
}

const ONBOARDING_STEPS = [
  {
    id: 'location',
    question: 'What city or state are you cooking from?',
    type: 'text',
    key: 'location' as keyof UserProfile
  },
  {
    id: 'dietary',
    question: 'Do you have any dietary restrictions?',
    type: 'multiselect',
    options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Sodium', 'Diabetic-Friendly', 'None'],
    key: 'dietaryRestrictions' as keyof UserProfile
  },
  {
    id: 'allergies',
    question: 'Any food allergies we should know about?',
    type: 'multiselect',
    options: ['Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Gluten', 'Fish', 'None'],
    key: 'allergies' as keyof UserProfile
  },
  {
    id: 'favorites',
    question: 'What are some of your favorite foods or dishes?',
    type: 'text',
    key: 'favoriteFoods' as keyof UserProfile
  },
  {
    id: 'experience',
    question: 'How would you describe your cooking experience?',
    type: 'select',
    options: ['Beginner', 'Intermediate', 'Advanced'],
    key: 'cookingExperience' as keyof UserProfile
  },
  {
    id: 'cuisine',
    question: 'What types of cuisine do you enjoy?',
    type: 'multiselect',
    options: ['American', 'Italian', 'Mexican', 'Asian', 'Indian', 'Mediterranean', 'French', 'Southern', 'Midwest Comfort'],
    key: 'cuisineTypes' as keyof UserProfile
  },
  {
    id: 'spice',
    question: 'How do you like your spice level?',
    type: 'select',
    options: ['Mild', 'Medium', 'Hot'],
    key: 'spiceLevel' as keyof UserProfile
  },
  {
    id: 'accessibility',
    question: 'Would you like larger fonts for easier reading?',
    type: 'toggle',
    key: 'largeFonts' as keyof UserProfile
  }
];

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<UserProfile>({
    location: '',
    dietaryRestrictions: [],
    allergies: [],
    favoriteFoods: '',
    cookingExperience: 'beginner',
    cuisineTypes: [],
    spiceLevel: 'mild',
    largeFonts: false,
    skillLevel: 'beginner',
    voiceResponses: false,
    recipeNotifications: true,
    timerAlerts: true,
  });
  const [currentAnswer, setCurrentAnswer] = useState<string | string[] | boolean>('');

  const currentStepData = ONBOARDING_STEPS[currentStep];

  const handleNext = () => {
    const updatedProfile = { ...profileData };
    (updatedProfile as any)[currentStepData.key] = currentAnswer;
    setProfileData(updatedProfile);

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      const nextStepData = ONBOARDING_STEPS[currentStep + 1];
      setCurrentAnswer(nextStepData.type === 'multiselect' ? [] : nextStepData.type === 'toggle' ? false : '');
    } else {
      // Set skill level to match cooking experience for backwards compatibility
      updatedProfile.skillLevel = updatedProfile.cookingExperience;
      onComplete(updatedProfile);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const prevStepData = ONBOARDING_STEPS[currentStep - 1];
      setCurrentAnswer((profileData as any)[prevStepData.key] || (prevStepData.type === 'multiselect' ? [] : prevStepData.type === 'toggle' ? false : ''));
    }
  };

  const renderInput = () => {
    switch (currentStepData.type) {
      case 'text':
        return (
          <input
            type="text"
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] bg-[#FFFBEF] text-lg text-[#193554] placeholder-[#193554]/60"
            style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            placeholder="Type your answer..."
          />
        );
      
      case 'select':
        return (
          <select
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] bg-[#FFFBEF] text-lg text-[#193554]"
            style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            <option value="">Select an option...</option>
            {currentStepData.options?.map(option => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-3">
            {currentStepData.options?.map(option => (
              <label key={option} className="flex items-center space-x-3 p-3 bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg hover:bg-[#FFFCF4]/80 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={(currentAnswer as string[]).includes(option)}
                  onChange={(e) => {
                    const current = currentAnswer as string[];
                    if (e.target.checked) {
                      setCurrentAnswer([...current, option]);
                    } else {
                      setCurrentAnswer(current.filter(item => item !== option));
                    }
                  }}
                  className="w-5 h-5 accent-[#FA9E20] rounded"
                />
                <span className="text-lg text-[#193554] font-medium" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        );
      
      case 'toggle':
        return (
          <label className="flex items-center space-x-3 p-4 bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg hover:bg-[#FFFCF4]/80 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={currentAnswer as boolean}
              onChange={(e) => setCurrentAnswer(e.target.checked)}
              className="w-6 h-6 accent-[#FA9E20] rounded"
            />
            <span className="text-lg text-[#193554] font-medium" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Yes, please
            </span>
          </label>
        );
      
      default:
        return null;
    }
  };

  const isAnswerValid = () => {
    if (currentStepData.type === 'multiselect') {
      return (currentAnswer as string[]).length > 0;
    }
    if (currentStepData.type === 'text') {
      return (currentAnswer as string).trim().length > 0;
    }
    if (currentStepData.type === 'select') {
      return (currentAnswer as string).length > 0;
    }
    return true;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FBF4E4] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Sue Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-5xl">👵🏼</span>
            <h1
              className="text-4xl text-[#193554]"
              style={{ fontFamily: "Snell Roundhand, cursive" }}
            >
              Sue
            </h1>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#193554]" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                Let's get you set up!
              </h2>
              <span className="text-lg text-[#193554]/60" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
                {currentStep + 1} of {ONBOARDING_STEPS.length}
              </span>
            </div>
            <div className="w-full bg-[#193554]/20 rounded-full h-3">
              <div 
                className="bg-[#FA9E20] h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl mb-6 text-[#193554] font-medium" style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              {currentStepData.question}
            </h3>
            
            <div className="mb-8">
              {renderInput()}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 text-lg bg-[#FFFCF4] border-2 border-[#193554]/20 text-[#193554] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFFCF4]/80 transition-colors font-medium"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isAnswerValid()}
              className="px-8 py-3 text-lg bg-[#FA9E20] text-[#193554] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FA9E20]/80 transition-colors font-bold shadow-lg"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Cooking!' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};