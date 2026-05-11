import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff, User, Phone, MapPin, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../lib/db';
import { changePasswordSchema } from '../../lib/validators';
import { formatDate } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardTitle } from '../../components/ui/Card';
import { useToast } from '../../hooks/useToast';

export default function Profile() {
  const { user, studentId } = useAuthStore();
  const student = db.students.getById(studentId);
  const courses = db.courses.getAll();
  const [showPwd, setShowPwd] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    const dbUser = db.users.getByEmail(user.email);
    if (!dbUser || dbUser.password !== data.currentPassword) {
      toast({ message: 'Current password is incorrect', type: 'error' });
      return;
    }
    db.users.update(dbUser.id, { password: data.newPassword });
    toast({ message: 'Password changed successfully!', type: 'success' });
    reset();
  };

  if (!student) return <p className="text-[#9CA3AF] text-center py-16">Profile not found.</p>;

  const enrolledCourses = (student.enrolledCourses || [])
    .map((cid) => courses.find((c) => c.id === cid))
    .filter(Boolean);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-black font-heading text-[#111827]">My Profile</h1>
      </div>

      {/* Profile Card */}
      <Card padding="none">
        <div className="p-6 border-b border-[#F3F4F6] flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-[#1A237E] flex items-center justify-center text-white text-3xl font-black shrink-0">
            {student.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-black font-heading text-[#111827]">{student.name}</h2>
            <p className="text-[#6B7280] text-sm">{student.id}</p>
            <Badge variant={student.status} dot size="sm" className="mt-2">{student.status}</Badge>
          </div>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-5">
          {[
            { icon: User, label: 'Email', value: student.email },
            { icon: Phone, label: 'Phone', value: student.phone },
            { icon: User, label: "Father's Name", value: student.fatherName },
            { icon: Calendar, label: 'Date of Birth', value: formatDate(student.dob) },
            { icon: User, label: 'Gender', value: student.gender },
            { icon: Calendar, label: 'Admission Date', value: formatDate(student.admissionDate) },
            { icon: MapPin, label: 'Address', value: student.address },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8EAF6] flex items-center justify-center shrink-0">
                <Icon size={14} className="text-[#1A237E]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wide">{label}</p>
                <p className="text-sm text-[#111827] font-medium">{value || '—'}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enrolled Courses */}
      <Card padding="md">
        <CardTitle className="mb-4">Enrolled Courses</CardTitle>
        <div className="space-y-2">
          {enrolledCourses.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
              <div>
                <p className="text-sm font-semibold text-[#111827]">{c.name}</p>
                {c.nameHindi && <p className="font-hindi text-xs text-[#6B7280]">{c.nameHindi}</p>}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#1A237E]">₹{c.fee.toLocaleString('en-IN')}</p>
                <p className="text-xs text-[#9CA3AF]">{c.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Change Password */}
      <Card padding="md">
        <CardTitle className="mb-4">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#1A237E]" />
            Change Password
          </div>
        </CardTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <Input
            label="Current Password"
            type={showPwd ? 'text' : 'password'}
            required
            error={errors.currentPassword?.message}
            rightIcon={
              <button type="button" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            {...register('currentPassword')}
          />
          <Input
            label="New Password"
            type="password"
            required
            error={errors.newPassword?.message}
            {...register('newPassword')}
          />
          <Input
            label="Confirm New Password"
            type="password"
            required
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" size="md" loading={isSubmitting}>
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
