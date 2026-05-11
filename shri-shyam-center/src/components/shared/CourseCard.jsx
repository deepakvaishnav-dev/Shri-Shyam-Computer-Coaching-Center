import { Link } from 'react-router-dom';
import { Clock, IndianRupee, Users } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../lib/utils';

const categoryLabels = {
  computer: 'Computer',
  coaching: 'Coaching',
  language: 'Language',
  ai: 'AI & Technology',
  webdev: 'Web Development',
};

const categoryColors = {
  computer: 'primary',
  coaching: 'accent',
  language: 'success',
  ai: 'warning',
  webdev: 'danger',
};

export function CourseCard({ course, showEnroll = true }) {
  const spotsLeft = course.seats - (course.enrolled || 0);

  return (
    <div className="card-hover bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header Bar */}
      <div className="h-2 bg-linear-to-r from-[#1A237E] to-[#FF6F00]" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Fee */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant={categoryColors[course.category] || 'default'} size="sm">
            {categoryLabels[course.category] || course.category}
          </Badge>
          <div className="flex items-center gap-1 text-[#FF6F00] font-bold text-sm">
            <IndianRupee size={14} />
            {formatCurrency(course.fee).replace('₹', '')}
          </div>
        </div>

        {/* Course Name */}
        <h3 className="text-base font-bold text-[#111827] font-heading mb-1 line-clamp-2">
          {course.name}
        </h3>
        {course.nameHindi && (
          <p className="font-hindi text-sm text-[#6B7280] mb-2">{course.nameHindi}</p>
        )}

        {/* Description */}
        <p className="text-xs text-[#6B7280] leading-relaxed mb-4 flex-1 line-clamp-3">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-4">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} />
            {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}
          </span>
        </div>

        {/* CTA */}
        {showEnroll && (
          <Link
            to="/contact"
            className="block w-full text-center py-2.5 bg-[#1A237E] text-white text-sm font-semibold rounded-xl hover:bg-[#0D1453] transition-colors"
          >
            Enroll Now
          </Link>
        )}
      </div>
    </div>
  );
}
