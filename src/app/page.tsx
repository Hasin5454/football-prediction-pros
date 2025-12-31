'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  PlayCircle,
  BarChart3,
  Brain,
  Clock,
  Globe,
  Sparkles,
  Activity,
  Award,
  Crown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/use-auth'
import { useMobile } from '@/hooks/use-mobile'

const features = [
  {
    icon: Brain,
    title: 'AI-প্রেডিকশন',
    description: 'মেশিন লার্নিং অ্যালগরিদম দিয়ে ৯৫%+ নির্ভুলতার সাথে ফলাফলের পূর্বাভাস',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: BarChart3,
    title: 'বিস্তারিত বিশ্লেষণ',
    description: 'টিম ফর্ম, হেড টু হেড, খেলোয়াড় স্ট্যাটিস্টিক্স এবং আরও অনেক কিছু',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: TrendingUp,
    title: 'ভ্যালু বেট ডিটেক্টর',
    description: 'স্বয়ংক্রিয়ভাবে লুকানো ভ্যালু বেট খুঁজে বের করুন এবং লাভের সম্ভাবনা বাড়ান',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Activity,
    title: 'রিয়েল-টাইম আপডেট',
    description: 'লাইভ ম্যাচ ডেটা, লাইভ স্কোর এবং তাৎক্ষণিক বিশ্লেষণ',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: Shield,
    title: 'রিস্ক ম্যানেজমেন্ট',
    description: 'কেলি ক্রাইটেরিয়ন এবং ব্যাঙ্করোল ম্যানেজমেন্ট সিস্টেম',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    icon: Globe,
    title: 'গ্লোবাল কভারেজ',
    description: 'বিশ্বের সকল প্রধান লিগ এবং টুর্নামেন্টের ডেটা',
    color: 'from-teal-500 to-cyan-600'
  }
]

const stats = [
  { label: 'মোট ব্যবহারকারী', value: '১০০,০০০+', icon: Users },
  { label: 'সফল প্রেডিকশন', value: '৫০০,০০০+', icon: Target },
  { label: 'গড় নির্ভুলতা', value: '৯৫%+', icon: Trophy },
  { label: 'দৈনিক ম্যাচ', value: '১,০০০+', icon: Clock }
]

const testimonials = [
  {
    name: 'মোহাম্মদ রাহুল',
    role: 'প্রফেশনাল বেটর',
    content: 'এই প্ল্যাটফর্ম ব্যবহার করে আমার বেটিং সফলতা ৮০% বেড়েছে। AI প্রেডিকশন অসাধারণ!',
    rating: 5,
    avatar: '/images/avatar1.jpg'
  },
  {
    name: 'ফাতিমা খাতুন',
    role: 'ফুটবল অ্যানালিস্ট',
    content: 'বিস্তারিত বিশ্লেষণ এবং রিয়েল-টাইম ডেটা দেখে মুগ্ধ। সত্যিই প্রফেশনাল টুল।',
    rating: 5,
    avatar: '/images/avatar2.jpg'
  },
  {
    name: 'আলমগীর হোসেন',
    role: 'স্পোর্টস এনালিস্ট',
    content: 'ভ্যালু বেট ডিটেক্টর ফিচারটা গেম চেঞ্জার। প্রতি মাসে গড়ে ২৫% লাভ হচ্ছে।',
    rating: 5,
    avatar: '/images/avatar3.jpg'
  }
]

