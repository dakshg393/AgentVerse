// utils/navItems.ts
import { Users, History, CreditCard, BarChart2, Settings, LayoutGrid } from 'lucide-react';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid, color: 'blue' },
  { title: 'Sessions', href: '/session', icon: History, color: 'blue' },
  { title: 'Subscription', href: '/subscription', icon: CreditCard, color: 'blue' },
];

export { navItems };
