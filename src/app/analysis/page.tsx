'use client'

import { useState } from 'react'
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
  BarChart2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/cn'

interface Match {
  id: string
  homeTeam: {
    name: string
    logo: string
    country: string
    rank: number
  }
  awayTeam: {
    name: string
    logo: string
    country: string
    rank: number
  }
  competition: string
  date: string
  time: string
  venue: string
  status: 'upcoming' | 'live' | 'finished'
  prediction?: {
    winner: 'home' | 'away' | 'draw'
    confidence: number
    probability: {
      home: number
      draw: number
      away: number
    }
  }
  odds?: {
    home: number
    draw: number
    away: number
  }
  tags: string[]
  importance: 'high' | 'medium' | 'low'
}

const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: {
      name: 'ম্যানচেস্টার সিটি',
      logo: '/images/teams/man-city.png',
      country: 'ইংল্যান্ড',
      rank: 1
    },
    awayTeam: {
      name: 'লিভারপুল',
      logo: '/images/teams/liverpool.png',
      country: 'ইংল্যান্ড',
      rank: 3
    },
    competition: 'প্রিমিয়ার লিগ',
    date: '১৫ ডিসেম্বর, ২০২৪',
    time: 'রাত ৯:৪৫',
    venue: 'ইতিহাদ স্টেডিয়াম',
    status: 'upcoming',
    prediction: {
      winner: 'home',
      confidence: 85,
      probability: {
        home: 65,
        draw: 20,
        away: 15
      }
    },
    odds: {
      home: 1.45,
      draw: 4.20,
      away: 6.50
    },
    tags: ['এল ক্লাসিকো', 'আসামা ম্যাচ'],
    importance: 'high'
  },
  {
    id: '2',
    homeTeam: {
      name: 'রিয়েল মাদ্রিদ',
      logo: '/images/teams/real-madrid.png',
      country: 'স্পেন',
      rank: 2
    },
    awayTeam: {
      name: 'বার্সেলোনা',
      logo: '/images/teams/barcelona.png',
      country: 'স্পেন',
      rank: 4
    },
    competition: 'লা লিগা',
    date: '১৬ ডিসেম্বর, ২০২৪',
    time: 'সন্ধ্যা ৭:৩০',
    venue: 'সান্তিয়াগো বের্নাবেউ',
    status: 'upcoming',
    prediction: {
      winner: 'home',
      confidence: 78,
      probability: {
        home: 55,
        draw: 25,
        away: 20
      }
    },
    odds: {
      home: 1.75,
      draw: 3.80,
      away: 4.20
    },
    tags: ['এল ক্লাসিকো', 'ঐতিহাসিক মুখোমুখি'],
    importance: 'high'
  },
  {
    id: '3',
    homeTeam: {
      name: 'বায়ার্ন মিউনিখ',
      logo: '/images/teams/bayern.png',
      country: 'জার্মানি',
      rank: 1
    },
    awayTeam: {
      name: 'বরুসিয়া ডর্টমুন্ড',
      logo: '/images/teams/dortmund.png',
      country: 'জার্মানি',
      rank: 2
    },
    competition: 'বুন্ডেসলিগা',
    date: '১৪ ডিসেম্বর, ২০২৪',
    time: 'রাত ৮:৩০',
    venue: 'অ্যালিয়াঞ্জ এরিনা',
    status: 'live',
    prediction: {
      winner: 'home',
      confidence: 92,
      probability: {
        home: 70,
        draw: 18,
        away: 12
      }
    },
    odds: {
      home: 1.25,
      draw: 5.50,
      away: 9.00
    },
    tags: ['ডারবি', 'লাইভ ম্যাচ'],
    importance: 'high'
  },
  {
    id: '4',
    homeTeam: {
      name: 'পিএসজি',
      logo: '/images/teams/psg.png',
      country: 'ফ্রান্স',
      rank: 1
    },
    awayTeam: {
      name: 'ওলেম্পিক মার্শেই',
      logo: '/images/teams/marseille.png',
      country: 'ফ্রান্স',
      rank: 3
    },
    competition: 'লিগ ১',
    date: '১৪ ডিসেম্বর, ২০২৪',
    time: 'সন্ধ্যা ৬:০০',
    venue: 'পার্ক দে প্রিন্সেস',
    status: 'finished',
    prediction: {
      winner: 'home',
      confidence: 88,
      probability: {
        home: 72,
        draw: 16,
        away: 12
      }
    },
    odds: {
      home: 1.35,
      draw: 4.80,
      away: 7.50
    },
    tags: ['ফরাসি ডারবি', 'শেষ'],
    importance: 'medium'
  }
]

