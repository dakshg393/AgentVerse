import { Brain, Stethoscope, MessageSquare, Scale, Code, Wallet } from 'lucide-react';

const aiServices = [
  {
    title: 'AI Interview  ',
    icon: Brain,
    href: '/dashboard/interviewer',
    color: 'text-blue-500 border-blue-500',
  },
  {
    title: 'AI Health Assistant  \n Comming Soon...',
    icon: Stethoscope,
    href: '/ai-health',
    color: 'text-teal-500 border-teal-500 ',
  },
  {
    title: 'AI Consultant  \n Comming Soon...',
    icon: MessageSquare,
    href: '/ai-consulting',
    color: 'text-purple-500 border-purple-500 ',
  },
  {
    title: 'AI Legal Advisor  \n Comming Soon...',
    icon: Scale,
    href: '/ai-legal',
    color: 'text-amber-500  border-amber-500 ',
  },
  {
    title: 'AI Code Reviewer  \n Comming Soon...',
    icon: Code,
    href: '/ai-code-review',
    color: 'text-pink-500 border-pink-500  ',
  },
  {
    title: 'AI Personal Finance \n Comming Soon...',
    icon: Wallet,
    href: '/ai-finance',
    color: 'text-green-500 border-green-500 ',
  },
];

export { aiServices };
