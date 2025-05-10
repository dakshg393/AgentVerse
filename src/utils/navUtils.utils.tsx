// utils/navItems.ts
import { Users, History, CreditCard, BarChart2, Settings, LayoutGrid } from 'lucide-react';

const navItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid, color: 'blue' },
  { title: 'Sessions', href: '/dashboard/sessions', icon: History, color: 'blue' },
  { title: 'Subscription', href: '/dashboard/subscription', icon: CreditCard, color: 'blue' },
];

export { navItems };
