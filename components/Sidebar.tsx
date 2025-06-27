"use client";

import { useState } from "react";
import {
  Clipboard,
  Clock,
  BarChart2,
  MapPin,
  Settings as SettingsIcon,
} from "react-feather";

export function QuickActions() {
  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6 text-lg font-medium text-[#193554] min-h-[90px] flex items-center justify-center hover:bg-[#FFFCF4]/80 transition-colors cursor-pointer">
        Indiana Local dishes
      </div>
      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6 min-h-[90px] hover:bg-[#FFFCF4]/80 transition-colors cursor-pointer" />
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

export function HometownHarvest() {
  const localIngredients = [
    { name: "Sweet Corn", season: "Summer", farm: "Johnson Family Farm" },
    { name: "Apples", season: "Fall", farm: "Orchard Hills" },
    { name: "Pumpkins", season: "Fall", farm: "Miller's Patch" },
    { name: "Tomatoes", season: "Summer", farm: "Green Valley" },
  ];

  return (
    <div className="flex flex-col gap-4 flex-1">
      {localIngredients.map((item, index) => (
        <div
          key={index}
          className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-5 min-h-[80px] flex flex-col justify-center cursor-pointer hover:bg-[#FFFCF4]/80 transition-colors"
        >
          <h4 className="font-medium text-[#193554] text-base mb-2">{item.name}</h4>
          <div className="text-sm text-[#193554]/80">{item.season}</div>
          <div className="text-sm text-[#193554]/60">{item.farm}</div>
        </div>
      ))}
    </div>
  );
}

export function Settings() {
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");

  return (
    <div className="flex flex-col gap-6 flex-1">
      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Skill Level
        </label>
        <select
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] bg-[#FFFBEF] text-base text-[#193554]"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <label className="block text-lg font-medium text-[#193554] mb-3">
          Dietary Restrictions
        </label>
        <textarea
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          placeholder="e.g., vegetarian, gluten-free, nut allergies..."
          className="w-full p-4 border-2 border-[#193554]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FA9E20] focus:border-[#FA9E20] h-24 resize-none text-base bg-[#FFFBEF] text-[#193554] placeholder-[#193554]/60"
        />
      </div>

      <div className="bg-[#FFFCF4] border-2 border-[#193554]/10 rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Voice responses
            </span>
            <input type="checkbox" className="w-5 h-5 accent-[#FA9E20] rounded" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Recipe notifications
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#FA9E20] rounded"
              defaultChecked
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base text-[#193554] font-medium">
              Timer alerts
            </span>
            <input
              type="checkbox"
              className="w-5 h-5 accent-[#FA9E20] rounded"
              defaultChecked
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

export function Sidebar() {
  const [activeTab, setActiveTab] = useState("quick");

  const tabs = [
    { id: "quick", icon: Clipboard, title: "Quick Actions" },
    { id: "history", icon: Clock, title: "Chat History" },
    { id: "recipes", icon: BarChart2, title: "Recipe Book" },
    { id: "harvest", icon: MapPin, title: "Hometown Harvest" },
    { id: "settings", icon: SettingsIcon, title: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "quick":
        return <QuickActions />;
      case "history":
        return <ChatHistory />;
      case "recipes":
        return <RecipeBook />;
      case "harvest":
        return <HometownHarvest />;
      case "settings":
        return <Settings />;
      default:
        return <QuickActions />;
    }
  };

  const getCurrentTitle = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.title : "Quick Actions";
  };

  return (
    <div className="w-[425px] flex flex-col px-8 bg-[#FBF4E4]">
      <div className="text-3xl font-bold text-[#193554] mt-4 mb-6">
        {getCurrentTitle()}
      </div>
      
      {renderContent()}
      
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