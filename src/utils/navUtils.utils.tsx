// utils/navItems.ts
import { Users, History, CreditCard, BarChart2, Settings, LayoutGrid } from 'lucide-react';

const navItems = [
  { title: 'Dashboard', href: '/u/dashboard', icon: LayoutGrid, color: 'blue' },
  { title: 'Sessions', href: '/u/dashboard/sessions', icon: History, color: 'blue' },
  { title: 'Subscription', href: '/u/dashboard/subscription', icon: CreditCard, color: 'blue' },
];

export { navItems };
