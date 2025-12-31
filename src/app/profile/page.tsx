'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Camera, 
  Save, 
  X,
  Bell,
  Shield,
  CreditCard,
  Trophy,
  Target,
  TrendingUp,
  DollarSign,
  Clock,
  Award,
  Star,
  Settings,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface UserStats {
  totalPredictions: number
  accuracy: number
  profit: number
  roi: number
  streak: number
  rank: number
  level: number
  experience: number
  badges: string[]
}

interface BettingHistory {
  id: string
  date: string
  match: string
  prediction: string
  odds: number
  result: 'win' | 'loss' | 'pending'
  profit: number
}

const mockUser = {
  firstName: 'মোহাম্মদ',
  lastName: 'রাহুল',
  email: 'rahman@example.com',
  phone: '+880 17xx xxx xxx',
  location: 'ঢাকা, বাংলাদেশ',
  joinDate: 'জানুয়ারি ২০২৪',
  avatar: '/images/avatar.jpg',
  bio: 'প্রফেশনাল ফুটবল অ্যানালিস্ট এবং AI প্রেডিকশন বিশেষজ্ঞ',
  preferences: {
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    darkMode: true,
    language: 'bn'
  }
}

const mockStats: UserStats = {
  totalPredictions: 247,
  accuracy: 94.2,
  profit: 12450,
  roi: 18.7,
  streak: 5,
  rank: 156,
  level: 12,
  experience: 2840,
  badges: ['প্রথম বার', 'ধারাবাহিক', 'বিশেষজ্ঞ', 'লাভজনক']
}