const liveMatches = [
  {
    homeTeam: 'ম্যানচেস্টার সিটি',
    awayTeam: 'লিভারপুল',
    score: '2-1',
    minute: '67\'',
    status: 'live',
    league: 'প্রিমিয়ার লিগ'
  },
  {
    homeTeam: 'রিয়েল মাদ্রিদ',
    awayTeam: 'বার্সেলোনা',
    score: '1-1',
    minute: '45\'',
    status: 'live',
    league: 'লা লিগা'
  },
  {
    homeTeam: 'বায়ার্ন মিউনিখ',
    awayTeam: 'বরুসিয়া ডর্টমুন্ড',
    score: '3-0',
    minute: '78\'',
    status: 'live',
    league: 'বুন্ডেসলিগা'
  }
]

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const isMobile = useMobile()
  const [searchTeam1, setSearchTeam1] = useState('')
  const [searchTeam2, setSearchTeam2] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleQuickAnalysis = async () => {
    if (!searchTeam1 || !searchTeam2) return
    
    setIsAnalyzing(true)
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Redirect to analysis page
    window.location.href = `/analysis?team1=${encodeURIComponent(searchTeam1)}&team2=${encodeURIComponent(searchTeam2)}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-চালিত ফুটবল বিশ্লেষণ
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                >
                  <span className="block">স্মার্ট ফুটবল</span>
                  <span className="block bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    প্রেডিকশন
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
                >
                  কৃত্রিম বুদ্ধিমত্তা এবং বিস্তারিত পরিসংখ্যানের মাধ্যমে ফুটবল ম্যাচের 
                  <span className="text-foreground font-semibold"> সঠিক পূর্বাভাস</span> ও 
                  <span className="text-foreground font-semibold"> বেটিং সুপারিশ</span>
                </motion.p>
              </div>

              {/* Quick Analysis Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="হোম দল (যেমন: ব্রাজিল)"
                    value={searchTeam1}
                    onChange={(e) => setSearchTeam1(e.target.value)}
                    className="h-12 px-4 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <input
                    type="text"
                    placeholder="অ্যাওয়ে দল (যেমন: আর্জেন্টিনা)"
                    value={searchTeam2}
                    onChange={(e) => setSearchTeam2(e.target.value)}
                    className="h-12 px-4 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                
                <Button 
                  onClick={handleQuickAnalysis}
                  disabled={isAnalyzing || !searchTeam1 || !searchTeam2}
                  size="lg"
                  className="w-full md:w-auto h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      বিশ্লেষণ করা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-5 w-5" />
                      এখনই বিশ্লেষণ করুন
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Right Content - Live Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-border/50">
                {/* Live Badge */}
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                    লাইভ ড্যাশবোর্ড
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <PlayCircle className="w-4 h-4 mr-1" />
                    ডেমো দেখুন
                  </Button>
                </div>

                {/* Stats Cards */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div>
                      <div className="text-sm text-muted-foreground">আজকের নির্ভুলতা</div>
                      <div className="text-2xl font-bold text-primary">৯২.৫%</div>
                    </div>
                    <div className="w-16 h-16">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--muted))"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="251.2"
                          strokeDashoffset="31.4"
                          className="transition-all duration-1000"
                          style={{
                            strokeDashoffset: 251.2 - (251.2 * 0.925)
                          }}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Live Matches */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">লাইভ ম্যাচ</h3>
                    {liveMatches.map((match, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{match.homeTeam}</div>
                          <div className="text-xs text-muted-foreground">vs {match.awayTeam}</div>
                          <div className="text-xs text-muted-foreground">{match.league}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{match.score}</div>
                          <div className="text-xs text-muted-foreground">{match.minute}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2" />
              এক্সক্লুসিভ ফিচার
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              সবকিছু এক জায়গায়
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              আধুনিক প্রযুক্তি এবং বিশেষজ্ঞ বিশ্লেষণের মাধ্যমে আপনার বেটিং অভিজ্ঞতাকে নতুন উচ্চতায় নিয়ে যান
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 group">
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              আজই শুরু করুন
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              হাজার হাজার সফল ব্যবহারকারীর সাথে যোগ দিন এবং আপনার বেটিং গেম উন্নত করুন
            </p>

            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  <Link href="/auth/register">
                    <Crown className="mr-2 h-5 w-5" />
                    বিনামূল্যে শুরু করুন
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    ডেমো দেখুন
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    ড্যাশবোর্ডে যান
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/analysis">
                    <Target className="mr-2 h-5 w-5" />
                    ম্যাচ বিশ্লেষণ করুন
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              ব্যবহারকারীদের মতামত
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              আমাদের প্ল্যাটফর্ম ব্যবহার করে সফল হওয়া মানুষদের গল্প
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 space-y-4">
                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}