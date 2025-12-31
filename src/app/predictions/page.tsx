'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  Trophy,
  Users,
  Star,
  MapPin,
  Eye,
  Share2,
  Bookmark,
  Download,
  RefreshCw,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Globe,
  Award,
  Brain,
  Target as TargetIcon,
  BarChart2,
  Sparkles,
  Crown,
  Flame,
  DollarSign,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  PlayCircle,
  PauseCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/cn'

interface Prediction {
  id: string
  matchId: string
  homeTeam: {
    name: string
    logo: string
    country: string
  }
  awayTeam: {
    name: string
    logo: string
    country: string
  }
  league: string
  matchDate: string
  status: 'upcoming' | 'live' | 'finished'
  
  // AI Predictions
  aiPrediction: {
    result: 'home' | 'draw' | 'away'
    confidence: number
    probability: {
      home: number
      draw: number
      away: number
    }
  }
  
  // Value Bets
  valueBets: {
    type: string
    bookmaker: string
    odds: number
    value: number
    expectedValue: number
    kellyCriterion: number
    recommendation: 'strong' | 'moderate' | 'weak'
  }[]
  
  // Analysis Data
  analysis: {
    headToHead: {
      total: number
      home: number
      draw: number
      away: number
      homeAdvantage: number
    }
    teamForm: {
      home: {
        last5: string[]
        goals: number
        conceded: number
        form: number
      }
      away: {
        last5: string number
        conceded[]
        goals:: number
        form: number
      }
    }
    injuries: {
      home: string[]
      away: string[]
    }
    keyPlayers: {
      home: string[]
      away: string[]
    }
  }
  
  // Performance Metrics
  metrics: {
    accuracy: number
    profit: number
    roi: number
    streak: number
    lastUpdate: string
  }
}

