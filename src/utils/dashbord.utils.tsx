import { BookOpen, Bot, Gavel, LineChart, Mic, Stethoscope } from 'lucide-react';

const aiServices = [
  {
    title: 'Interview Pro',
    icon: Mic,
    href: '/u/dashboard/interviewer',
    color: 'linear-gradient(to right, #4F46E5, #7C3AED)',
    tagline: 'Nail your dream job with mock interviews & feedback',
  },
  {
    title: 'Health Guide',
    icon: Stethoscope,
    href: '/ai-health',
    color: 'linear-gradient(to right, #10B981, #06D6A0) ',
    tagline: '24/7 medical advice & wellness tips',
  },
  {
    title: 'Legal Expert',
    icon: Gavel,
    href: '/ai-consulting',
    color: ' linear-gradient(to right, #2563EB, #3B82F6) ',
    tagline: 'Instant contract reviews & legal insights',
  },
  {
    title: 'EduBot',
    icon: BookOpen,
    href: '/ai-legal',
    color: 'linear-gradient(to right, #F59E0B, #FBBF24) ',
    tagline: 'Personalized learning for any subject',
  },
  {
    title: 'Finance Genie',
    icon: LineChart,
    href: '/ai-code-review',
    color: 'linear-gradient(135deg, #4B5563, #9CA3AF)',
    tagline: 'Smart budgeting, investment tips & tax hacks',
  },
  {
    title: 'Custom AI',
    icon: Bot,
    href: '/ai-finance',
    color: 'linear-gradient(to right, #EC4899, #F472B6) ',
    tagline: 'Build and configure your talking carecter',
  },
];

export { aiServices };
