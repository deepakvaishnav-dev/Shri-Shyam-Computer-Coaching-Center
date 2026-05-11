import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { loginSchema } from '../../lib/validators';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    const result = login(data.email, data.password);
    if (!result.success) {
      setError('root', { message: result.message });
      toast({ message: result.message, type: 'error' });
      return;
    }
    toast({ message: 'Login successful! Welcome back.', type: 'success' });
    navigate(result.role === 'admin' ? '/admin' : '/student', { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-center text-white max-w-md">
          <div className="w-20 h-20 rounded-3xl bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-8">
            <GraduationCap size={44} className="text-white" />
          </div>
          <h1 className="text-4xl font-black font-heading mb-3">
            Shri Shyam Center
          </h1>
          <p className="font-hindi text-xl mb-6 text-blue-200">
            श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर
          </p>
          <p className="text-blue-100 text-base leading-relaxed mb-8">
            Empowering Rural Rajasthan with Quality Education & Technology
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '1000+', label: 'Students' },
              { value: '8+', label: 'Courses' },
              { value: '15+', label: 'Years' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <p className="text-2xl font-black text-[#FF6F00]">{s.value}</p>
                <p className="text-xs text-blue-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-[#F9FAFB]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#1A237E] flex items-center justify-center">
              <GraduationCap size={26} className="text-white" />
            </div>
            <div>
              <p className="font-bold font-heading text-[#1A237E] text-lg">Shri Shyam Center</p>
              <p className="text-xs text-[#6B7280]">Computer & Coaching Center</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-[#111827] font-heading">Welcome Back</h2>
              <p className="text-[#6B7280] text-sm mt-1">Sign in to your account to continue</p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-[#E8EAF6] rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-[#1A237E] mb-2">🔑 Demo Credentials</p>
              <div className="space-y-1 text-xs text-[#374151]">
                <p><strong>Admin:</strong> admin@shrishyam.com / admin123</p>
                <p><strong>Student:</strong> student1@shrishyam.com / student123</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                required
                leftIcon={<Mail size={16} />}
                error={errors.email?.message}
                {...register('email')}
              />
              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  leftIcon={<Lock size={16} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="text-[#9CA3AF] hover:text-[#374151]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              {errors.root && (
                <div className="bg-[#FFEBEE] text-[#C62828] text-sm p-3 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {errors.root.message}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={isSubmitting}
                rightIcon={<ArrowRight size={18} />}
              >
                Sign In
              </Button>
            </form>

            <p className="text-center text-sm text-[#6B7280] mt-6">
              Want to enroll?{' '}
              <Link to="/contact" className="text-[#1A237E] font-semibold hover:text-[#FF6F00] transition-colors">
                Contact Us
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-[#9CA3AF] mt-6">
            © {new Date().getFullYear()} Shri Shyam Computer & Coaching Center
          </p>
        </div>
      </div>
    </div>
  );
}
