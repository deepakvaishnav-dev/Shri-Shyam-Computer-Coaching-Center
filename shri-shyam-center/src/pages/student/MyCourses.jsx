import { Clock, IndianRupee, BookOpen } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../lib/db';
import { formatCurrency } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';

const CATEGORY_LABELS = { computer: 'Computer', coaching: 'Coaching', language: 'Language', ai: 'AI & Technology', webdev: 'Web Development' };
const CATEGORY_COLORS = { computer: 'primary', coaching: 'accent', language: 'success', ai: 'warning', webdev: 'danger' };

export default function MyCourses() {
  const { studentId } = useAuthStore();
  const student = db.students.getById(studentId);
  const courses = db.courses.getAll();

  const enrolledCourses = (student?.enrolledCourses || [])
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-heading text-[#111827]">My Courses</h1>
        <p className="text-[#6B7280] text-sm">{enrolledCourses.length} enrolled course{enrolledCourses.length !== 1 ? 's' : ''}</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-16 text-[#9CA3AF]">
          <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">You're not enrolled in any courses yet.</p>
          <p className="text-sm">Contact us to enroll: 9950669970</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col card-hover">
              <div className="h-2 bg-linear-to-r from-[#1A237E] to-[#FF6F00]" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={CATEGORY_COLORS[course.category] || 'default'} size="sm">
                    {CATEGORY_LABELS[course.category] || course.category}
                  </Badge>
                  <Badge variant="active" dot size="sm">Enrolled</Badge>
                </div>
                <h3 className="text-base font-bold text-[#111827] font-heading mb-1">{course.name}</h3>
                {course.nameHindi && (
                  <p className="font-hindi text-xs text-[#6B7280] mb-3">{course.nameHindi}</p>
                )}
                <p className="text-xs text-[#6B7280] leading-relaxed mb-5 flex-1">{course.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-xl p-3">
                    <Clock size={14} className="text-[#1A237E]" />
                    <div>
                      <p className="text-xs text-[#9CA3AF]">Duration</p>
                      <p className="text-xs font-semibold text-[#111827]">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FFF3E0] rounded-xl p-3">
                    <IndianRupee size={14} className="text-[#FF6F00]" />
                    <div>
                      <p className="text-xs text-[#9CA3AF]">Fee</p>
                      <p className="text-xs font-semibold text-[#E65100]">{formatCurrency(course.fee)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
