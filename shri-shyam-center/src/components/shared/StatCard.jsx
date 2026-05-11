import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StatCard({ title, value, icon: Icon, color = 'primary', trend, trendValue, subtitle }) {
  const colors = {
    primary: { bg: 'bg-[#E8EAF6]', text: 'text-[#1A237E]', icon: 'bg-[#1A237E]' },
    accent: { bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]', icon: 'bg-[#FF6F00]' },
    success: { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', icon: 'bg-[#2E7D32]' },
    warning: { bg: 'bg-[#FFFDE7]', text: 'text-[#F57F17]', icon: 'bg-[#F9A825]' },
    danger: { bg: 'bg-[#FFEBEE]', text: 'text-[#C62828]', icon: 'bg-[#C62828]' },
  };

  const c = colors[color] || colors.primary;

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[#6B7280] font-medium mb-2">{title}</p>
          <p className={cn('text-2xl font-bold font-heading', c.text)}>{value}</p>
          {subtitle && <p className="text-xs text-[#9CA3AF] mt-1">{subtitle}</p>}
          {trendValue !== undefined && (
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend === 'up' ? 'text-[#2E7D32]' : 'text-[#C62828]')}>
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{trendValue}% vs last month</span>
            </div>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', c.icon)}>
          <Icon size={22} className="text-white" />
        </div>
      </div>
    </div>
  );
}
