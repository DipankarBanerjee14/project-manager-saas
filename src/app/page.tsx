'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaUsers,
  FaProjectDiagram,
  FaUserPlus,
  FaBell,
  FaCalendarAlt,
  FaCloudUploadAlt,
  FaTasks,
  FaHandshake,
  FaCodeBranch,
  FaHeadset,
  FaCheckCircle,
} from 'react-icons/fa';

const features = [
  {
    title: 'Real-time collaboration',
    icon: <FaUsers className="text-blue-400 text-xl" />,
    description: 'Collaborate with your team in real time, seeing updates live as they happen.',
  },
  {
    title: 'Drag & drop task boards',
    icon: <FaProjectDiagram className="text-blue-400 text-xl" />,
    description: 'Visually manage tasks with an intuitive drag-and-drop Kanban board.',
  },
  {
    title: 'Invite team members',
    icon: <FaUserPlus className="text-blue-400 text-xl" />,
    description: 'Easily invite teammates and assign roles for efficient teamwork.',
  },
  {
    title: 'Deadline reminders',
    icon: <FaBell className="text-blue-400 text-xl" />,
    description: 'Get timely alerts and reminders to stay on track with deadlines.',
  },
  {
    title: 'Kanban & calendar views',
    icon: <FaCalendarAlt className="text-blue-400 text-xl" />,
    description: 'Switch between Kanban board and calendar for better scheduling.',
  },
  {
    title: 'Cloud sync & backups',
    icon: <FaCloudUploadAlt className="text-blue-400 text-xl" />,
    description: 'Automatically sync and back up your data securely in the cloud.',
  },
];

const products = [
  {
    title: 'Work Management',
    icon: <FaTasks />,
    color: 'bg-violet-600',
    shade: 'bg-violet-700',
    tagline: 'Deliver on time, every time ✨',
    features: [
      'Project & task management',
      'Resource management',
      'Portfolio management',
      'AI risk analysis',
    ],
  },
  {
    title: 'CRM',
    icon: <FaHandshake />,
    color: 'bg-cyan-600',
    shade: 'bg-cyan-700',
    tagline: 'Win customers, retain better 🖊️',
    features: [
      'Lead tracking & pipeline',
      'Customer database',
      'Email & call automation',
      'Sales analytics',
    ],
  },
  {
    title: 'Dev',
    icon: <FaCodeBranch />,
    color: 'bg-emerald-600',
    shade: 'bg-emerald-700',
    tagline: 'Ship code faster with your team 💻',
    features: [
      'Agile sprint planning',
      'Bug tracking',
      'Version control logs',
      'DevOps integrations',
    ],
  },
  {
    title: 'Service',
    icon: <FaHeadset />,
    color: 'bg-pink-600',
    shade: 'bg-pink-700',
    tagline: 'Support that delights 💡',
    features: [
      'Ticketing system',
      'Customer portal',
      'SLA automation',
      'Performance analytics',
    ],
  },
];

export default function HomePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* ✅ Hero + Features section */}
      <section className="relative z-10 max-w-7xl mx-auto my-2 px-6 py-24 rounded-3xl bg-[length:400%_400%] bg-gradient-to-r from-pink-800 via-purple-800 to-[#025045] animate-gradient-slow">
        <div className="text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-400 to-blue-500 bg-[length:200%_200%] animate-text-gradient"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Project Management<br />Reimagined.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-200 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            TaskBoard helps your team move faster with real-time boards,
            automation, and beautiful design.
          </motion.p>

          <motion.div
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/signup">
              <button className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 transition">
                Get Started Free
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-6 py-3 rounded-xl border border-gray-200 text-gray-300 hover:bg-gray-800 transition">
                View Pricing
              </button>
            </Link>
          </motion.div>
        </div>

        {/* ✅ Features Grid */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md shadow-md hover:shadow-lg transition-transform hover:scale-105 duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Products section */}
      <section className="relative z-10 max-w-7xl mx-auto mt-16 px-6 py-24 rounded-3xl bg-gray-950 border border-white/10">
      <h2 className="text-3xl font-bold text-white text-center mb-16">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {products.map((product, idx) => (
            <div
              key={idx}
              className={`transition-all duration-300 ease-in-out rounded-2xl text-white p-6 shadow-xl flex flex-col justify-between h-[320px] ${
                hoveredIndex === idx ? product.shade : product.color
              }`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === idx ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-xl">{product.icon}</div>
                    <div className="text-sm font-semibold">TaskBoard {product.title}</div>
                  </div>
                  <ul className="space-y-2 text-sm flex-1">
                    {product.features.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FaCheckCircle className="text-white mt-1 text-xs" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full py-2 rounded-full bg-white text-sm text-black font-medium hover:bg-gray-200 transition">
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-2xl font-light mb-3 leading-tight">
                      {product.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-6">{product.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-white text-lg">{product.icon}</div>
                    <div className="text-sm font-semibold">TaskBoard {product.title}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
