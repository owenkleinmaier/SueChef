"use client";

import { useState, useEffect } from "react";
import {
  Clipboard,
  Clock,
  BarChart2,
  MapPin,
  Settings as SettingsIcon,
  RefreshCw,
} from "react-feather";
import { useUser } from "@/contexts/UserContext";

export function QuickActions({ onSuggestionClick }: { onSuggestionClick: (suggestion: string) => void }) {
  const { getAIContext } = useUser();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const fetchSuggestions = async () => {
    setLoadingSuggestions(true);
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: getAIContext() })
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-base text-[#193554]/80">Tap a suggestion to ask Sue:</p>
        <button
          onClick={fetchSuggestions}
          disabled={loadingSuggestions}
          className="p-2 rounded-full hover:bg-[#FFFCF4] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={`text-[#FA9E20] ${loadingSuggestions ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {loadingSuggestions ? (
        <div className="text-center py-8 text-[#193554]/60">Loading suggestions...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="text-left p-4 bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow hover:border-[#FA9E20] hover:bg-[#FA9E20]/5 transition-all text-[#193554] font-medium"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ChatHistory() {
  const mockChats = [
    { id: "1", title: "Pasta with tomatoes", time: "2 hours ago" },
    { id: "2", title: "Quick breakfast ideas", time: "Yesterday" },
    { id: "3", title: "Chicken recipes", time: "3 days ago" },
    { id: "4", title: "Vegetarian dinner", time: "1 week ago" },
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      {mockChats.map((chat) => (
        <div
          key={chat.id}
          className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-5 min-h-[80px] flex flex-col justify-center cursor-pointer hover:bg-[#FFFCF4]/80 transition-colors"
        >
          <div className="font-medium text-[#193554] text-base">{chat.title}</div>
          <div className="text-sm text-[#193554]/60 mt-1">{chat.time}</div>
        </div>
      ))}
    </div>
  );
}

export function RecipeBook() {
  const recipes = [
    {
      id: "1",
      title: "Spaghetti Carbonara",
      time: "30 min",
      difficulty: "Easy",
    },
    { id: "2", title: "Beef Stir Fry", time: "25 min", difficulty: "Medium" },
    {
      id: "3",
      title: "Chocolate Chip Cookies",
      time: "45 min",
      difficulty: "Easy",
    },
    {
      id: "4",
      title: "Roasted Chicken",
      time: "1.5 hours",
      difficulty: "Medium",
    },
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-5 min-h-[80px] flex flex-col justify-center cursor-pointer hover:bg-[#FFFCF4]/80 transition-colors"
        >
          <h4 className="font-medium text-[#193554] text-base mb-2">{recipe.title}</h4>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#193554]/60">{recipe.time}</span>
            <span className="text-xs bg-[#FA9E20] text-[#193554] px-3 py-1 rounded-full font-medium">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CountryCuisine({ onRecipeClick }: { onRecipeClick: (recipeName: string) => void }) {
  const { userProfile } = useUser();
  const [recipes, setRecipes] = useState<Array<{
    name: string;
    description: string;
    cookTime: string;
    difficulty: string;
  }>>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const fetchLocalRecipes = async () => {
    if (!userProfile.location) return;
    
    setLoadingRecipes(true);
    try {
      const response = await fetch('/api/local-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: userProfile.location })
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Failed to fetch local recipes:', error);
    } finally {
      setLoadingRecipes(false);
    }
  };

  useEffect(() => {
    fetchLocalRecipes();
  }, [userProfile.location]);

  if (!userProfile.location) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-center p-6">
        <MapPin size={48} className="text-[#FA9E20] mb-4" />
        <p className="text-[#193554] text-lg font-medium mb-2">Set Your Location</p>
        <p className="text-[#193554]/60 text-sm">Add your location in Settings to discover authentic local recipes</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-base text-[#193554]/80">Traditional recipes from {userProfile.location}:</p>
        <button
          onClick={fetchLocalRecipes}
          disabled={loadingRecipes}
          className="p-2 rounded-full hover:bg-[#FFFCF4] transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={`text-[#FA9E20] ${loadingRecipes ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loadingRecipes ? (
        <div className="text-center py-8 text-[#193554]/60">Discovering local recipes...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {recipes.map((recipe, index) => (
            <button
              key={index}
              onClick={() => onRecipeClick(recipe.name)}
              className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-5 flex flex-col text-left hover:border-[#FA9E20] hover:bg-[#FA9E20]/5 transition-all"
            >
              <h4 className="font-medium text-[#193554] text-base mb-2">{recipe.name}</h4>
              <p className="text-sm text-[#193554]/80 mb-3">{recipe.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#193554]/60">{recipe.cookTime}</span>
                <span className="text-xs bg-[#FA9E20] text-[#193554] px-3 py-1 rounded-full font-medium">
                  {recipe.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Settings() {
  const { userProfile, updateUserProfile } = useUser();

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Skill Level
        </label>
        <select
          value={userProfile.skillLevel}
          onChange={(e) => updateUserProfile({ skillLevel: e.target.value })}
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] bg-[#FFFBEF] text-base text-[#193554]"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Location
        </label>
        <input
          type="text"
          value={userProfile.location}
          onChange={(e) => updateUserProfile({ location: e.target.value })}
          placeholder="Enter your city or state..."
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] bg-[#FFFBEF] text-base text-[#193554] placeholder-[#193554]/60"
        />
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Dietary Restrictions
        </label>
        <textarea
          value={userProfile.dietaryRestrictions.join(', ')}
          onChange={(e) => updateUserProfile({ dietaryRestrictions: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
          placeholder="e.g., vegetarian, gluten-free, nut allergies..."
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] h-24 resize-none text-base bg-[#FFFBEF] text-[#193554] placeholder-[#193554]/60"
        />
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Favorite Foods
        </label>
        <textarea
          value={userProfile.favoriteFoods}
          onChange={(e) => updateUserProfile({ favoriteFoods: e.target.value })}
          placeholder="Tell us about your favorite dishes..."
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] h-24 resize-none text-base bg-[#FFFBEF] text-[#193554] placeholder-[#193554]/60"
        />
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Voice responses
            </span>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-[#FA9E20] rounded" 
              checked={userProfile.voiceResponses}
              onChange={(e) => updateUserProfile({ voiceResponses: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Recipe notifications
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#FA9E20] rounded"
              checked={userProfile.recipeNotifications}
              onChange={(e) => updateUserProfile({ recipeNotifications: e.target.checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Timer alerts
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#FA9E20] rounded"
              checked={userProfile.timerAlerts}
              onChange={(e) => updateUserProfile({ timerAlerts: e.target.checked })}
            />
          </div>
        </div>
      </div>

      <button className="w-full bg-[#FA9E20] text-[#193554] p-4 rounded-xl hover:bg-[#FA9E20]/80 transition-colors text-lg font-bold shadow-lg">
        Save Settings
      </button>
    </div>
  );
}

export function Sidebar({ onSuggestionClick }: { onSuggestionClick: (suggestion: string) => void }) {
  const [activeTab, setActiveTab] = useState("quick");

  const handleRecipeClick = (recipeName: string) => {
    onSuggestionClick(`Please provide me with the complete recipe for ${recipeName}, including ingredients and step-by-step instructions.`);
  };

  const tabs = [
    { id: "quick", icon: Clipboard, title: "Quick Actions" },
    { id: "history", icon: Clock, title: "Chat History" },
    { id: "recipes", icon: BarChart2, title: "Recipe Book" },
    { id: "cuisine", icon: MapPin, title: "Country Cuisine" },
    { id: "settings", icon: SettingsIcon, title: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "quick":
        return <QuickActions onSuggestionClick={onSuggestionClick} />;
      case "history":
        return <ChatHistory />;
      case "recipes":
        return <RecipeBook />;
      case "cuisine":
        return <CountryCuisine onRecipeClick={handleRecipeClick} />;
      case "settings":
        return <Settings />;
      default:
        return <QuickActions onSuggestionClick={onSuggestionClick} />;
    }
  };

  const getCurrentTitle = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.title : "Quick Actions";
  };

  return (
    <div className="w-[425px] flex flex-col px-8 bg-[#FBF4E4] h-screen">
      <div className="text-3xl font-bold text-[#193554] mt-4 mb-6">
        {getCurrentTitle()}
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
      
      {/* Sidebar icons */}
      <div className="flex flex-row justify-between items-center bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow px-6 py-4 mt-8 mb-4">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                activeTab === tab.id 
                  ? "text-[#FA9E20] bg-[#FA9E20]/10 scale-110" 
                  : "text-[#193554] hover:text-[#FA9E20] hover:bg-[#FA9E20]/5"
              }`}
            >
              <IconComponent size={28} strokeWidth={2.5} />
            </button>
          );
        })}
      </div>
    </div>
  );
}