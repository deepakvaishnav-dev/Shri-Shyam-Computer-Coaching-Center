
import { Link } from 'react-router-dom';
import { BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../lib/db';
import { formatDate, formatCurrency } from '../../lib/utils';
import { FeeStatusBadge } from '../../components/shared/FeeStatusBadge';
import { Badge } from '../../components/ui/Badge';
import { isWithinInterval, addDays } from 'date-fns';

export default function StudentDashboard() {
  const { studentId } = useAuthStore();
  const student = db.students.getById(studentId);
  const fees = db.fees.getByStudent(studentId);
  const courses = db.courses.getAll();
  const notices = db.notices.getAll().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  const totalFee = fees.reduce((s, f) => s + f.amount, 0);
  const paidFee = fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const pendingFee = totalFee - paidFee;

  const enrolledCourses = (student?.enrolledCourses || [])
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean);

  // Upcoming dues within 7 days
  const upcomingDues = fees.filter((f) => {
    if (f.paid) return false;
    const due = new Date(f.dueDate);
    const now = new Date();
    return isWithinInterval(due, { start: now, end: addDays(now, 7) });
  });

  // Recent fee activity
  const recentFees = [...fees]
    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
    .slice(0, 5);

  if (!student) return (
    <div className="text-center py-16 text-[#9CA3AF]">
      <p>Student profile not found.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Upcoming Due Alert */}
      {upcomingDues.length > 0 && (
        <div className="bg-[#FFFDE7] border border-[#F9A825]/30 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-[#F9A825] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#111827] text-sm">Fee Due Soon!</p>
            <p className="text-sm text-[#6B7280]">
              You have {upcomingDues.length} fee payment(s) due within the next 7 days.{' '}
              <Link to="/student/fees" className="text-[#FF6F00] font-semibold hover:underline">View Details →</Link>
            </p>
          </div>
        </div>
      )}

      {/* Welcome Card */}
      <div className="bg-linear-to-br from-[#1A237E] to-[#283593] rounded-3xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-black">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="text-indigo-300 text-sm">Welcome back,</p>
            <h2 className="text-xl font-black font-heading">{student.name}</h2>
            <p className="text-indigo-200 text-sm">{student.id} • Enrolled: {formatDate(student.admissionDate)}</p>
          </div>
          <Badge variant={student.status} dot>{student.status}</Badge>
        </div>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
          <p className="text-xs text-[#9CA3AF] font-medium mb-1">Total Fees</p>
          <p className="text-2xl font-black text-[#111827] font-heading">{formatCurrency(totalFee)}</p>
        </div>
        <div className="bg-[#E8F5E9] rounded-2xl p-5">
          <p className="text-xs text-[#6B7280] font-medium mb-1">Paid</p>
          <p className="text-2xl font-black text-[#2E7D32] font-heading">{formatCurrency(paidFee)}</p>
        </div>
        <div className="bg-[#FFEBEE] rounded-2xl p-5">
          <p className="text-xs text-[#6B7280] font-medium mb-1">Pending</p>
          <p className="text-2xl font-black text-[#C62828] font-heading">{formatCurrency(pendingFee)}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enrolled Courses */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="p-5 border-b border-[#F3F4F6] flex items-center justify-between">
            <h3 className="font-bold text-[#111827] font-heading">My Courses</h3>
            <Link to="/student/courses" className="text-xs text-[#1A237E] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#F9FAFB]">
            {enrolledCourses.map((c) => (
              <div key={c.id} className="p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8EAF6] flex items-center justify-center shrink-0">
                  <BookOpen size={16} className="text-[#1A237E]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{c.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{c.duration} • {formatCurrency(c.fee)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Fee Activity */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="p-5 border-b border-[#F3F4F6] flex items-center justify-between">
            <h3 className="font-bold text-[#111827] font-heading">Recent Fees</h3>
            <Link to="/student/fees" className="text-xs text-[#1A237E] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#F9FAFB]">
            {recentFees.map((f) => {
              const course = courses.find((c) => c.id === f.courseId);
              return (
                <div key={f.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${f.status === 'paid' ? 'bg-[#2E7D32]' : f.status === 'overdue' ? 'bg-[#C62828]' : 'bg-[#F9A825]'}`} />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">{f.month} {f.year}</p>
                      <p className="text-xs text-[#9CA3AF]">{course?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#111827]">{formatCurrency(f.amount)}</p>
                    <FeeStatusBadge status={f.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
          <div className="p-5 border-b border-[#F3F4F6]">
            <h3 className="font-bold text-[#111827] font-heading">Notices</h3>
          </div>
          <div className="divide-y divide-[#F9FAFB]">
            {notices.length === 0 ? (
              <p className="text-center text-[#9CA3AF] text-sm py-8">No notices</p>
            ) : notices.map((n) => (
              <div key={n.id} className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#111827]">{n.title}</p>
                  {n.priority === 'urgent' && <Badge variant="urgent" size="sm">Urgent</Badge>}
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-2">{n.body}</p>
                <p className="text-xs text-[#9CA3AF] mt-1">{formatDate(n.date)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
