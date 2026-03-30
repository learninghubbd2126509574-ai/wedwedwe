/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  Smartphone, 
  Users, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data structure for the payment list
const PAYMENT_DATA = [
  {
    category: "১. সিনিয়র টিম লিডার",
    icon: ShieldCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50/50",
    border: "border-indigo-100",
    members: [
      { name: "সায়মা কায়সার", method: "bkash", phone: "01612465402" },
      { name: "ফারহানা কাকলী", method: "bkash", phone: "01921508989" },
    ]
  },
  {
    category: "২. টিম লিডার",
    icon: UserCheck,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    members: [
      { name: "লামিয়া বিথি", method: "bkash", phone: "01911706245" },
      { name: "মারুফ আহমেদ", method: "bkash", phone: "01314459116" },
      { name: "সানজিদা আলম", method: "bkash", phone: "01306715143" },
      { name: "নুরজাহান আক্তার", method: "bkash", phone: "01337994370" },
      { name: "নুজহাত তাবাসসুম সুচি", method: "bkash", phone: "01847714667" },
      { name: "জান্নাত জাহান", method: "bkash", phone: "01307835556" },
      { name: "নাজিয়া রহমান", method: "bkash", phone: "01310939060" },
      { name: "জাকিয়া ইসলাম", method: "bkash", phone: "01759903099" },
      { name: "শায়লা সেতু", method: "bkash", phone: "01965492267" },
      { name: "বৃষ্টি সরকার", method: "nagad", phone: "01862401053" },
      { name: "রকি হাসান", method: "nagad", phone: "01854140785" },
      { name: "রাফি আহমেদ", method: "bkash", phone: "01999626127" },
    ]
  },
  {
    category: "৩. কাউন্সিলর",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    members: [
      { name: "মোছা: মোস্তারিন", method: "bkash", phone: "01757403525" },
      { name: "রাএি আঢ্য", method: "bkash", phone: "01938677177" },
      { name: "ফাহমিদা গুলশানারা", method: "nagad", phone: "01703377223" },
    ]
  },
  {
    category: "৪. শিক্ষক",
    icon: GraduationCap,
    color: "text-violet-600",
    bg: "bg-violet-50/50",
    border: "border-violet-100",
    members: [
      { name: "মোঃ রাফিদ", method: "bkash", phone: "01797789334" },
      { name: "মুনিয়া আঞ্জুমাহ্", method: "bkash", phone: "01521763913" },
      { name: "নাঈমুল ইসলাম নোমান", method: "bkash", phone: "01851932839" },
      { name: "শারমিন আহমেদ", method: "bkash", phone: "01634870433" },
    ]
  },
  {
    category: "৫. টিম ট্রেইনার",
    icon: Smartphone,
    color: "text-slate-700",
    bg: "bg-slate-100/50",
    border: "border-slate-200",
    members: [
      { name: "আয়েশা আক্তার আলো", method: "bkash", phone: "01755786711" },
      { name: "নাহার আক্তার", method: "bkash", phone: "01405600643" },
      { name: "শিমান্ত পল", method: "bkash", phone: "01868142700" },
      { name: "ইসরাত জাহান তিশা", method: "bkash", phone: "01905765626" },
      { name: "মোহাম্মদ সৌমিকুল আমিন", method: "bkash", phone: "01581801041" },
      { name: "সিনথিয়া ইসলাম", method: "bkash", phone: "01827582835" },
      { name: "রিয়া মুনি", method: "bkash", phone: "01821319874" },
      { name: "শিমু আক্তার", method: "bkash", phone: "01400490807" },
      { name: "আবিদা সুলতানা", method: "bkash", phone: "01748164351" },
      { name: "তাসফিহা রিয়া", method: "bkash", phone: "01709455654" },
      { name: "সানজিদা ইসলাম শম্পা", method: "bkash", phone: "01926977366" },
      { name: "সৃষ্টি ইসলাম", method: "nagad", phone: "01898618428" },
      { name: "হাফিজা আক্তার", method: "nagad", phone: "01706013492" },
      { name: "তাহসিন আক্তার", method: "bkash", phone: "01789060824" },
      { name: "ইব্রাহিম", method: "bkash", phone: "01785236185" },
      { name: "মোঃ তুষার ইমরান", method: "bkash", phone: "01723323158" },
      { name: "দোলনা শিল", method: "nagad", phone: "01759156167" },
      { name: "তাসনিয়া নুর", method: "bkash", phone: "01876707099" },
      { name: "ফারহানা আক্তার ফারিহা", method: "nagad", phone: "01622752742" },
      { name: "মারিয়া আক্তার", method: "nagad", phone: "01833558487" },
      { name: "মাসুমা আক্তার", method: "bkash", phone: "01753301618" },
      { name: "মোঃরিজবী", method: "nagad", phone: "01643597054" },
    ]
  }
];

