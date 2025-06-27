"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  location: string;
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteFoods: string;
  cookingExperience: string;
  cuisineTypes: string[];
  spiceLevel: string;
  largeFonts: boolean;
  skillLevel: string;
  voiceResponses: boolean;
  recipeNotifications: boolean;
  timerAlerts: boolean;
}

interface UserContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  isOnboardingComplete: boolean;
  completeOnboarding: (profile: UserProfile) => void;
  getAIContext: () => string;
}

const defaultProfile: UserProfile = {
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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('suechef-onboarding-complete');
    const savedProfile = localStorage.getItem('suechef-user-profile');
    
    if (onboardingStatus === 'true' && savedProfile) {
      setIsOnboardingComplete(true);
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const updateUserProfile = (profileUpdates: Partial<UserProfile>) => {
    const updatedProfile = { ...userProfile, ...profileUpdates };
    setUserProfile(updatedProfile);
    localStorage.setItem('suechef-user-profile', JSON.stringify(updatedProfile));
  };

  const completeOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    setIsOnboardingComplete(true);
    localStorage.setItem('suechef-onboarding-complete', 'true');
    localStorage.setItem('suechef-user-profile', JSON.stringify(profile));
  };

  const getAIContext = () => {
    if (!isOnboardingComplete) return '';
    
    const contextParts = [];
    
    if (userProfile.location) {
      contextParts.push(`I'm cooking from ${userProfile.location}`);
    }
    
    if (userProfile.dietaryRestrictions.length > 0 && !userProfile.dietaryRestrictions.includes('None')) {
      contextParts.push(`My dietary restrictions include: ${userProfile.dietaryRestrictions.join(', ')}`);
    }
    
    if (userProfile.allergies.length > 0 && !userProfile.allergies.includes('None')) {
      contextParts.push(`I'm allergic to: ${userProfile.allergies.join(', ')}`);
    }
    
    if (userProfile.favoriteFoods) {
      contextParts.push(`Some of my favorite foods are: ${userProfile.favoriteFoods}`);
    }
    
    contextParts.push(`My cooking experience level is ${userProfile.cookingExperience}`);
    
    if (userProfile.cuisineTypes.length > 0) {
      contextParts.push(`I enjoy ${userProfile.cuisineTypes.join(', ')} cuisine`);
    }
    
    contextParts.push(`I prefer ${userProfile.spiceLevel} spice levels`);
    
    const context = contextParts.join('. ');
    return context ? `User context: ${context}. ` : '';
  };

  return (
    <UserContext.Provider value={{
      userProfile,
      updateUserProfile,
      isOnboardingComplete,
      completeOnboarding,
      getAIContext
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};