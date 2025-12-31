'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Trophy, 
  Users, 
  Clock, 
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Star,
  Award,
  Zap,
  Brain,
  Eye,
  Share2,
  Bookmark,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface StatCard {
  title: string
  value: string | number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  icon: any
  description: string
  color: string
}

interface Prediction {
  id: string
  match: string
  prediction: string
  confidence: number
  result: 'won' | 'lost' | 'pending'
  odds: number
  profit: number
  date: string
}

interface LiveMatch {
  id: string
  homeTeam: string
  awayTeam: string
  score: string
  minute: string
  status: 'live' | 'finished' | 'upcoming'
  league: string
}

const stats: StatCard[] = [
  {
    title: 'মোট প্রেডিকশন',
    value: 247,
    change: 12,
    changeType: 'increase',
    icon: Target,
    description: 'এই মাসে',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'সফলতার হার',
    value: '87.5%',
    change: 2.3,
    changeType: 'increase',
    icon: Trophy,
    description: 'গত মাসে',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'মোট লাভ',
    value: '৳৪২,৫০০',
    change: -5.2,
    changeType: 'decrease',
    icon: DollarSign,
    description: 'এই সপ্তাহে',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'সক্রিয় ব্যবহারকারী',
    value: '১,২৩৪',
    change: 8.7,
    changeType: 'increase',
    icon: Users,
    description: 'এই মাসে',
    color: 'from-purple-500 to-purple-600'
  }
]

const recentPredictions: Prediction[] = [
  {
    id: '1',
    match: 'ম্যানচেস্টার সিটি vs লিভারপুল',
    prediction: 'হোম জয়',
    confidence: 85,
    result: 'won',
    odds: 1.45,
    profit: 450,
    date: '১৪ ডিসেম্বর, ২০২৪'
  },
  {
    id: '2',
    match: 'রিয়েল মাদ্রিদ vs বার্সেলোনা',
    prediction: 'ড্র',
    confidence: 62,
    result: 'lost',
    odds: 3.80,
    profit: -1000,
    date: '১৩ ডিসেম্বর, ২০২৪'
  },
  {
    id: '3',
    match: 'বায়ার্ন মিউনিখ vs বরুসিয়া ডর্টমুন্ড',
    prediction: 'হোম জয়',
    confidence: 92,
    result: 'won',
    odds: 1.25,
    profit: 250,
    date: '১২ ডিসেম্বর, ২০২৪'
  },
  {
    id: '4',
    match: 'পিএসজি vs ওলেম্পিক মার্শেই',
    prediction: 'ওভার ২.৫ গোল',
    confidence: 78,
    result: 'pending',
    odds: 1.85,
    profit: 0,
    date: '১২ ডিসেম্বর, ২০২৪'
  }
]

const liveMatches: LiveMatch[] = [
  {
    id: '1',
    homeTeam: 'ম্যানচেস্টার সিটি',
    awayTeam: 'লিভারপুল',
    score: '2-1',
    minute: '67\'',
    status: 'live',
    league: 'প্রিমিয়ার লিগ'
  },
  {
    id: '2',
    homeTeam: 'রিয়েল মাদ্রিদ',
    awayTeam: 'বার্সেলোনা',
    score: '1-1',
    minute: '45\'',
    status: 'live',
    league: 'লা লিগা'
  },
  {
    id: '3',
    homeTeam: 'বায়ার্ন মিউনিখ',
    awayTeam: 'বরুসিয়া ডর্টমুন্ড',
    score: '3-0',
    minute: '78\'',
    status: 'live',
    league: 'বুন্ডেসলিগা'
  }
]

const weeklyData = [
  { name: 'সোম', predictions: 12, accuracy: 85 },
  { name: 'মঙ্গল', predictions: 8, accuracy: 92 },
  { name: 'বুধ', predictions: 15, accuracy: 78 },
  { name: 'বৃহস্পতি', predictions: 10, accuracy: 88 },
  { name: 'শুক্র', predictions: 14, accuracy: 91 },
  { name: 'শনি', predictions: 11, accuracy: 86 },
  { name: 'রবি', predictions: 6, accuracy: 94 }
]