const competitions = [
  'সকল লিগ',
  'প্রিমিয়ার লিগ',
  'লা লিগা',
  'সিরি আ',
  'বুন্ডেসলিগা',
  'লিগ ১',
  'বাংলাদেশ প্রিমিয়ার লিগ'
]

const sortOptions = [
  { value: 'date', label: 'তারিখ অনুযায়ী' },
  { value: 'importance', label: 'গুরুত্ব অনুযায়ী' },
  { value: 'confidence', label: 'নির্ভুলতা অনুযায়ী' },
  { value: 'odds', label: 'অডস অনুযায়ী' }
]

export default function AnalysisPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCompetition, setSelectedCompetition] = useState('সকল লিগ')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const filteredMatches = mockMatches
    .filter(match => {
      const matchesSearch = match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           match.competition.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCompetition = selectedCompetition === 'সকল লিগ' || 
                                match.competition === selectedCompetition
      
      const matchesStatus = filterStatus === 'all' || match.status === filterStatus
      
      return matchesSearch && matchesCompetition && matchesStatus
    })
    .sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime()
          bValue = new Date(b.date).getTime()
          break
        case 'importance':
          const importanceOrder = { 'high': 3, 'medium': 2, 'low': 1 }
          aValue = importanceOrder[a.importance]
          bValue = importanceOrder[b.importance]
          break
        case 'confidence':
          aValue = a.prediction?.confidence || 0
          bValue = b.prediction?.confidence || 0
          break
        case 'odds':
          aValue = a.odds?.home || 0
          bValue = b.odds?.home || 0
          break
        default:
          return 0
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  const toggleBookmark = (matchId: string) => {
    setBookmarked(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500'
      case 'upcoming': return 'bg-blue-500'
      case 'finished': return 'bg-gray-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'লাইভ'
      case 'upcoming': return 'আসন্ন'
      case 'finished': return 'শেষ'
      default: return status
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600'
    if (confidence >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ম্যাচ বিশ্লেষণ</h1>
              <p className="text-muted-foreground">
                AI-চালিত বিশ্লেষণ এবং ভবিষ্যৎ পূর্বাভাস
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                ফিল্টার
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                <BarChart3 className="w-4 h-4" />
              </Button>
              
              <Button size="sm" asChild>
                <Link href="/analysis/new">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন বিশ্লেষণ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className={cn(
          "space-y-4 mb-6 transition-all duration-300",
          showFilters ? "block" : "hidden lg:block"
        )}>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="দল বা লিগ খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Competition Filter */}
                <select
                  value={selectedCompetition}
                  onChange={(e) => setSelectedCompetition(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  {competitions.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                >
                  <option value="all">সকল স্ট্যাটাস</option>
                  <option value="upcoming">আসন্ন</option>
                  <option value="live">লাইভ</option>
                  <option value="finished">শেষ</option>
                </select>

                {/* Sort */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredMatches.length}টি ম্যাচ পাওয়া গেছে
          </p>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              এক্সপোর্ট
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              রিফ্রেশ
            </Button>
          </div>
        </div>

        {/* Matches Grid/List */}
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          <AnimatePresence>
            {filteredMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                  <CardContent className="p-6">
                    {/* Match Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", getStatusColor(match.status))} />
                        <span className="text-sm font-medium">{getStatusText(match.status)}</span>
                        <Badge variant="outline" className="text-xs">
                          {match.competition}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(match.id)}
                        >
                          <Bookmark className={cn(
                            "w-4 h-4",
                            bookmarked.includes(match.id) ? "fill-current text-yellow-500" : "text-muted-foreground"
                          )} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="space-y-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {match.homeTeam.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold">{match.homeTeam.name}</p>
                            <p className="text-sm text-muted-foreground">
                              র্যাংক #{match.homeTeam.rank} • {match.homeTeam.country}
                            </p>
                          </div>
                        </div>
                        {match.prediction && (
                          <Badge className={cn(
                            "text-xs",
                            match.prediction.winner === 'home' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          )}>
                            {match.prediction.winner === 'home' ? 'ফেভারিট' : match.prediction.winner === 'draw' ? 'ড্র' : 'আন্ডারডগ'}
                          </Badge>
                        )}
                      </div>

                      <div className="text-center text-muted-foreground">
                        <p className="text-sm font-medium">VS</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {match.awayTeam.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold">{match.awayTeam.name}</p>
                            <p className="text-sm text-muted-foreground">
                              র্যাংক #{match.awayTeam.rank} • {match.awayTeam.country}
                            </p>
                          </div>
                        </div>
                        {match.prediction && (
                          <Badge className={cn(
                            "text-xs",
                            match.prediction.winner === 'away' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          )}>
                            {match.prediction.winner === 'away' ? 'ফেভারিট' : match.prediction.winner === 'draw' ? 'ড্র' : 'আন্ডারডগ'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{match.venue}</span>
                      </div>
                    </div>

                    {/* Prediction */}
                    {match.prediction && (
                      <div className="bg-muted/30 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-sm">AI প্রেডিকশন</h4>
                          <div className="flex items-center gap-1">
                            <Brain className="w-4 h-4 text-purple-600" />
                            <span className={cn("text-sm font-medium", getConfidenceColor(match.prediction.confidence))}>
                              {match.prediction.confidence}% নির্ভুলতা
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">হোম জয়</span>
                            <span className="text-sm font-medium">{match.prediction.probability.home}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">ড্র</span>
                            <span className="text-sm font-medium">{match.prediction.probability.draw}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">অ্যাওয়ে জয়</span>
                            <span className="text-sm font-medium">{match.prediction.probability.away}%</span>
                          </div>
                        </div>

                        {/* Progress Bars */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-blue-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${match.prediction.probability.home}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">হোম</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gray-600 transition-all duration-1000"
                                style={{ width: `${match.prediction.probability.draw}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">ড্র</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-2 bg-red-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-600 transition-all duration-1000"
                                style={{ width: `${match.prediction.probability.away}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">অ্যাওয়ে</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Odds */}
                    {match.odds && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                          <p className="text-xs text-muted-foreground">হোম</p>
                          <p className="font-bold text-blue-600">{match.odds.home}</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 dark:bg-gray-950/30 rounded">
                          <p className="text-xs text-muted-foreground">ড্র</p>
                          <p className="font-bold text-gray-600">{match.odds.draw}</p>
                        </div>
                        <div className="text-center p-2 bg-red-50 dark:bg-red-950/30 rounded">
                          <p className="text-xs text-muted-foreground">অ্যাওয়ে</p>
                          <p className="font-bold text-red-600">{match.odds.away}</p>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Importance */}
                    <div className="flex items-center justify-between">
                      <Badge className={cn("text-xs", getImportanceColor(match.importance))}>
                        {match.importance === 'high' ? 'উচ্চ গুরুত্ব' : 
                         match.importance === 'medium' ? 'মধ্যম গুরুত্ব' : 'সাধারণ গুরুত্ব'}
                      </Badge>
                      
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/analysis/${match.id}`}>
                            <Eye className="w-4 h-4 mr-1" />
                            বিস্তারিত
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/predictions/create?match=${match.id}`}>
                            <TargetIcon className="w-4 h-4 mr-1" />
                            প্রেডিকশন
                          </Link>
                        </Button>
                      </div>
                    </div>
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
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">কোন ম্যাচ পাওয়া যায়নি</h3>
            <p className="text-muted-foreground mb-6">
              আপনার খোঁজার সাথে মিলে এমন কোন ম্যাচ নেই। অন্য কিছু খুঁজে দেখুন।
            </p>
            <Button onClick={() => {
              setSearchQuery('')
              setSelectedCompetition('সকল লিগ')
              setFilterStatus('all')
            }}>
              সব ফিল্টার সরান
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}