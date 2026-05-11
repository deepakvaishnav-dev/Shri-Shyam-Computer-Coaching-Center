import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { CourseCard } from '../../components/shared/CourseCard';
import { useCourseStore } from '../../store/courseStore';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  { key: 'all', label: 'All Courses' },
  { key: 'computer', label: 'Computer' },
  { key: 'coaching', label: 'Coaching' },
  { key: 'language', label: 'Language' },
  { key: 'ai', label: 'AI & Technology' },
  { key: 'webdev', label: 'Web Development' },
];

export default function Courses() {
  const { courses, fetchCourses } = useCourseStore();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filtered = courses.filter((c) => {
    const matchCat = category === 'all' || c.category === category;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.nameHindi || '').includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-black font-heading mb-3">Our Courses</h1>
          <p className="text-indigo-200 text-lg">
            Choose from our wide range of government-recognized courses
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D1D5DB] bg-white text-sm focus:outline-none focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all',
                category === cat.key
                  ? 'bg-[#1A237E] text-white shadow-md'
                  : 'bg-white text-[#374151] border border-[#D1D5DB] hover:border-[#1A237E] hover:text-[#1A237E]'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-[#6B7280] mb-6">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-[#9CA3AF]">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm">Try a different category or search term</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
