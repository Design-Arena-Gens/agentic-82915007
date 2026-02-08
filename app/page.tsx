'use client'

import { useState, useEffect } from 'react'
import { Bot, DollarSign, TrendingUp, Zap, CheckCircle, Clock, Play } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  reward: number
  duration: number
  status: 'available' | 'in-progress' | 'completed'
}

interface Agent {
  id: string
  name: string
  level: number
  totalEarned: number
  tasksCompleted: number
  isActive: boolean
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'agent-001',
      name: 'DataMiner Alpha',
      level: 5,
      totalEarned: 1250.50,
      tasksCompleted: 42,
      isActive: false
    },
    {
      id: 'agent-002',
      name: 'CodeBot Beta',
      level: 3,
      totalEarned: 780.25,
      tasksCompleted: 28,
      isActive: false
    },
    {
      id: 'agent-003',
      name: 'TaskRunner Gamma',
      level: 7,
      totalEarned: 2100.75,
      tasksCompleted: 65,
      isActive: false
    }
  ])

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Data Classification',
      description: 'Classify 1000 data points into categories',
      reward: 25.00,
      duration: 5,
      status: 'available'
    },
    {
      id: 2,
      title: 'Code Review',
      description: 'Review and optimize code for performance',
      reward: 50.00,
      duration: 10,
      status: 'available'
    },
    {
      id: 3,
      title: 'Content Moderation',
      description: 'Moderate user-generated content for compliance',
      reward: 15.00,
      duration: 3,
      status: 'available'
    },
    {
      id: 4,
      title: 'API Testing',
      description: 'Test API endpoints and generate report',
      reward: 35.00,
      duration: 7,
      status: 'available'
    },
    {
      id: 5,
      title: 'Database Optimization',
      description: 'Analyze and optimize database queries',
      reward: 75.00,
      duration: 15,
      status: 'available'
    },
    {
      id: 6,
      title: 'Image Processing',
      description: 'Process and tag 500 images',
      reward: 30.00,
      duration: 8,
      status: 'available'
    }
  ])

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const startTask = (agentId: string, taskId: number) => {
    setAgents(agents.map(agent =>
      agent.id === agentId ? { ...agent, isActive: true } : agent
    ))

    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'in-progress' } : task
    ))

    const task = tasks.find(t => t.id === taskId)
    if (task) {
      setTimeout(() => {
        completeTask(agentId, taskId, task.reward)
      }, task.duration * 1000)
    }
  }

  const completeTask = (agentId: string, taskId: number, reward: number) => {
    setAgents(agents.map(agent =>
      agent.id === agentId
        ? {
            ...agent,
            isActive: false,
            totalEarned: agent.totalEarned + reward,
            tasksCompleted: agent.tasksCompleted + 1,
            level: Math.floor((agent.tasksCompleted + 1) / 10) + 1
          }
        : agent
    ))

    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ))

    setTimeout(() => {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, status: 'available' } : task
      ))
    }, 3000)
  }

  const totalEarnings = agents.reduce((sum, agent) => sum + agent.totalEarned, 0)
  const totalTasks = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0)
  const activeAgents = agents.filter(agent => agent.isActive).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-16 h-16 text-cyan-400 mr-4" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              Agent Earnings Platform
            </h1>
          </div>
          <p className="text-xl text-gray-300">AI agents autonomously complete tasks and earn rewards</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-green-400">${totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Tasks Completed</p>
                <p className="text-3xl font-bold text-blue-400">{totalTasks}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Active Agents</p>
                <p className="text-3xl font-bold text-purple-400">{activeAgents}</p>
              </div>
              <Zap className="w-12 h-12 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Agents Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Bot className="w-8 h-8 mr-3 text-cyan-400" />
            Your Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map(agent => (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id === selectedAgent ? null : agent.id)}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border-2 cursor-pointer transition-all ${
                  selectedAgent === agent.id
                    ? 'border-cyan-400 shadow-lg shadow-cyan-400/50'
                    : 'border-white/20 hover:border-white/40'
                } ${agent.isActive ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{agent.name}</h3>
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 font-bold">Lvl {agent.level}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Earned:</span>
                    <span className="text-green-400 font-bold">${agent.totalEarned.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Tasks:</span>
                    <span className="text-blue-400 font-bold">{agent.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status:</span>
                    <span className={`font-bold ${agent.isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {agent.isActive ? 'Working...' : 'Idle'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-purple-400" />
            Available Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transition-all ${
                  task.status === 'in-progress' ? 'opacity-60' : ''
                } ${
                  task.status === 'completed' ? 'border-green-400 bg-green-500/20' : ''
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{task.title}</h3>
                  <p className="text-gray-300 text-sm">{task.description}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reward:</span>
                    <span className="text-green-400 font-bold text-lg">${task.reward.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-blue-400 font-bold">{task.duration}s</span>
                  </div>
                </div>

                {task.status === 'available' && selectedAgent && (
                  <button
                    onClick={() => startTask(selectedAgent, task.id)}
                    disabled={agents.find(a => a.id === selectedAgent)?.isActive}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Task
                  </button>
                )}

                {task.status === 'in-progress' && (
                  <div className="w-full bg-yellow-500/20 border border-yellow-400 text-yellow-400 font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    In Progress...
                  </div>
                )}

                {task.status === 'completed' && (
                  <div className="w-full bg-green-500/20 border border-green-400 text-green-400 font-bold py-3 px-4 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Completed!
                  </div>
                )}

                {task.status === 'available' && !selectedAgent && (
                  <div className="w-full bg-gray-500/20 border border-gray-400 text-gray-400 font-bold py-3 px-4 rounded-lg text-center text-sm">
                    Select an agent first
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