const leaguePerformance = [
  { name: 'প্রিমিয়ার লিগ', accuracy: 89, predictions: 45, profit: 12500 },
  { name: 'লা লিগা', accuracy: 85, predictions: 32, profit: 8900 },
  { name: 'সিরি আ', accuracy: 82, predictions: 28, profit: 6700 },
  { name: 'বুন্ডেসলিগা', accuracy: 87, predictions: 35, profit: 9800 },
  { name: 'লিগ ১', accuracy: 83, predictions: 24, profit: 5600 }
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('7d')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case 'won':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'lost':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'won':
        return 'text-green-600'
      case 'lost':
        return 'text-red-600'
      case 'pending':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />
      case 'decrease':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h1>
              <p className="text-muted-foreground">
                আপনার বেটিং পারফরম্যান্স এবং AI প্রেডিকশন ট্র্যাক করুন
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                <option value="1d">আজ</option>
                <option value="7d">সাত দিন</option>
                <option value="30d">ত্রিশ দিন</option>
                <option value="90d">নব্বই দিন</option>
              </select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
                রিফ্রেশ
              </Button>
              
              <Button size="sm" asChild>
                <Link href="/predictions/create">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন প্রেডিকশন
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <div className="flex items-center gap-1 text-sm">
                          {getChangeIcon(stat.changeType)}
                          <span className={cn(
                            "font-medium",
                            stat.changeType === 'increase' ? 'text-green-600' : 
                            stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                          )}>
                            {stat.change > 0 ? '+' : ''}{stat.change}%
                          </span>
                          <span className="text-muted-foreground">{stat.description}</span>
                        </div>
                      </div>
                      <div className={cn(
                        "p-3 rounded-xl bg-gradient-to-r",
                        stat.color
                      )}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  সাপ্তাহিক পারফরম্যান্স
                </CardTitle>
                <CardDescription>
                  প্রতিদিনের প্রেডিকশন সংখ্যা এবং নির্ভুলতা
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{day.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            {day.predictions} টি প্রেডিকশন
                          </span>
                          <span className="font-medium">{day.accuracy}% নির্ভুলতা</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                            style={{ width: `${(day.predictions / 15) * 100}%` }}
                          />
                        </div>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-1000"
                            style={{ width: `${day.accuracy}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  লাইভ ম্যাচ
                </CardTitle>
                <CardDescription>
                  রিয়েল-টাইম স্কোর এবং আপডেট
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveMatches.map((match, index) => (
                    <div key={match.id} className="p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {match.league}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{match.minute}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{match.homeTeam}</span>
                          <span className="font-bold">{match.score.split('-')[0]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{match.awayTeam}</span>
                          <span className="font-bold">{match.score.split('-')[1]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href="/live">
                    সব লাইভ ম্যাচ দেখুন
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* League Performance and Recent Predictions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* League Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  লিগ অনুযায়ী পারফরম্যান্স
                </CardTitle>
                <CardDescription>
                  বিভিন্ন লিগে আপনার সাফল্যের হার
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaguePerformance.map((league, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{league.name}</span>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-green-600 font-medium">{league.accuracy}%</span>
                          <span className="text-muted-foreground">
                            ({league.predictions} টি)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-1000"
                            style={{ width: `${league.accuracy}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-green-600">
                          +৳{league.profit.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  সাম্প্রতিক প্রেডিকশন
                </CardTitle>
                <CardDescription>
                  আপনার শেষ কয়েকটি প্রেডিকশনের ফলাফল
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPredictions.map((prediction, index) => (
                    <div key={prediction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getResultIcon(prediction.result)}
                        <div>
                          <p className="font-medium text-sm">{prediction.match}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{prediction.prediction}</span>
                            <span>•</span>
                            <span>{prediction.confidence}% কনফিডেন্স</span>
                            <span>•</span>
                            <span>{prediction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-bold text-sm",
                          prediction.profit > 0 ? "text-green-600" : 
                          prediction.profit < 0 ? "text-red-600" : "text-yellow-600"
                        )}>
                          {prediction.profit > 0 ? '+' : ''}৳{Math.abs(prediction.profit)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @ {prediction.odds}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href="/predictions">
                    সব প্রেডিকশন দেখুন
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                দ্রুত অ্যাকশন
              </CardTitle>
              <CardDescription>
                প্রায়ই ব্যবহৃত ফিচারসমূহ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/analysis">
                    <Brain className="w-6 h-6 mb-2" />
                    নতুন বিশ্লেষণ
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/predictions/create">
                    <Target className="w-6 h-6 mb-2" />
                    প্রেডিকশন তৈরি
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/live">
                    <Activity className="w-6 h-6 mb-2" />
                    লাইভ ম্যাচ
                  </Link>
                </Button>
                <Button variant="outline" className="h-20 flex-col" asChild>
                  <Link href="/settings">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    সেটিংস
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}