'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  Eye, 
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Palette,
  Globe,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  FileText,
  Key,
  Database,
  Zap,
  Clock,
  MonitorSpeaker
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/cn'

interface NotificationSettings {
  push: boolean
  email: boolean
  sms: boolean
  marketing: boolean
  security: boolean
  predictions: boolean
  updates: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  showEmail: boolean
  showPhone: boolean
  showLocation: boolean
  allowDirectMessages: boolean
  showOnlineStatus: boolean
}

interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  sessionTimeout: number
  passwordExpiry: number
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [notifications, setNotifications] = useState<NotificationSettings>({
    push: true,
    email: true,
    sms: false,
    marketing: false,
    security: true,
    predictions: true,
    updates: true
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'friends',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowDirectMessages: true,
    showOnlineStatus: true
  })

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90
  })

  const [preferences, setPreferences] = useState({
    theme: 'dark',
    language: 'bn',
    currency: 'BDT',
    timezone: 'Asia/Dhaka',
    autoSave: true,
    animations: true,
    sound: true,
    volume: 70,
    dataSaving: false,
    offlineMode: false
  })

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }))
  }

  const handleSecurityChange = (key: keyof SecuritySettings, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }))
  }

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const SettingCard = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  )

  const ToggleSetting = ({ label, description, checked, onChange, disabled = false }: {
    label: string
    description?: string
    checked: boolean
    onChange: () => void
    disabled?: boolean
  }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
      <div className="flex-1">
        <div className="font-medium text-gray-900 dark:text-white">{label}</div>
        {description && <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>}
      </div>
      <button
        onClick={onChange}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          checked ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Settings className="h-8 w-8 text-blue-600" />
                সেটিংস
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                আপনার অ্যাকাউন্ট এবং অ্যাপ্লিকেশন পছন্দগুলো পরিচালনা করুন
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                সব সেটিংস সংরক্ষিত
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">সাধারণ</TabsTrigger>
            <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
            <TabsTrigger value="privacy">গোপনীয়তা</TabsTrigger>
            <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
            <TabsTrigger value="preferences">পছন্দসমূহ</TabsTrigger>
            <TabsTrigger value="advanced">উন্নত</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="অ্যাকাউন্ট তথ্য"
                description="আপনার মূল অ্যাকাউন্টের বিবরণ পরিচালনা করুন"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">প্রথম নাম</label>
                      <Input defaultValue="মোহাম্মদ" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">শেষ নাম</label>
                      <Input defaultValue="রাহুল" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ইমেইল</label>
                    <Input type="email" defaultValue="rahman@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ফোন</label>
                    <Input defaultValue="+880 17xx xxx xxx" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">অবস্থান</label>
                    <Input defaultValue="ঢাকা, বাংলাদেশ" />
                  </div>
                  
                  <Button className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    পরিবর্তনগুলো সংরক্ষণ করুন
                  </Button>
                </div>
              </SettingCard>

              <SettingCard
                title="অ্যাকাউন্ট পরিচালনা"
                description="অ্যাকাউন্ট সম্পর্কিত কার্যক্রমগুলো"
              >
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-3" />
                    ডেটা এক্সপোর্ট করুন
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-3" />
                    ডেটা ইমপোর্ট করুন
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-3" />
                        অ্যাকাউন্ট মুছে ফেলুন
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-red-600 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          অ্যাকাউন্ট মুছে ফেলার নিশ্চিতকরণ
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          এটি একটি অপরিবর্তনীয় কার্যকলাপ। আপনার সকল ডেটা, প্রেডিকশন এবং বেটিং ইতিহাস স্থায়ীভাবে মুছে যাবে।
                        </p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">সতর্কতা</h4>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                                এই কার্যকলাপটি পূর্বাবস্থায় ফেরানো যাবে না। অনুগ্রহ করে নিশ্চিত করুন যে আপনি এটি করতে চান।
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1">
                            বাতিল
                          </Button>
                          <Button variant="destructive" className="flex-1">
                            হ্যাঁ, মুছে ফেলুন
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="নোটিফিকেশন চ্যানেল"
                description="কোন চ্যানেলের মাধ্যমে নোটিফিকেশন পাবেন"
              >
                <div className="space-y-3">
                  <ToggleSetting
                    label="Push নোটিফিকেশন"
                    description="ব্রাউজার এবং মোবাইলে"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  
                  <ToggleSetting
                    label="ইমেইল নোটিফিকেশন"
                    description="গুরুত্বপূর্ণ আপডেটের জন্য"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  
                  <ToggleSetting
                    label="SMS নোটিফিকেশন"
                    description="জরুরি বিষয়ে SMS"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                </div>
              </SettingCard>

              <SettingCard
                title="নোটিফিকেশন ধরন"
                description="কোন ধরনের নোটিফিকেশন পাবেন"
              >
                <div className="space-y-3">
                  <ToggleSetting
                    label="নতুন প্রেডিকশন"
                    description="AI প্রেডিকশন আপডেট"
                    checked={notifications.predictions}
                    onChange={() => handleNotificationChange('predictions')}
                  />
                  
                  <ToggleSetting
                    label="নিরাপত্তা আলার্ট"
                    description="অ্যাকাউন্ট নিরাপত্তা সম্পর্কিত"
                    checked={notifications.security}
                    onChange={() => handleNotificationChange('security')}
                  />
                  
                  <ToggleSetting
                    label="মার্কেট আপডেট"
                    description="ওড্ডস এবং লাইভ স্কোর"
                    checked={notifications.updates}
                    onChange={() => handleNotificationChange('updates')}
                  />
                  
                  <ToggleSetting
                    label="মার্কেটিং কমিউনিকেশন"
                    description="নতুন ফিচার এবং অফার"
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                  />
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="প্রোফাইল দৃশ্যমানতা"
                description="আপনার প্রোফাইল কে দেখতে পাবে"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      প্রোফাইল দৃশ্যমানতা
                    </label>
                    <select 
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
                    >
                      <option value="public">সর্বস্বর্ত</option>
                      <option value="friends">বন্ধুদের জন্য</option>
                      <option value="private">ব্যক্তিগত</option>
                    </select>
                  </div>
                  
                  <div className="space-y-3">
                    <ToggleSetting
                      label="ইমেইল দেখান"
                      checked={privacy.showEmail}
                      onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                    />
                    
                    <ToggleSetting
                      label="ফোন নম্বর দেখান"
                      checked={privacy.showPhone}
                      onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                    />
                    
                    <ToggleSetting
                      label="অবস্থান দেখান"
                      checked={privacy.showLocation}
                      onChange={() => handlePrivacyChange('showLocation', !privacy.showLocation)}
                    />
                    
                    <ToggleSetting
                      label="সরাসরি মেসেজ অনুমতি"
                      checked={privacy.allowDirectMessages}
                      onChange={() => handlePrivacyChange('allowDirectMessages', !privacy.allowDirectMessages)}
                    />
                    
                    <ToggleSetting
                      label="অনলাইন স্ট্যাটাস দেখান"
                      checked={privacy.showOnlineStatus}
                      onChange={() => handlePrivacyChange('showOnlineStatus', !privacy.showOnlineStatus)}
                    />
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="ডেটা এবং গোপনীয়তা"
                description="আপনার ডেটা কিভাবে ব্যবহার হয়"
              >
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 dark:text-blue-200">ডেটা সুরক্ষা</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          আমরা আপনার ডেটা নিরাপত্তার জন্য এনক্রিপশন ব্যবহার করি এবং তৃতীয় পক্ষের সাথে শেয়ার করি না।
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    গোপনীয়তা নীতি পড়ুন
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    ব্যক্তিগত ডেটা ডাউনলোড করুন
                  </Button>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="অ্যাকাউন্ট নিরাপত্তা"
                description="আপনার অ্যাকাউন্ট সুরক্ষিত রাখুন"
              >
                <div className="space-y-4">
                  <ToggleSetting
                    label="দুই-ফ্যাক্টর প্রমাণীকরণ"
                    description="অতিরিক্ত সুরক্ষার জন্য"
                    checked={security.twoFactorAuth}
                    onChange={() => handleSecurityChange('twoFactorAuth', !security.twoFactorAuth)}
                  />
                  
                  <ToggleSetting
                    label="লগইন আলার্ট"
                    description="নতুন লগইনের নোটিফিকেশন"
                    checked={security.loginAlerts}
                    onChange={() => handleSecurityChange('loginAlerts', !security.loginAlerts)}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      সেশন টাইমআউট (মিনিট)
                    </label>
                    <select 
                      value={security.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
                    >
                      <option value={15}>১৫ মিনিট</option>
                      <option value={30}>৩০ মিনিট</option>
                      <option value={60}>১ ঘন্টা</option>
                      <option value={120}>২ ঘন্টা</option>
                    </select>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="পাসওয়ার্ড এবং পুনরুদ্ধার"
                description="পাসওয়ার্ড পরিচালনা করুন"
              >
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="h-4 w-4 mr-3" />
                    পাসওয়ার্ড পরিবর্তন করুন
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="h-4 w-4 mr-3" />
                    পুনরুদ্ধার ইমেইল আপডেট করুন
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="h-4 w-4 mr-3" />
                    পুনরুদ্ধার ফোন আপডেট করুন
                  </Button>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-200">নিরাপত্তা স্কোর</h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          আপনার অ্যাকাউন্ট ৮৫% নিরাপদ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="ডিসপ্লে এবং ইন্টারফেস"
                description="আপনার অভিজ্ঞতা কাস্টমাইজ করুন"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      থিম
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handlePreferenceChange('theme', 'light')}
                        className={cn(
                          "p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all",
                          preferences.theme === 'light' 
                            ? "border-blue-500 bg-blue-50 text-blue-600" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Sun className="h-4 w-4" />
                        <span className="text-sm">লাইট</span>
                      </button>
                      <button
                        onClick={() => handlePreferenceChange('theme', 'dark')}
                        className={cn(
                          "p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all",
                          preferences.theme === 'dark' 
                            ? "border-blue-500 bg-blue-50 text-blue-600" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Moon className="h-4 w-4" />
                        <span className="text-sm">ডার্ক</span>
                      </button>
                      <button
                        onClick={() => handlePreferenceChange('theme', 'auto')}
                        className={cn(
                          "p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-all",
                          preferences.theme === 'auto' 
                            ? "border-blue-500 bg-blue-50 text-blue-600" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <Monitor className="h-4 w-4" />
                        <span className="text-sm">অটো</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ভাষা
                    </label>
                    <select 
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
                    >
                      <option value="bn">বাংলা</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      মুদ্রা
                    </label>
                    <select 
                      value={preferences.currency}
                      onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600"
                    >
                      <option value="BDT">টাকা (৳)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="অ্যাপ্লিকেশন সেটিংস"
                description="অ্যাপ্লিকেশন আচরণ নিয়ন্ত্রণ করুন"
              >
                <div className="space-y-4">
                  <ToggleSetting
                    label="অটো-সেভ"
                    description="পরিবর্তনগুলো স্বয়ংক্রিয়ভাবে সংরক্ষণ"
                    checked={preferences.autoSave}
                    onChange={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
                  />
                  
                  <ToggleSetting
                    label="অ্যানিমেশন"
                    description="ইন্টারফেস অ্যানিমেশন চালু করুন"
                    checked={preferences.animations}
                    onChange={() => handlePreferenceChange('animations', !preferences.animations)}
                  />
                  
                  <ToggleSetting
                    label="শব্দ"
                    description="নোটিফিকেশন শব্দ চালু করুন"
                    checked={preferences.sound}
                    onChange={() => handlePreferenceChange('sound', !preferences.sound)}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      শব্দের মাত্রা
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={preferences.volume}
                      onChange={(e) => handlePreferenceChange('volume', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>০%</span>
                      <span>{preferences.volume}%</span>
                      <span>১০০%</span>
                    </div>
                  </div>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SettingCard
                title="ডেটা এবং পারফরমেন্স"
                description="ডেটা ব্যবহার এবং অ্যাপ পারফরমেন্স"
              >
                <div className="space-y-4">
                  <ToggleSetting
                    label="ডেটা সেভিং মোড"
                    description="কম ডেটা ব্যবহার করুন"
                    checked={preferences.dataSaving}
                    onChange={() => handlePreferenceChange('dataSaving', !preferences.dataSaving)}
                  />
                  
                  <ToggleSetting
                    label="অফলাইন মোড"
                    description="ইন্টারনেট ছাড়াই কাজ করুন"
                    checked={preferences.offlineMode}
                    onChange={() => handlePreferenceChange('offlineMode', !preferences.offlineMode)}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ক্যাশ সাইজ সীমা
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600">
                      <option value="50">৫০ MB</option>
                      <option value="100">১০০ MB</option>
                      <option value="500">৫০০ MB</option>
                      <option value="1000">১ GB</option>
                    </select>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="ডেভেলপার অপশন"
                description="অ্যাডভান্সড ব্যবহারকারীদের জন্য"
              >
                <div className="space-y-4">
                  <ToggleSetting
                    label="ডিবাগ মোড"
                    description="ত্রুটি ডিবাগিং এর জন্য"
                    checked={false}
                    onChange={() => {}}
                    disabled
                  />
                  
                  <ToggleSetting
                    label="API লগ"
                    description="API কলগুলো লগ করুন"
                    checked={false}
                    onChange={() => {}}
                    disabled
                  />
                  
                  <Button variant="outline" className="w-full">
                    <Database className="h-4 w-4 mr-2" />
                    ক্যাশ সাফ করুন
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Zap className="h-4 w-4 mr-2" />
                    পারফরমেন্স রিসেট করুন
                  </Button>
                </div>
              </SettingCard>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="shadow-lg">
            <CheckCircle className="h-4 w-4 mr-2" />
            সকল পরিবর্তন সংরক্ষণ করুন
          </Button>
        </div>
      </div>
    </div>
  )
}