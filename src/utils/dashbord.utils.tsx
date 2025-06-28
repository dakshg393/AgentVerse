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
    title: 'Health Guide \n Comming Soon',
    icon: Stethoscope,
    href: '/u/dashboard/health',
    color: 'linear-gradient(to right, #10B981, #06D6A0) ',
    tagline: '24/7 medical advice & wellness tips',
  },
  {
    title: 'Legal Expert \n Comming Soon',
    icon: Gavel,
    href: '/u/dashboard/legal',
    color: ' linear-gradient(to right, #2563EB, #3B82F6) ',
    tagline: 'Instant contract reviews & legal insights',
  },
  {
    title: 'EduBot \n Comming Soon',
    icon: BookOpen,
    href: '/u/dashboard/edubot',
    color: 'linear-gradient(to right, #F59E0B, #FBBF24) ',
    tagline: 'Personalized learning for any subject',
  },
  {
    title: 'Finance Genie \n Comming Soon',
    icon: LineChart,
    href: '/u/dashboard/finance',
    color: 'linear-gradient(135deg, #4B5563, #9CA3AF)',
    tagline: 'Smart budgeting, investment tips & tax hacks',
  },
  {
    title: 'Custom AI \n Comming Soon',
    icon: Bot,
    href: '/u/dashboard/custom',
    color: 'linear-gradient(to right, #EC4899, #F472B6) ',
    tagline: 'Build and configure your talking carecter',
  },
];

export { aiServices };
