import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Phone, MapPin,
  BookOpen, Award, Users, Clock, Zap,
  ChevronRight, Shield
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CourseCard } from '../../components/shared/CourseCard';
import { useCourseStore } from '../../store/courseStore';

const testimonials = [
  {
    name: 'Rajesh Gurjar',
    role: 'RS-CIT Graduate, 2023',
    text: 'The RS-CIT course changed my life. I got a government job because of the computer knowledge I gained here.',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'NIOS Student, 2024',
    text: 'I passed my 12th class through NIOS at age 35. The teachers were very supportive and understanding.',
    rating: 5,
  },
  {
    name: 'Amit Saini',
    role: 'Web Dev Student, 2024',
    text: 'Best web development course in Ajmer district. I now freelance and earn from home. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Kavita Meena',
    role: 'English Spoken, 2024',
    text: 'My spoken English improved dramatically in just 2 months. The teaching method is very practical.',
    rating: 5,
  },
];

const features = [
  { icon: Award, title: 'Government Recognized', desc: 'RS-CIT certified center approved by Rajasthan government. Official NIOS board center.' },
  { icon: Users, title: 'Expert Faculty', desc: 'Experienced teachers with 15+ years of teaching excellence in computer education.' },
  { icon: Clock, title: 'Flexible Timings', desc: 'Morning and evening batches available to suit students of all age groups.' },
  { icon: Zap, title: 'Modern Curriculum', desc: 'Updated courses including AI, Web Development alongside traditional computer courses.' },
];

export default function Home() {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const featured = courses.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="hero-gradient pt-20 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Marquee */}
          <div className="mb-10 overflow-hidden bg-white/10 rounded-full py-2">
            <div className="marquee-track">
              {[...Array(2)].map((_, ri) => (
                <div key={ri} className="flex items-center gap-8 px-8 whitespace-nowrap">
                  {['🏆 RS-CIT Certified Center', '🏛️ Govt. Recognized', '👩‍🎓 1000+ Students Passed', '📍 Ajmer, Rajasthan', '🌟 15+ Years Experience', '📱 AI & Technology Courses', '🇮🇳 NIOS Board Center'].map((item) => (
                    <span key={item} className="text-white/90 text-sm font-medium flex items-center gap-2">
                      {item}
                      <span className="text-[#FF6F00]">•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium text-white mb-6">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                Now Enrolling – Summer Batch 2024
              </div>
              <p className="font-hindi text-xl text-indigo-200 mb-3">
                श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading leading-tight mb-5">
                Empowering
                <span className="block text-[#FF6F00]">Rural Rajasthan</span>
                with Quality Education
              </h1>
              <p className="text-lg text-indigo-200 leading-relaxed mb-8 max-w-xl">
                From RS-CIT to Generative AI — we offer government-recognized courses that transform rural students into skilled professionals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-[#FF6F00] text-white font-bold rounded-xl hover:bg-[#E65100] transition-all hover:-translate-y-0.5 shadow-lg text-sm sm:text-base"
                >
                  Enroll Now <ArrowRight size={16} />
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm sm:text-base"
                >
                  View Courses
                </Link>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white text-[#1A237E] font-bold rounded-xl hover:bg-indigo-50 transition-all text-sm sm:text-base"
                >
                  Student Login
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Users, value: '1000+', label: 'Students Enrolled', color: '#FF6F00' },
                { icon: BookOpen, value: '8+', label: 'Courses Offered', color: '#4CAF50' },
                { icon: Award, value: '15+', label: 'Years Experience', color: '#9C27B0' },
                { icon: Star, value: '4.9/5', label: 'Student Rating', color: '#F9A825' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 sm:p-6 text-center text-white">
                  <s.icon size={22} className="mx-auto mb-2 sm:mb-3" style={{ color: s.color }} />
                  <p className="text-2xl sm:text-3xl font-black font-heading" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-indigo-200 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Courses ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#E8EAF6] text-[#1A237E] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              OUR COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#111827]">
              Start Your Learning Journey
            </h2>
            <p className="text-[#6B7280] mt-3 max-w-xl mx-auto">
              Government-recognized courses designed for students of all backgrounds in rural Rajasthan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A237E] text-white font-semibold rounded-xl hover:bg-[#0D1453] transition-colors"
            >
              View All Courses <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Summer Special Banner ─── */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-[#FF6F00] to-[#FF8F00]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-3">
              🌞 SUMMER SPECIAL BATCH
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading">
              English Spoken — Summer Batch 2024
            </h3>
            <p className="text-amber-100 mt-2">
              Intensive 2-month spoken English course. Limited seats. Starting May 15, 2024!
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="text-center">
              <p className="text-4xl font-black">₹1,500</p>
              <p className="text-sm text-amber-100">Total Course Fee</p>
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-[#FF6F00] font-bold rounded-xl hover:bg-amber-50 transition-colors"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFF3E0] text-[#E65100] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#111827]">
              Your Success is Our Mission
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#E8EAF6] flex items-center justify-center mx-auto mb-4">
                  <Icon size={26} className="text-[#1A237E]" />
                </div>
                <h4 className="font-bold font-heading text-[#111827] mb-2">{title}</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NIOS Section ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-linear-to-br from-[#1A237E] to-[#283593] rounded-3xl p-10 text-white">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-block bg-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5">
                  NIOS BOARD CENTER
                </span>
                <h2 className="text-3xl font-black font-heading mb-4">
                  NIOS 10th & 12th Admission Open
                </h2>
                <p className="text-indigo-200 leading-relaxed mb-6">
                  National Institute of Open Schooling (NIOS) is a flexible education board ideal for working adults, dropouts, and learners of all ages. Get your 10th or 12th certificate from home.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'No age bar — anyone can appear',
                    'October & April sessions',
                    'Choose your own subjects',
                    'On-demand examination facility',
                    'Recognized by all universities',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-indigo-100">
                      <CheckCircle size={16} className="text-[#4CAF50] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6F00] text-white font-bold rounded-xl hover:bg-[#E65100] transition-colors"
                >
                  Get Admission Info <ChevronRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Session', value: 'Oct & Apr' },
                  { label: 'Duration', value: '6 Months' },
                  { label: 'Fee (10th)', value: '₹2,500' },
                  { label: 'Fee (12th)', value: '₹2,800' },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-2xl p-5 text-center">
                    <p className="text-2xl font-black text-[#FF6F00]">{item.value}</p>
                    <p className="text-sm text-indigo-200 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#E8EAF6] text-[#1A237E] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#111827]">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card-hover bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-sm flex flex-col">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F9A825" className="text-[#F9A825]" />
                  ))}
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1A237E] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{t.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Strip ─── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="contact-strip">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 bg-[#E8EAF6] rounded-2xl">
              <div className="w-11 h-11 bg-[#1A237E] rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-1">Our Address</h4>
                <p className="text-sm text-[#6B7280]">Sadar Bazar, Nagola, Teh. Bhinay, Ajmer, Rajasthan</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#FFF3E0] rounded-2xl">
              <div className="w-11 h-11 bg-[#FF6F00] rounded-xl flex items-center justify-center shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-1">Call Us</h4>
                <p className="text-sm text-[#6B7280]">9950669970 | 8619494994</p>
                <p className="text-sm text-[#6B7280]">Director: 9414332261</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#E8F5E9] rounded-2xl">
              <div className="w-11 h-11 bg-[#2E7D32] rounded-xl flex items-center justify-center shrink-0">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-[#111827] mb-1">Certifications</h4>
                <p className="text-sm text-[#6B7280]">RS-CIT Certified • NIOS Board<br />Govt. of Rajasthan Recognized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