const mockPredictions: Prediction[] = [
  {
    id: '1',
    matchId: 'MCY-ARS-20241212',
    homeTeam: {
      name: 'ম্যানচেস্টার সিটি',
      logo: '/images/teams/mancity.png',
      country: 'ইংল্যান্ড'
    },
    awayTeam: {
      name: 'আর্সেনাল',
      logo: '/images/teams/arsenal.png',
      country: 'ইংল্যান্ড'
    },
    league: 'প্রিমিয়ার লিগ',
    matchDate: '১৫ ডিসেম্বর, ২০২৪',
    status: 'upcoming',
    
    aiPrediction: {
      result: 'home',
      confidence: 87,
      probability: {
        home: 52,
        draw: 28,
        away: 20
      }
    },
    
    valueBets: [
      {
        type: 'ম্যানচেস্টার সিটি -০.৫',
        bookmaker: 'বেট365',
        odds: 1.85,
        value: 8.2,
        expectedValue: 15.3,
        kellyCriterion: 12.8,
        recommendation: 'strong'
      },
      {
        type: 'ওভার ২.৫ গোল',
        bookmaker: 'উইলিয়াম হিল',
        odds: 1.72,
        value: 5.8,
        expectedValue: 10.1,
        kellyCriterion: 8.5,
        recommendation: 'moderate'
      }
    ],
    
    analysis: {
      headToHead: {
        total: 12,
        home: 5,
        draw: 4,
        away: 3,
        homeAdvantage: 15
      },
      teamForm: {
        home: {
          last5: ['W', 'W', 'D', 'W', 'W'],
          goals: 12,
          conceded: 3,
          form: 9.2
        },
        away: {
          last5: ['W', 'D', 'L', 'W', 'D'],
          goals: 8,
          conceded: 6,
          form: 7.1
        }
      },
      injuries: {
        home: ['কেভিন ডি ব্রুইনে (আহত)'],
        away: ['গাব্রিয়েল মার্টিনেল্লি (সন্দেহজনক)']
      },
      keyPlayers: ['এর্লিং হালান্ড', 'ফিল ফোডেন', 'বুকায়ো সাকা', 'গাব্রিয়েল মার্টিনেল্লি']
    },
    
    metrics: {
      accuracy: 92,
      profit: 2450,
      roi: 18.7,
      streak: 5,
      lastUpdate: '৫ মিনিট আগে'
    }
  },
  
  {
    id: '2',
    matchId: 'BAR-REAL-20241212',
    homeTeam: {
      name: 'বার্সেলোনা',
      logo: '/images/teams/barcelona.png',
      country: 'স্পেন'
    },
    awayTeam: {
      name: 'রিয়াল মাদ্রিদ',
      logo: '/images/teams/realmadrid.png',
      country: 'স্পেন'
    },
    league: 'লা লিগা',
    matchDate: '১৬ ডিসেম্বর, ২০২৪',
    status: 'live',
    
    aiPrediction: {
      result: 'draw',
      confidence: 76,
      probability: {
        home: 35,
        draw: 42,
        away: 23
      }
    },
    
    valueBets: [
      {
        type: 'ড্র',
        bookmaker: 'বেটফেয়ার',
        odds: 3.40,
        value: 12.5,
        expectedValue: 42.5,
        kellyCriterion: 22.3,
        recommendation: 'strong'
      }
    ],
    
    analysis: {
      headToHead: {
        total: 25,
        home: 8,
        draw: 10,
        away: 7,
        homeAdvantage: 8
      },
      teamForm: {
        home: {
          last5: ['W', 'W', 'L', 'D', 'W'],
          goals: 14,
          conceded: 7,
          form: 8.4
        },
        away: {
          last5: ['D', 'W', 'W', 'D', 'W'],
          goals: 11,
          conceded: 5,
          form: 8.7
        }
      },
      injuries: {
        home: ['রবার্ট লেভানদোভস্কি (আহত)'],
        away: ['ভিনিসিয়াস জুনিয়র (সন্দেহজনক)']
      },
      keyPlayers: ['পেদ্রি', 'গাভি', 'ভিনিসিয়াস জুনিয়র', 'জুড বেলিংহ্যাম']
    },
    
    metrics: {
      accuracy: 89,
      profit: 1890,
      roi: 15.2,
      streak: 3,
      lastUpdate: '২ মিনিট আগে'
    }
  }
]

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [sortBy, setSortBy] = useState('confidence')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'live' | 'finished'>('all')
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null)

  const filteredPredictions = predictions
    .filter(pred => {
      const matchesSearch = pred.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pred.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pred.league.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesLeague = selectedLeague === 'all' || pred.league === selectedLeague
      const matchesStatus = filterStatus === 'all' || pred.status === filterStatus
      
      return matchesSearch && matchesLeague && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'confidence':
          comparison = a.aiPrediction.confidence - b.aiPrediction.confidence
          break
        case 'date':
          comparison = new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
          break
        case 'roi':
          comparison = a.metrics.roi - b.metrics.roi
          break
        case 'profit':
          comparison = a.metrics.profit - b.metrics.profit
          break
        default:
          comparison = 0
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500'
      case 'live': return 'bg-green-500 animate-pulse'
      case 'finished': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'আসন্ন'
      case 'live': return 'লাইভ'
      case 'finished': return 'শেষ'
      default: return 'অজানা'
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong': return 'text-green-600 bg-green-50'
      case 'moderate': return 'text-yellow-600 bg-yellow-50'
      case 'weak': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'strong': return 'শক্তিশালী'
      case 'moderate': return 'মধ্যম'
      case 'weak': return 'দুর্বল'
      default: return 'অজানা'
    }
  }

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Brain className="h-8 w-8 text-blue-600" />
                AI প্রেডিকশন সেন্টার
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                উন্নত মেশিন লার্নিং অ্যালগরিদম দিয়ে সবচেয়ে নির্ভুল ফুটবল প্রেডিকশন
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Sparkles className="h-4 w-4 mr-2" />
                নতুন প্রেডিকশন
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Activity className="h-4 w-4" />
                <span>লাইভ আপডেট</span>
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">মোট প্রেডিকশন</p>
                    <p className="text-3xl font-bold">২৪৭</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">গড় নির্ভুলতা</p>
                    <p className="text-3xl font-bold">৯৪.২%</p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">মোট লাভ</p>
                    <p className="text-3xl font-bold">৳১২,৪৫০</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">বর্তমান স্ট্রিক</p>
                    <p className="text-3xl font-bold">৫</p>
                  </div>
                  <Flame className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="দল বা লিগ খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* League Filter */}
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <option value="all">সব লিগ</option>
                <option value="প্রিমিয়ার লিগ">প্রিমিয়ার লিগ</option>
                <option value="লা লিগা">লা লিগা</option>
                <option value="সেরি এ">সেরি এ</option>
                <option value="বুন্দেসলিগা">বুন্দেসলিগা</option>
                <option value="লিগ ১">লিগ ১</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="upcoming">আসন্ন</option>
                <option value="live">লাইভ</option>
                <option value="finished">শেষ</option>
              </select>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSort('confidence')}
                  className={cn(
                    sortBy === 'confidence' ? 'bg-blue-50 border-blue-200' : ''
                  )}
                >
                  নির্ভুলতা
                  {sortBy === 'confidence' && (
                    sortOrder === 'desc' ? <ArrowDown className="h-4 w-4 ml-1" /> : <ArrowUp className="h-4 w-4 ml-1" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSort('roi')}
                  className={cn(
                    sortBy === 'roi' ? 'bg-blue-50 border-blue-200' : ''
                  )}
                >
                  ROI
                  {sortBy === 'roi' && (
                    sortOrder === 'desc' ? <ArrowDown className="h-4 w-4 ml-1" /> : <ArrowUp className="h-4 w-4 ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Predictions List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <img 
                              src={prediction.homeTeam.logo} 
                              alt={prediction.homeTeam.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <span className="font-semibold text-lg">{prediction.homeTeam.name}</span>
                        </div>
                        
                        <div className="text-center px-4">
                          <div className="text-2xl font-bold text-gray-400">VS</div>
                          <div className="text-sm text-gray-500 mt-1">{prediction.matchDate}</div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-lg">{prediction.awayTeam.name}</span>
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <img 
                              src={prediction.awayTeam.logo} 
                              alt={prediction.awayTeam.name}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-sm">
                          {prediction.league}
                        </Badge>
                        <Badge className={cn("text-white", getStatusColor(prediction.status))}>
                          {getStatusText(prediction.status)}
                        </Badge>
                      </div>
                    </div>

                    <Tabs defaultValue="prediction" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="prediction">AI প্রেডিকশন</TabsTrigger>
                        <TabsTrigger value="analysis">বিশ্লেষণ</TabsTrigger>
                        <TabsTrigger value="valuebets">ভ্যালু বেট</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="prediction" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-green-600 mb-2">
                                {prediction.aiPrediction.confidence}%
                              </div>
                              <div className="text-sm text-gray-600">AI আস্থা</div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>হোম জয়</span>
                                  <span className="font-semibold">{prediction.aiPrediction.probability.home}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ড্র</span>
                                  <span className="font-semibold">{prediction.aiPrediction.probability.draw}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>অ্যাওয়ে জয়</span>
                                  <span className="font-semibold">{prediction.aiPrediction.probability.away}%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardContent className="p-4">
                              <div className="text-center">
                                <div className="text-lg font-bold mb-2">
                                  {prediction.aiPrediction.result === 'home' ? prediction.homeTeam.name :
                                   prediction.aiPrediction.result === 'away' ? prediction.awayTeam.name : 'ড্র'}
                                </div>
                                <div className="text-sm text-gray-600">প্রত্যাশিত ফলাফল</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="analysis" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">হেড টু হেড</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span>মোট ম্যাচ</span>
                                  <span className="font-semibold">{prediction.analysis.headToHead.total}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>হোম জয়</span>
                                  <span className="font-semibold">{prediction.analysis.headToHead.home}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>ড্র</span>
                                  <span className="font-semibold">{prediction.analysis.headToHead.draw}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>অ্যাওয়ে জয়</span>
                                  <span className="font-semibold">{prediction.analysis.headToHead.away}</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">টিম ফর্ম</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span className="font-medium">{prediction.homeTeam.name}</span>
                                    <span className="text-sm text-gray-600">স্কোর: {prediction.analysis.teamForm.home.form}</span>
                                  </div>
                                  <div className="flex gap-1">
                                    {prediction.analysis.teamForm.home.last5.map((result, i) => (
                                      <span key={i} className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                                        result === 'W' ? 'bg-green-100 text-green-800' :
                                        result === 'D' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      )}>
                                        {result}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-2">
                                    <span className="font-medium">{prediction.awayTeam.name}</span>
                                    <span className="text-sm text-gray-600">স্কোর: {prediction.analysis.teamForm.away.form}</span>
                                  </div>
                                  <div className="flex gap-1">
                                    {prediction.analysis.teamForm.away.last5.map((result, i) => (
                                      <span key={i} className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold",
                                        result === 'W' ? 'bg-green-100 text-green-800' :
                                        result === 'D' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      )}>
                                        {result}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="valuebets" className="space-y-4">
                        <div className="grid gap-4">
                          {prediction.valueBets.map((bet, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="font-semibold">{bet.type}</span>
                                      <Badge className={cn(
                                        "text-xs",
                                        getRecommendationColor(bet.recommendation)
                                      )}>
                                        {getRecommendationText(bet.recommendation)}
                                      </Badge>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      {bet.bookmaker} • কেলি: {bet.kellyCriterion.toFixed(1)}%
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">
                                      {bet.odds.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                      ভ্যালু: +{bet.value.toFixed(1)}%
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>নির্ভুলতা: {prediction.metrics.accuracy}%</span>
                        <span>ROI: +{prediction.metrics.roi}%</span>
                        <span>লাভ: ৳{prediction.metrics.profit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          বিস্তারিত
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="h-4 w-4 mr-1" />
                          সংরক্ষণ
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          শেয়ার
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8">
            <RefreshCw className="h-4 w-4 mr-2" />
            আরও প্রেডিকশন লোড করুন
          </Button>
        </div>
      </div>
    </div>
  )
}