const MethodBadge = ({ method }: { method: string }) => {
  const isBkash = method.toLowerCase() === 'bkash';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
      isBkash 
        ? 'bg-pink-50 text-pink-600 border-pink-100' 
        : 'bg-orange-50 text-orange-600 border-orange-100'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isBkash ? 'bg-pink-500' : 'bg-orange-500'}`}></span>
      {isBkash ? 'bKash' : 'Nagad'}
    </span>
  );
};

const MemberRow = ({ name, method, phone }: { name: string, method: string, phone: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-100 last:border-0"
    >
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg border border-slate-200 overflow-hidden">
            {name.charAt(0)}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${method === 'bkash' ? 'bg-pink-500' : 'bg-orange-500'}`}></div>
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base">{name}</h3>
          <div className="mt-0.5">
            <MethodBadge method={method} />
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between sm:justify-end gap-6">
        <div className="flex flex-col items-end">
          <span className="font-mono text-sm font-semibold text-slate-700 tracking-widest bg-slate-100 px-2 py-1 rounded-md">
            {phone}
          </span>
        </div>
        <button 
          onClick={handleCopy}
          className={`h-10 px-4 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium text-sm shadow-sm ${
            copied 
              ? 'bg-emerald-500 text-white shadow-emerald-200' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-md'
          }`}
        >
          {copied ? <Check size={16} strokeWidth={3} /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </motion.div>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
      <Icon className={color} size={20} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = useMemo(() => {
    let total = 0;
    let bkash = 0;
    let nagad = 0;
    PAYMENT_DATA.forEach(cat => {
      cat.members.forEach(m => {
        total++;
        if (m.method === 'bkash') bkash++;
        else nagad++;
      });
    });
    return { total, bkash, nagad };
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return PAYMENT_DATA;

    const query = searchQuery.toLowerCase();
    return PAYMENT_DATA.map(category => ({
      ...category,
      members: category.members.filter(member => 
        member.name.toLowerCase().includes(query) || 
        member.phone.includes(query) ||
        category.category.toLowerCase().includes(query)
      )
    })).filter(category => category.members.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans selection:bg-indigo-100">
      {/* Top Navigation Bar */}
      <nav className="bg-slate-900 text-white py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-black tracking-tighter text-lg">UNITY PORTAL</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
            <span>Official Directory</span>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            <span>v2.0</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-[1fr_auto] items-end gap-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold mb-4 border border-indigo-100"
              >
                <Info size={14} />
                Verified Payment Methods
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Unity Earning <br />
                <span className="text-indigo-600">E-learning Platform</span>
              </h1>
            </div>

            <div className="w-full md:w-80">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="নাম বা নম্বর দিয়ে খুঁজুন..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-base font-medium placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            <StatCard label="Total Members" value={stats.total} icon={Users} color="text-indigo-600" />
            <StatCard label="bKash Users" value={stats.bkash} icon={Smartphone} color="text-pink-600" />
            <StatCard label="Nagad Users" value={stats.nagad} icon={Smartphone} color="text-orange-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? (
            filteredData.map((section, idx) => (
              <motion.section 
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="mb-14"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border ${section.bg} ${section.border} ${section.color}`}>
                      <section.icon size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-800 tracking-tight">
                        {section.category}
                      </h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                        Official Staff Category
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span>{section.members.length} Active</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
                  <div className="divide-y divide-slate-100">
                    {section.members.map((member, mIdx) => (
                      <MemberRow 
                        key={`${section.category}-${member.phone}-${mIdx}`} 
                        {...member} 
                      />
                    ))}
                  </div>
                </div>
              </motion.section>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-slate-400"
            >
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                <Search size={40} className="opacity-40" />
              </div>
              <p className="text-2xl font-black text-slate-800">কোনো তথ্য পাওয়া যায়নি</p>
              <p className="text-slate-500 mt-2 font-medium">অনুগ্রহ করে সঠিক নাম বা নম্বর দিয়ে পুনরায় চেষ্টা করুন</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                সবগুলো তালিকা দেখুন
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                  <GraduationCap size={24} />
                </div>
                <span className="text-2xl font-black tracking-tighter">UNITY PORTAL</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed font-medium">
                একটি আধুনিক এবং গতিশীল ই-লার্নিং প্ল্যাটফর্ম যা আপনার ক্যারিয়ার গঠনে সহায়তা করে। আমাদের সাথে যুক্ত থাকুন।
              </p>
            </div>
            
            <div className="flex flex-col md:items-end gap-6">
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all border border-slate-700">
                  <ExternalLink size={20} />
                </a>
              </div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                © 2026 Unity Earning. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
