'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Target, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart,
  Star,
  Shield,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerSections = [
  {
    title: 'প্ল্যাটফর্ম',
    links: [
      { name: 'হোম', href: '/' },
      { name: 'ম্যাচ বিশ্লেষণ', href: '/analysis' },
      { name: 'AI প্রেডিকশন', href: '/predictions' },
      { name: 'লাইভ ম্যাচ', href: '/live' },
      { name: 'ট্রেন্ডস', href: '/trends' },
      { name: 'ড্যাশবোর্ড', href: '/dashboard' }
    ]
  },
  {
    title: 'লিগসমূহ',
    links: [
      { name: 'প্রিমিয়ার লিগ', href: '/leagues/premier-league' },
      { name: 'লা লিগা', href: '/leagues/la-liga' },
      { name: 'সিরি আ', href: '/leagues/serie-a' },
      { name: 'বুন্ডেসলিগা', href: '/leagues/bundesliga' },
      { name: 'লিগ ১', href: '/leagues/ligue-1' },
      { name: 'বাংলাদেশ প্রিমিয়ার লিগ', href: '/leagues/bpl' }
    ]
  },
  {
    title: 'ফিচারসমূহ',
    links: [
      { name: 'AI প্রেডিকশন', href: '/features/ai-predictions' },
      { name: 'ভ্যালু বেট ডিটেক্টর', href: '/features/value-bets' },
      { name: 'রিয়েল-টাইম অ্যানালাইসিস', href: '/features/realtime-analysis' },
      { name: 'পারফরম্যান্স ট্র্যাকার', href: '/features/performance-tracker' },
      { name: 'রিস্ক ম্যানেজার', href: '/features/risk-manager' },
      { name: 'ব্যাঙ্করোল ম্যানেজার', href: '/features/bankroll-manager' }
    ]
  },
  {
    title: 'সাপোর্ট',
    links: [
      { name: 'হেল্প সেন্টার', href: '/help' },
      { name: 'যোগাযোগ', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'টিউটোরিয়াল', href: '/tutorials' },
      { name: 'API ডকুমেন্টেশন', href: '/docs' },
      { name: 'স্ট্যাটাস পেজ', href: '/status' }
    ]
  }
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/footballpredpro', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/footballpredpro', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/footballpredpro', color: 'hover:text-pink-600' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/footballpredpro', color: 'hover:text-red-600' }
]

const features = [
  {
    icon: Target,
    title: '৯৫%+ নির্ভুলতা',
    description: 'AI-চালিত প্রেডিকশন'
  },
  {
    icon: Shield,
    title: 'নিরাপদ ও সুরক্ষিত',
    description: 'এনক্রিপ্টেড ডেটা'
  },
  {
    icon: Clock,
    title: '২৪/৭ সাপোর্ট',
    description: 'সর্বদা উপলব্ধ'
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ফুটবল প্রেডিকশন
                  </h3>
                  <p className="text-sm text-muted-foreground">প্রো</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                কৃত্রিম বুদ্ধিমত্তা এবং বিস্তারিত পরিসংখ্যানের মাধ্যমে ফুটবল ম্যাচের সঠিক পূর্বাভাস ও বেটিং সুপারিশ। 
                রিয়েল-টাইম ডেটা এবং এক্সপার্ট অ্যানালাইসিস সহ।
              </p>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="text-center">
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs font-medium">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <h4 className="font-semibold">নিউজলেটার সাবস্ক্রাইব করুন</h4>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="আপনার ইমেইল"
                    type="email"
                    className="flex-1"
                  />
                  <Button size="sm">
                    সাবস্ক্রাইব
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  সর্বশেষ আপডেট এবং এক্সক্লুসিভ টিপস পান
                </p>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="font-semibold text-foreground">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link 
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="py-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">ইমেইল</p>
                <p className="text-sm text-muted-foreground">support@footballprediction.pro</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">ফোন</p>
                text-sm text-muted-foreground">+880 1234-</p>
              </div<p className="567890>
            </div>
            
            <div className="flex items-center space-x-3">
Name="w-10 h-10 bg-primary/10              <div class rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">অফিস</p>
                <p className="text-sm text-muted-foreground">ঢাকা, বাংলাদেশ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} ফুটবল প্রেডিকশন প্রো। সকল অধিকার সংরক্ষিত।
              </p>
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-muted-foreground">Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-muted-foreground">by MiniMax Agent</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground transition-colors ${social.color}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-4 text-sm">
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  প্রাইভেসি
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  শর্তাবলী
                </Link>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  কুকিস
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-4 border-t">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SSL এনক্রিপ্টেড</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>৪.৯/৫ রেটিং</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>২৪/৭ অনলাইন</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}