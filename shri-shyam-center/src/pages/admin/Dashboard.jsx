
import { Link } from 'react-router-dom';
import { Users, CreditCard, AlertCircle, BookOpen, Bell, ArrowRight } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { StatCard } from '../../components/shared/StatCard';
import { FeeStatusBadge } from '../../components/shared/FeeStatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle } from '../../components/ui/Card';
import { db } from '../../lib/db';
import { formatCurrency, formatDate } from '../../lib/utils';
import { subMonths, format } from 'date-fns';

const PIE_COLORS = ['#1A237E', '#FF6F00', '#2E7D32', '#F9A825', '#C62828'];

export default function AdminDashboard() {
  const students = db.students.getAll();
  const fees = db.fees.getAll();
  const courses = db.courses.getAll();
  const notices = db.notices.getAll();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const collectedThisMonth = fees
    .filter((f) => f.paid && f.paidDate &&
      new Date(f.paidDate).getMonth() === thisMonth &&
      new Date(f.paidDate).getFullYear() === thisYear)
    .reduce((sum, f) => sum + f.amount, 0);

  const pendingFees = fees.filter((f) => !f.paid).reduce((sum, f) => sum + f.amount, 0);
  const activeCourses = courses.length;

  // Line chart — last 6 months fee collection
  const today = new Date();
  const lineData = Array.from({ length: 6 }, (_, i) => {
    const d = subMonths(today, 5 - i);
    const m = d.getMonth();
    const y = d.getFullYear();
    const collected = fees
      .filter((f) => f.paid && f.paidDate &&
        new Date(f.paidDate).getMonth() === m &&
        new Date(f.paidDate).getFullYear() === y)
      .reduce((sum, f) => sum + f.amount, 0);
    return { month: format(d, 'MMM'), amount: collected };
  });

  // Pie chart — students by course category
  const categoryMap = {};
  students.forEach((s) => {
    (s.enrolledCourses || []).forEach((cid) => {
      const course = courses.find((c) => c.id === cid);
      if (course) {
        categoryMap[course.category] = (categoryMap[course.category] || 0) + 1;
      }
    });
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  // Recent students
  const recentStudents = [...students]
    .sort((a, b) => new Date(b.admissionDate) - new Date(a.admissionDate))
    .slice(0, 5);

  // Pending fees
  const pendingFeesList = fees
    .filter((f) => f.status === 'overdue' || f.status === 'pending')
    .slice(0, 5);

  const recentNotices = [...notices]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-heading text-[#111827]">Dashboard</h1>
        <p className="text-[#6B7280] text-sm mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard title="Total Students" value={students.length} icon={Users} color="primary" />
        <StatCard title="Collected This Month" value={formatCurrency(collectedThisMonth)} icon={CreditCard} color="success" />
        <StatCard title="Pending Fees" value={formatCurrency(pendingFees)} icon={AlertCircle} color="warning" />
        <StatCard title="Active Courses" value={activeCourses} icon={BookOpen} color="accent" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <Card className="lg:col-span-2" padding="md">
          <CardHeader>
            <CardTitle>Fee Collection (Last 6 Months)</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [formatCurrency(v), 'Collected']} contentStyle={{ borderRadius: '0.75rem', border: '1px solid #E5E7EB' }} />
              <Line type="monotone" dataKey="amount" stroke="#1A237E" strokeWidth={3} dot={{ r: 5, fill: '#1A237E' }} activeDot={{ r: 7, fill: '#FF6F00' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Students by Category</CardTitle>
          </CardHeader>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-[#9CA3AF] text-sm py-16">No data available</p>
          )}
        </Card>
      </div>

      {/* Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <Card padding="none">
          <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Link to="/admin/students" className="text-xs text-[#1A237E] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {recentStudents.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#1A237E] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111827] truncate">{s.name}</p>
                  <p className="text-xs text-[#9CA3AF]">{s.id} • {formatDate(s.admissionDate)}</p>
                </div>
                <Badge variant={s.status} dot size="sm">{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Fees */}
        <Card padding="none">
          <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
            <CardTitle>Pending / Overdue Fees</CardTitle>
            <Link to="/admin/fees" className="text-xs text-[#1A237E] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {pendingFeesList.length === 0 ? (
              <p className="text-center text-[#9CA3AF] text-sm py-10">No pending fees 🎉</p>
            ) : (
              pendingFeesList.map((fee) => {
                const student = students.find((s) => s.id === fee.studentId);
                const course = db.courses.getById(fee.courseId);
                return (
                  <div key={fee.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#F9FAFB] transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#111827] truncate">{student?.name || 'Unknown'}</p>
                      <p className="text-xs text-[#9CA3AF] truncate">{course?.name} • Due: {formatDate(fee.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#111827]">{formatCurrency(fee.amount)}</p>
                      <FeeStatusBadge status={fee.status} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>

      {/* Notices */}
      <Card padding="none">
        <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <CardTitle>Recent Notices</CardTitle>
          <Link to="/admin/notices" className="text-xs text-[#1A237E] font-semibold hover:underline flex items-center gap-1">
            Manage <ArrowRight size={12} />
          </Link>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {recentNotices.map((n) => (
            <div key={n.id} className="px-5 py-4 flex items-start gap-3 hover:bg-[#F9FAFB] transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${n.priority === 'urgent' ? 'bg-[#FFEBEE]' : 'bg-[#E8EAF6]'}`}>
                <Bell size={15} className={n.priority === 'urgent' ? 'text-[#C62828]' : 'text-[#1A237E]'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold text-[#111827]">{n.title}</p>
                  <Badge variant={n.priority} size="sm">{n.priority}</Badge>
                </div>
                <p className="text-xs text-[#6B7280] line-clamp-2">{n.body}</p>
              </div>
              <p className="text-xs text-[#9CA3AF] shrink-0">{formatDate(n.date)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
