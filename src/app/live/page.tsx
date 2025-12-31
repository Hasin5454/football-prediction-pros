'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings,
  Bell,
  BellOff,
  Share2,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Target,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Globe,
  Star,
  Award,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils/cn'

interface LiveMatch {
  id: string
  homeTeam: {
    name: string
    shortName: string
    logo: string
    country: string
    score: number
    possession: number
    shots: number
    shotsOnTarget: number
    corners: number
    fouls: number
    yellowCards: number
    redCards: number
  }
  awayTeam: {
    name: string
    shortName: string
    logo: string
    country: string
    score: number
    possession: number
    shots: number
    shotsOnTarget: number
    corners: number
    fouls: number
    yellowCards: number
    redCards: number
  }
  competition: string
  minute: number
  status: 'live' | 'finished' | 'upcoming' | 'halftime'
  venue: string
  attendance: number
  referee: string
  weather: string
  events: MatchEvent[]
  momentum: 'home' | 'away' | 'neutral'
  intensity: number
  lastUpdate: string
}

interface MatchEvent {
  id: string
  minute: number
  type: 'goal' | 'card' | 'substitution' | 'corner' | 'foul' | 'offside'
  player: string
  team: 'home' | 'away'
  description: string
  assist?: string
}

const mockLiveMatches: LiveMatch[] = [
  {
    id: '1',
    homeTeam: {
      name: 'ম্যানচেস্টার সিটি',
      shortName: 'MCI',
      logo: '/images/teams/man-city.png',
      country: 'ইংল্যান্ড',
      score: 2,
      possession: 65,
      shots: 8,
      shotsOnTarget: 5,
      corners: 4,
      fouls: 6,
      yellowCards: 1,
      redCards: 0
    },
    awayTeam: {
      name: 'লিভারপুল',
      shortName: 'LIV',
      logo: '/images/teams/liverpool.png',
      country: 'ইংল্যান্ড',
      score: 1,
      possession: 35,
      shots: 4,
      shotsOnTarget: 2,
      corners: 2,
      fouls: 8,
      yellowCards: 2,
      redCards: 0
    },
    competition: 'প্রিমিয়ার লিগ',
    minute: 67,
    status: 'live',
    venue: 'ইতিহাদ স্টেডিয়াম',
    attendance: 53400,
    referee: 'মাইকেল অলিভার',
    weather: 'স্পষ্ট আবহাওয়া, 18°C',
    events: [
      {
        id: '1',
        minute: 23,
        type: 'goal',
        player: 'এর্লিং হল্যান্ড',
        team: 'home',
        description: 'কেভিন ডি ব্রুইনের পাস থেকে',
        assist: 'কেভিন ডি ব্রুইন'
      },
      {
        id: '2',
        minute: 45,
        type: 'card',
        player: 'মোহাম্মদ সালাহ',
        team: 'away',
        description: 'দ্বিতীয় হলুদ কার্ড'
      },
      {
        id: '3',
        minute: 67,
        type: 'goal',
        player: 'ফিল ফোডেন',
        team: 'home',
        description: 'বক্সের বাইরে থেকে শট',
        assist: 'রদ্রি'
      }
    ],
    momentum: 'home',
    intensity: 85,
    lastUpdate: '২০২৪-১২-১৪T14:30:00Z'
  },
  {
    id: '2',
    homeTeam: {
      name: 'রিয়েল মাদ্রিদ',
      shortName: 'RMA',
      logo: '/images/teams/real-madrid.png',
      country: 'স্পেন',
      score: 1,
      possession: 58,
      shots: 6,
      shotsOnTarget: 3,
      corners: 3,
      fouls: 5,
      yellowCards: 0,
      redCards: 0
    },
    awayTeam: {
      name: 'বার্সেলোনা',
      shortName: 'BAR',
      logo: '/images/teams/barcelona.png',
      country: 'স্পেন',
      score: 1,
      possession: 42,
      shots: 5,
      shotsOnTarget: 2,
      corners: 2,
      fouls: 7,
      yellowCards: 1,
      redCards: 0
    },
    competition: 'লা লিগা',
    minute: 45,
    status: 'halftime',
    venue: 'সান্তিয়াগো বের্নাবেউ',
    attendance: 81044,
    referee: 'হেসুস গিল মানজানো',
    weather: 'আংশিক মেঘলা, 22°C',
    events: [
      {
        id: '4',
        minute: 32,
        type: 'goal',
        player: 'কারিম বেনজেমা',
        team: 'home',
        description: 'ভিনিসিয়াস জুনিয়রের পাস থেকে',
        assist: 'ভিনিসিয়াস জুনিয়র'
      },
      {
        id: '5',
        minute: 41,
        type: 'goal',
        player: 'রবার্ট লেভানডোভস্কি',
        team: 'away',
        description: 'পেনাল্টি থেকে',
        assist: null
      }
    ],
    momentum: 'neutral',
    intensity: 75,
    lastUpdate: '২০২৪-১২-১৪T13:45:00Z'
  },
  {
    id: '3',
    homeTeam: {
      name: 'বায়ার্ন মিউনিখ',
      shortName: 'BAY',
      logo: '/images/teams/bayern.png',
      country: 'জার্মানি',
      score: 3,
      possession: 72,
      shots: 12,
      shotsOnTarget: 8,
      corners: 6,
      fouls: 4,
      yellowCards: 0,
      redCards: 0
    },
    awayTeam: {
      name: 'বরুসিয়া ডর্টমুন্ড',
      shortName: 'BVB',
      logo: '/images/teams/dortmund.png',
      country: 'জার্মানি',
      score: 0,
      possession: 28,
      shots: 3,
      shotsOnTarget: 1,
      corners: 1,
      fouls: 9,
      yellowCards: 2,
      redCards: 0
    },
    competition: 'বুন্ডেসলিগা',
    minute: 78,
    status: 'live',
    venue: 'অ্যালিয়াঞ্জ এরিনা',
    attendance: 75000,
    referee: 'সাসা কারগোদেন',
    weather: 'বৃষ্টি, 12°C',
    events: [
      {
        id: '6',
        minute: 15,
        type: 'goal',
        player: 'হ্যারি কেইন',
        team: 'home',
        description: 'জামাল মুসিয়ালার পাস থেকে',
        assist: 'জামাল মুসিয়ালা'
      },
      {
        id: '7',
        minute: 34,
        type: 'goal',
        player: 'থমাস মুলার',
        team: 'home',
        description: 'কর্নার থেকে হেড',
        assist: null
      },
      {
        id: '8',
        minute: 67,
        type: 'goal',
        player: 'কিংসলে কোমান',
        team: 'home',
        description: 'বক্সের বাইরে থেকে শট',
        assist: 'লেরয় সানে'
      }
    ],
    momentum: 'home',
    intensity: 90,
    lastUpdate: '২০২৪-১২-১৪T14:18:00Z'
  }
]

