'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Brain,
  User,
  CheckCircle,
  Loader2,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Award,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'প্রথম নাম আবশ্যক'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'শেষ নাম আবশ্যক'
    }

    if (!formData.email) {
      newErrors.email = 'ইমেইল আবশ্যক'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'সঠিক ইমেইল দিন'
    }

    if (!formData.password) {
      newErrors.password = 'পাসওয়ার্ড আবশ্যক'
    } else if (formData.password.length < 8) {
      newErrors.password = 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'পাসওয়ার্ডে কমপক্ষে একটি বড় অক্ষর, ছোট অক্ষর এবং সংখ্যা থাকতে হবে'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড নিশ্চিত করুন'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'পাসওয়ার্ড মিলছে না'
    }

    if (!agreeTerms) {
      newErrors.terms = 'আপনাকে নীতিমালা মেনে নিতে হবে'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard or email verification
      router.push('/dashboard')
    }, 2000)
  }

  const features = [
    {
      icon: Brain,
      title: 'AI-চালিত প্রেডিকশন',
      description: 'মেশিন লার্নিং দিয়ে ৯৫%+ নির্ভুলতা'
    },
    {
      icon: Target,
      title: 'ভ্যালু বেট ডিটেক্টর',
      description: 'লুকানো ভ্যালু বেট খুঁজে বের করুন'
    },
    {
      icon: TrendingUp,
      title: 'পারফরমেন্স ট্র্যাকিং',
      description: 'বিস্তারিত পরিসংখ্যান এবং বিশ্লেষণ'
    },
    {
      icon: Zap,
      title: 'রিয়েল-টাইম আপডেট',
      description: 'লাইভ ম্যাচ ডেটা এবং তাৎক্ষণিক বিশ্লেষণ'
    }
  ]

  const benefits = [
    'বিনামূল্যে ৭ দিনের ট্রায়াল',
    '১০০+ লিগের ডেটা অ্যাক্সেস',
    'উন্নত বিশ্লেষণ টুলস',
    'মোবাইল অ্যাপ সাপোর্ট',
    '২৪/৭ কাস্টমার সাপোর্ট',
    'প্রিমিয়াম বিশ্লেষণ রিপোর্ট'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Logo and Title */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">
              অ্যাকাউন্ট তৈরি করুন
            </h2>
            <p className="text-gray-300">
              AI-চালিত ফুটবল প্রেডিকশনের জগতে যোগ দিন
            </p>
          </div>

          {/* Registration Form */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">
                নতুন অ্যাকাউন্ট রেজিস্টার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      প্রথম নাম
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="আপনার প্রথম নাম"
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      শেষ নাম
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="আপনার শেষ নাম"
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    ইমেইল ঠিকানা
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="pl-9 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    পাসওয়ার্ড নিশ্চিত করুন
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-300 leading-relaxed">
                    আমি{' '}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                      সেবার নীতিমালা
                    </Link>
                    {' '}এবং{' '}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                      গোপনীয়তা নীতি
                    </Link>
                    {' '}মেনে নিচ্ছি
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-400">{errors.terms}</p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      অ্যাকাউন্ট তৈরি হচ্ছে...
                    </>
                  ) : (
                    <>
                      অ্যাকাউন্ট তৈরি করুন
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                      লগইন করুন
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex items-center justify-center px-8"
        >
          <div className="max-w-lg">
            <h2 className="text-4xl mb-6 font-bold text-white">
              বিনামূল্যে শুরু করুন আজই{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI প্রেডিকশন
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8">
              হাজার হাজার সফল ব্যবহারকারীর সাথে যোগ দিন এবং আপনার ফুটবল বেটিং অভিজ্ঞতা নতুন উচ্চতায় নিয়ে যান।
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-400" />
                আপনার সুবিধা সমূহ
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">৯৫%+</div>
                <div className="text-xs text-gray-400">নির্ভুলতা</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">১০০K+</div>
                <div className="text-xs text-gray-400">ব্যবহারকারী</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">৫০০K+</div>
                <div className="text-xs text-gray-400">সফল প্রেডিকশন</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}