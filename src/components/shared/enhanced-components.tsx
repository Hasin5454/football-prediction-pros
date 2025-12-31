'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Target,
  TrendingUp,
  Activity,
  Star,
  Award,
  Crown,
  Zap,
  Brain,
  BarChart3,
  Trophy,
  DollarSign,
  TrendingDown,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  RefreshCw,
  Plus,
  Settings,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Grid3X3,
  List,
  Maximize,
  Play,
  Pause
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils/cn'

// Enhanced Search Component
interface SearchComponentProps {
  placeholder?: string
  onSearch?: (query: string) => void
  suggestions?: string[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
Component({}

export function Search 
  placeholder = 'অনুসন্ধান করুন...', 
  onSearch,
  suggestions = [],
  className,
  size = 'md'
}: SearchComponentProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch?.(searchQuery)
    setShowSuggestions(false)
  }

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  }

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className={cn('pl-10 pr-4', sizeClasses[size])}
        />
        {query && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-lg shadow-lg z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion)}
                className="w-full px-3 py-2 text-left hover:bg-accent first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enhanced Stats Card Component
interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  icon: any
  description?: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  trend?: Array<{ label: string; value: number }>
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  color = 'from-blue-500 to-blue-600',
  size = 'md',
  trend,
  loading = false
}: StatsCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className={cn(sizeClasses[size])}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-8 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-32" />
            </div>
            <div className="w-12 h-12 bg-muted rounded-xl" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
      <CardContent className={cn(sizeClasses[size])}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                {getChangeIcon()}
                <span className={cn("font-medium", getChangeColor())}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {description && (
                  <span className="text-muted-foreground">{description}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl bg-gradient-to-r", color)}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {trend && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>ট্রেন্ড</span>
              <span>সপ্তাহিক</span>
            </div>
            <div className="flex items-center gap-1">
              {trend.map((item, index) => (
                <div key={index} className="flex-1">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Enhanced Match Card Component
interface MatchCardProps {
  homeTeam: {
    name: string
    shortName: string
    logo: string
    score?: number
  }
  awayTeam: {
    name: string
    shortName: string
    logo: string
    score?: number
  }
  competition: string
  status: 'upcoming' | 'live' | 'finished' | 'halftime'
  minute?: number
  venue: string
  date: string
  time: string
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
  tags?: string[]
  importance?: 'high' | 'medium' | 'low'
  onViewDetails?: () => void
  onMakePrediction?: () => void
  bookmarked?: boolean
  onBookmark?: () => void
  className?: string
}

export function MatchCard({
  homeTeam,
  awayTeam,
  competition,
  status,
  minute,
  venue,
  date,
  time,
  prediction,
  odds,
  tags = [],
  importance = 'medium',
  onViewDetails,
  onMakePrediction,
  bookmarked = false,
  onBookmark,
  className
}: MatchCardProps) {
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
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20",
      status === 'live' && "bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20",
      className
    )}>
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", getStatusColor(status))} />
            <span className="text-sm font-medium">{getStatusText(status)}</span>
            <Badge variant="outline" className="text-xs">
              {competition}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            {onBookmark && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBookmark}
              >
                <Bookmark className={cn(
                  "w-4 h-4",
                  bookmarked ? "fill-current text-yellow-500" : "text-muted-foreground"
                )} />
              </Button>
            )}
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
                  {homeTeam.shortName}
                </span>
              </div>
              <div>
                <p className="font-semibold">{homeTeam.name}</p>
                {homeTeam.score !== undefined && (
                  <p className="text-lg font-bold">{homeTeam.score}</p>
                )}
              </div>
            </div>
            {prediction && (
              <Badge className={cn(
                "text-xs",
                prediction.winner === 'home' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              )}>
                {prediction.winner === 'home' ? 'ফেভারিট' : prediction.winner === 'draw' ? 'ড্র' : 'আন্ডারডগ'}
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
                  {awayTeam.shortName}
                </span>
              </div>
              <div>
                <p className="font-semibold">{awayTeam.name}</p>
                {awayTeam.score !== undefined && (
                  <p className="text-lg font-bold">{awayTeam.score}</p>
                )}
              </div>
            </div>
            {prediction && (
              <Badge className={cn(
                "text-xs",
                prediction.winner === 'away' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              )}>
                {prediction.winner === 'away' ? 'ফেভারিট' : prediction.winner === 'draw' ? 'ড্র' : 'আন্ডারডগ'}
              </Badge>
            )}
          </div>
        </div>

        {/* Match Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{time}{minute && ` (${minute}')`}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{venue}</span>
          </div>
        </div>

        {/* Prediction */}
        {prediction && (
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">AI প্রেডিকশন</h4>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className={cn("text-sm font-medium", getConfidenceColor(prediction.confidence))}>
                  {prediction.confidence}% নির্ভুলতা
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">হোম জয়</span>
                <span className="text-sm font-medium">{prediction.probability.home}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ড্র</span>
                <span className="text-sm font-medium">{prediction.probability.draw}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">অ্যাওয়ে জয়</span>
                <span className="text-sm font-medium">{prediction.probability.away}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Odds */}
        {odds && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
              <p className="text-xs text-muted-foreground">হোম</p>
              <p className="font-bold text-blue-600">{odds.home}</p>
            </div>
            <div className="text-center p-2 bg-gray-50 dark:bg-gray-950/30 rounded">
              <p className="text-xs text-muted-foreground">ড্র</p>
              <p className="font-bold text-gray-600">{odds.draw}</p>
            </div>
            <div className="text-center p-2 bg-red-50 dark:bg-red-950/30 rounded">
              <p className="text-xs text-muted-foreground">অ্যাওয়ে</p>
              <p className="font-bold text-red-600">{odds.away}</p>
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Importance */}
        <div className="flex items-center justify-between">
          <Badge className={cn("text-xs", getImportanceColor(importance))}>
            {importance === 'high' ? 'উচ্চ গুরুত্ব' : 
             importance === 'medium' ? 'মধ্যম গুরুত্ব' : 'সাধারণ গুরুত্ব'}
          </Badge>
          
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <Button size="sm" variant="outline" onClick={onViewDetails}>
                <Eye className="w-4 h-4 mr-1" />
                বিস্তারিত
              </Button>
            )}
            {onMakePrediction && (
              <Button size="sm" onClick={onMakePrediction}>
                <Target className="w-4 h-4 mr-1" />
                প্রেডিকশন
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Action Button Component
interface ActionButtonProps {
  icon: any
  label: string
  onClick: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  badge?: string | number
  className?: string
}

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = 'default',
  size = 'md',
  loading = false,
  disabled = false,
  badge,
  className
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn('relative', className)}
    >
      <Icon className={cn(
        size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
      )} />
      {label && <span className="ml-2">{label}</span>}
      {badge && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
          {badge}
        </Badge>
      )}
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-md">
          <RefreshCw className="w-4 h-4 animate-spin" />
        </div>
      )}
    </Button>
  )
}