const mockBettingHistory: BettingHistory[] = [
  {
    id: '1',
    date: '১০ ডিসেম্বর, ২০২৪',
    match: 'ম্যানচেস্টার সিটি vs আর্সেনাল',
    prediction: 'ম্যানচেস্টার সিটি জয়',
    odds: 1.85,
    result: 'win',
    profit: 425
  },
  {
    id: '2',
    date: '৯ ডিসেম্বর, ২০২৪',
    match: 'বার্সেলোনা vs রিয়াল মাদ্রিদ',
    prediction: 'ড্র',
    odds: 3.40,
    result: 'win',
    profit: 1200
  },
  {
    id: '3',
    date: '৮ ডিসেম্বর, ২০২৪',
    match: 'লিভারপুল vs ম্যানচেস্টার ইউনাইটেড',
    prediction: 'লিভারপুল জয়',
    odds: 2.10,
    result: 'loss',
    profit: -500
  }
]

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [stats] = useState<UserStats>(mockStats)
  const [bettingHistory] = useState<BettingHistory[]>(mockBettingHistory)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(user)
  const [activeTab, setActiveTab] = useState('overview')

  const handleEditSave = () => {
    setUser(editForm)
    setIsEditing(false)
  }

  const handleEditCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-600 bg-green-50'
      case 'loss': return 'text-red-600 bg-red-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getResultText = (result: string) => {
    switch (result) {
      case 'win': return 'জয়'
      case 'loss': return 'হার'
      case 'pending': return 'অপেক্ষমান'
      default: return 'অজানা'
    }
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'প্রথম বার': return <Trophy className="h-4 w-4 text-yellow-500" />
      case 'ধারাবাহিক': return <Target className="h-4 w-4 text-blue-500" />
      case 'বিশেষজ্ঞ': return <Star className="h-4 w-4 text-purple-500" />
      case 'লাভজনক': return <DollarSign className="h-4 w-4 text-green-500" />
      default: return <Award className="h-4 w-4 text-gray-500" />
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
                <User className="h-8 w-8 text-blue-600" />
                প্রোফাইল
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                আপনার অ্যাকাউন্ট এবং পারফরমেন্স পরিচালনা করুন
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                প্রোফাইল সম্পাদনা
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span>অনলাইন</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {user.bio}
                </p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    লেভেল {stats.level}
                  </Badge>
                  <Badge variant="outline">
                    র‍্যাংক #{stats.rank}
                  </Badge>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">যোগদান: {user.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">লেভেল প্রগ্রেস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>অভিজ্ঞতা</span>
                    <span>{stats.experience} / 3000 XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.experience / 3000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    পরবর্তী লেভেলের জন্য {3000 - stats.experience} XP প্রয়োজন
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">ব্যাজ সমূহ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {stats.badges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                    >
                      {getBadgeIcon(badge)}
                      <span className="text-sm font-medium">{badge}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">সংক্ষিপ্ত বিবরণ</TabsTrigger>
                <TabsTrigger value="stats">পরিসংখ্যান</TabsTrigger>
                <TabsTrigger value="history">ইতিহাস</TabsTrigger>
                <TabsTrigger value="settings">সেটিংস</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPredictions}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">মোট প্রেডিকশন</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.accuracy}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">নির্ভুলতা</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">৳{stats.profit}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">মোট লাভ</div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-4 text-center">
                      <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">বর্তমান স্ট্রিক</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">সাম্প্রতিক কার্যকলাপ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bettingHistory.slice(0, 3).map((bet, index) => (
                        <div key={bet.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{bet.match}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{bet.prediction} • {bet.odds} odds</div>
                            <div className="text-xs text-gray-500">{bet.date}</div>
                          </div>
                          <div className="text-right">
                            <Badge className={getResultColor(bet.result)}>
                              {getResultText(bet.result)}
                            </Badge>
                            <div className={`text-sm font-medium mt-1 ${bet.profit > 0 ? 'text-green-600' : bet.profit < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                              {bet.profit > 0 ? '+' : ''}৳{bet.profit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">পারফরমেন্স মেট্রিক্স</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">ROI</span>
                        <span className="font-semibold text-green-600">+{stats.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">গড় জয়ের হার</span>
                        <span className="font-semibold">{stats.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">বর্তমান স্ট্রিক</span>
                        <span className="font-semibold text-blue-600">{stats.streak} জয়</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">সর্বোচ্চ স্ট্রিক</span>
                        <span className="font-semibold">১২ জয়</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">র‍্যাংকিং</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">বর্তমান র‍্যাংক</span>
                        <span className="font-semibold">#{stats.rank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">লেভেল</span>
                        <span className="font-semibold text-purple-600">লেভেল {stats.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">অভিজ্ঞতা</span>
                        <span className="font-semibold">{stats.experience} XP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">মোট ব্যাজ</span>
                        <span className="font-semibold">{stats.badges.length}টি</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">বেটিং ইতিহাস</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        এক্সপোর্ট
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        শেয়ার
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bettingHistory.map((bet) => (
                        <div key={bet.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{bet.match}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">{bet.prediction}</div>
                            <div className="text-xs text-gray-500">{bet.date}</div>
                          </div>
                          <div className="text-center mx-4">
                            <div className="text-sm font-medium">Odds</div>
                            <div className="font-semibold">{bet.odds}</div>
                          </div>
                          <div className="text-center mx-4">
                            <Badge className={getResultColor(bet.result)}>
                              {getResultText(bet.result)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${bet.profit > 0 ? 'text-green-600' : bet.profit < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                              {bet.profit > 0 ? '+' : ''}৳{bet.profit}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        নোটিফিকেশন সেটিংস
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">Push নোটিফিকেশন</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">ইমেইল আলার্ট</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">SMS আলার্ট</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">মার্কেট আপডেট</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        অ্যাপ সেটিংস
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">ডার্ক মোড</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">অ্যানিমেশন</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">অটো-সেভ</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">ভাষা</span>
                        <select className="px-3 py-1 border rounded bg-white dark:bg-slate-700">
                          <option value="bn">বাংলা</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>প্রোফাইল সম্পাদনা</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">প্রথম নাম</label>
                <Input
                  value={editForm.firstName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">শেষ নাম</label>
                <Input
                  value={editForm.lastName}
                  onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ফোন</label>
              <Input
                value={editForm.phone}
                onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">অবস্থান</label>
              <Input
                value={editForm.location}
                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">বায়ো</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={editForm.bio}
                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button onClick={handleEditSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                সংরক্ষণ
              </Button>
              <Button variant="outline" onClick={handleEditCancel} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                বাতিল
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}