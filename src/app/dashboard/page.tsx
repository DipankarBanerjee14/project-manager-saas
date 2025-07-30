'use client';

import { useState } from 'react';
import {
  Home,
  ClipboardList,
  Users,
  Code,
  Headphones,
} from 'lucide-react';

const tabs = [
  { name: 'Dashboard', icon: <Home size={18} />, color: 'text-white' },
  { name: 'Work Management', icon: <ClipboardList size={18} />, color: 'text-blue-500' },
  { name: 'CRM', icon: <Users size={18} />, color: 'text-green-500' },
  { name: 'DEV', icon: <Code size={18} />, color: 'text-purple-500' },
  { name: 'Service', icon: <Headphones size={18} />, color: 'text-yellow-400' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-[#0d0d11] text-white rounded-lg">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a25] p-4 flex flex-col gap-2 rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px]">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.name ? 'bg-[#2c2c3a]' : 'hover:bg-[#2c2c3a]'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <span className={tab.color}>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Tab Content */}
        <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>

        {/* Recently Visited Tasks */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Recently Visited Tasks</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1f1f2b] p-4 rounded-lg h-32" />
            <div className="bg-[#1f1f2b] p-4 rounded-lg h-32" />
            <div className="bg-[#1f1f2b] p-4 rounded-lg h-32" />
          </div>
        </div>

        {/* Inbox */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">Inbox</h3>
          <div className="space-y-3">
            <div className="bg-[#1f1f2b] p-4 rounded-lg h-16" />
            <div className="bg-[#1f1f2b] p-4 rounded-lg h-16" />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-md font-semibold mb-2">Notifications</h3>
          <div className="bg-[#1f1f2b] p-4 rounded-lg h-20" />
        </div>
      </main>
    </div>
  );
}