export default function LivePage() {
  const [matches, setMatches] = useState<LiveMatch[]>(mockLiveMatches)
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'minute' | 'intensity' | 'competition'>('minute')
  const [filterCompetition, setFilterCompetition] = useState('সকল লিগ')
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate live updates
        setMatches(prevMatches => 
          prevMatches.map(match => {
            if (match.status === 'live' && Math.random() > 0.95) {
              // Simulate random updates
              return {
                ...match,
                lastUpdate: new Date().toISOString(),
                homeTeam: {
                  ...match.homeTeam,
                  possession: Math.max(0, Math.min(100, match.homeTeam.possession + (Math.random() - 0.5) * 10))
                },
                awayTeam: {
                  ...match.awayTeam,
                  possession: 100 - match.homeTeam.possession
                }
              }
            }
            return match
          })
        )
      }, 10000) // Update every 10 seconds

      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500'
      case 'halftime': return 'bg-yellow-500'
      case 'finished': return 'bg-gray-500'
      case 'upcoming': return 'bg-blue-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'লাইভ'
      case 'halftime': return 'অর্ধবিরতি'
      case 'finished': return 'শেষ'
      case 'upcoming': return 'আসন্ন'
      default: return status
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'goal': return <Target className="w-4 h-4 text-green-600" />
      case 'card': return <XCircle className="w-4 h-4 text-red-600" />
      case 'substitution': return <Users className="w-4 h-4 text-blue-600" />
      case 'corner': return <PieChart className="w-4 h-4 text-purple-600" />
      case 'foul': return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'offside': return <Info className="w-4 h-4 text-orange-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredMatches = matches
    .filter(match => filterCompetition === 'সকল লিগ' || match.competition === filterCompetition)
    .sort((a, b) => {
      switch (sortBy) {
        case 'minute':
          return a.minute - b.minute
        case 'intensity':
          return b.intensity - a.intensity
        case 'competition':
          return a.competition.localeCompare(b.competition)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">লাইভ ম্যাচ</h1>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-red-600">রিয়েল-টাইম</span>
                </div>
              </div>
              <p className="text-muted-foreground">
                লাইভ স্কোর, পরিসংখ্যান এবং ঘটনাবলী ট্র্যাক করুন
              </p>
              <p className="text-sm text-muted-foreground">
                শেষ আপডেট: {currentTime.toLocaleTimeString('bn-BD')}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={notifications ? "default" : "outline"}
                size="sm"
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={soundEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              
              <Button
                variant={autoRefresh ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <RefreshCw className={cn("w-4 h-4", autoRefresh && "animate-spin")} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <select
              value={filterCompetition}
              onChange={(e) => setFilterCompetition(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="সকল লিগ">সকল লিগ</option>
              <option value="প্রিমিয়ার লিগ">প্রিমিয়ার লিগ</option>
              <option value="লা লিগা">লা লিগা</option>
              <option value="সিরি আ">সিরি আ</option>
              <option value="বুন্ডেসলিগা">বুন্ডেসলিগা</option>
              <option value="লিগ ১">লিগ ১</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="minute">মিনিট অনুযায়ী</option>
              <option value="intensity">ইনটেনসিটি অনুযায়ী</option>
              <option value="competition">লিগ অনুযায়ী</option>
            </select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredMatches.length}টি ম্যাচ লাইভ
          </div>
        </div>

        {/* Matches Grid */}
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          <AnimatePresence>
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "group",
                  viewMode === 'list' && "w-full"
                )}
              >
                <Card className={cn(
                  "hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden",
                  selectedMatch === match.id && "ring-2 ring-primary",
                  match.status === 'live' && "bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20"
                )}>
                  <CardContent className="p-0">
                    {/* Match Header */}
                    <div className="p-4 border-b bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {match.competition}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", getStatusColor(match.status))} />
                          <span className="text-sm font-medium">{getStatusText(match.status)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{match.minute}\'</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate max-w-[120px]">{match.venue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Teams and Score */}
                    <div className="p-4">
                      <div className="space-y-4">
                        {/* Home Team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {match.homeTeam.shortName}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold">{match.homeTeam.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {match.homeTeam.country}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold">{match.homeTeam.score}</p>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-500"
                                  style={{ width: `${match.homeTeam.possession}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {Math.round(match.homeTeam.possession)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Away Team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {match.awayTeam.shortName}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold">{match.awayTeam.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {match.awayTeam.country}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold">{match.awayTeam.score}</p>
                            <div className="flex items-center gap-1">
                              <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-red-500 transition-all duration-500"
                                  style={{ width: `${match.awayTeam.possession}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {Math.round(match.awayTeam.possession)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Stats */}
                    <div className="px-4 pb-4">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">শট</p>
                          <p className="font-bold text-sm">
                            {match.homeTeam.shots} - {match.awayTeam.shots}
                          </p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">গোলবারে</p>
                          <p className="font-bold text-sm">
                            {match.homeTeam.shotsOnTarget} - {match.awayTeam.shotsOnTarget}
                          </p>
                        </div>
                        <div className="p-2 bg-muted/30 rounded">
                          <p className="text-xs text-muted-foreground">কোনার</p>
                          <p className="font-bold text-sm">
                            {match.homeTeam.corners} - {match.awayTeam.corners}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Momentum Indicator */}
                    <div className="px-4 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">মোমেন্টাম</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            match.momentum === 'home' ? 'bg-blue-500' :
                            match.momentum === 'away' ? 'bg-red-500' : 'bg-gray-500'
                          )} />
                          <span className="text-sm font-medium">
                            {match.momentum === 'home' ? match.homeTeam.shortName :
                             match.momentum === 'away' ? match.awayTeam.shortName : 'সমান'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 pt-0">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          বিস্তারিত
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Detailed View */}
                    <AnimatePresence>
                      {selectedMatch === match.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t bg-muted/20"
                        >
                          <div className="p-4 space-y-4">
                            {/* Match Events */}
                            <div>
                              <h4 className="font-semibold mb-2">ম্যাচ ঘটনাবলী</h4>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {match.events.slice(-5).map((event) => (
                                  <div key={event.id} className="flex items-center gap-2 text-sm">
                                    <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-bold">
                                      {event.minute}\'
                                    </div>
                                    {getEventIcon(event.type)}
                                    <div className="flex-1">
                                      <span className="font-medium">{event.player}</span>
                                      <span className="text-muted-foreground"> - {event.description}</span>
                                      {event.assist && (
                                        <span className="text-xs text-muted-foreground">
                                          (অ্যাসিস্ট: {event.assist})
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">উপস্থিতি</p>
                                <p className="font-medium">{match.attendance.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">রেফারি</p>
                                <p className="font-medium truncate">{match.referee}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">আবহাওয়া</p>
                                <p className="font-medium">{match.weather}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">ইনটেনসিটি</p>
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-500"
                                      style={{ width: `${match.intensity}%` }}
                                    />
                                  </div>
                                  <span className="font-medium">{match.intensity}%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredMatches.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Activity className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">কোন লাইভ ম্যাচ নেই</h3>
            <p className="text-muted-foreground mb-6">
              বর্তমানে কোন লাইভ ম্যাচ চলছে না। অন্য লিগ দেখুন বা পরে আবার চেক করুন।
            </p>
            <Button onClick={() => {
              setFilterCompetition('সকল লিগ')
              setAutoRefresh(true)
            }}>
              সব লিগ দেখুন
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}