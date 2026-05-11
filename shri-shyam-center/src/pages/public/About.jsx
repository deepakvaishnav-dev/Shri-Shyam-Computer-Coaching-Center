import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Award, Users, Clock, BookOpen, MapPin } from 'lucide-react';

const team = [
  {
    name: 'Anju Vashisth',
    role: 'Director & Head Faculty',
    phone: '9414332261 | 7014801464',
    bio: 'With 15+ years of experience in computer education and teaching, Anju Ji has been the driving force behind empowering rural students with digital literacy.',
  },
];

const milestones = [
  { year: '2009', event: 'Founded Shri Shyam Computer Center' },
  { year: '2012', event: 'Became official RS-CIT authorized center' },
  { year: '2015', event: 'Launched NIOS Board coaching' },
  { year: '2018', event: '500+ students milestone achieved' },
  { year: '2022', event: 'Launched Web Development & AI courses' },
  { year: '2024', event: '1000+ students successfully placed' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="hero-gradient pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-black font-heading mb-3">About Us</h1>
        <p className="text-indigo-200 text-lg max-w-xl mx-auto">
          Empowering rural Rajasthan with quality education since 2009
        </p>
      </div>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block bg-[#E8EAF6] text-[#1A237E] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
              OUR MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#111827] mb-5">
              Bridging the Digital Divide in Rural India
            </h2>
            <p className="text-[#4B5563] leading-relaxed mb-5">
              Shri Shyam Computer & Coaching Center was established with a single vision — to bring quality computer education and academic coaching to the rural students of Rajasthan who otherwise lack access to these opportunities.
            </p>
            <p className="text-[#4B5563] leading-relaxed mb-6">
              Located in Sadar Bazar, Nagola, Bhinay, Ajmer, we serve students from surrounding villages and towns. Our courses range from basic computer literacy (RS-CIT) to advanced Generative AI and Web Development.
            </p>
            <div className="flex flex-wrap gap-3">
              {['RS-CIT Certified', 'NIOS Board', 'Govt. Recognized', 'ISO Compliant'].map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-[#E8EAF6] text-[#1A237E] text-sm font-semibold rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { icon: Users, value: '1000+', label: 'Students Trained', color: 'primary' },
              { icon: BookOpen, value: '8+', label: 'Courses', color: 'accent' },
              { icon: Clock, value: '15+', label: 'Years Experience', color: 'success' },
              { icon: Award, value: '100%', label: 'Govt. Recognized', color: 'warning' },
            ].map(({ icon: Icon, value, label, color }) => {
              const colors = {
                primary: { bg: 'bg-[#E8EAF6]', text: 'text-[#1A237E]', icon: 'bg-[#1A237E]' },
                accent: { bg: 'bg-[#FFF3E0]', text: 'text-[#E65100]', icon: 'bg-[#FF6F00]' },
                success: { bg: 'bg-[#E8F5E9]', text: 'text-[#2E7D32]', icon: 'bg-[#2E7D32]' },
                warning: { bg: 'bg-[#FFFDE7]', text: 'text-[#F57F17]', icon: 'bg-[#F9A825]' },
              };
              const c = colors[color];
              return (
                <div key={label} className={`${c.bg} rounded-2xl p-6 text-center`}>
                  <div className={`w-11 h-11 ${c.icon} rounded-xl flex items-center justify-center mx-auto mb-3 shrink-0`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <p className={`text-3xl font-black font-heading ${c.text}`}>{value}</p>
                  <p className="text-sm text-[#6B7280] mt-1">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-heading text-[#111827]">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#E5E7EB]" />
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-6 mb-8 relative">
                <div className="w-12 h-12 rounded-full bg-[#1A237E] flex items-center justify-center shrink-0 text-white text-xs font-bold z-10">
                  {m.year.slice(-2)}
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E5E7EB] flex-1">
                  <p className="text-xs font-bold text-[#FF6F00] mb-1">{m.year}</p>
                  <p className="text-sm text-[#374151] font-medium">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-heading text-[#111827]">Our Leadership</h2>
          </div>
          {team.map((member) => (
            <div key={member.name} className="bg-linear-to-br from-[#1A237E] to-[#283593] rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-black shrink-0">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-black font-heading">{member.name}</h3>
                <p className="text-indigo-300 font-medium mb-1">{member.role}</p>
                <p className="text-indigo-200 text-sm mb-3">📞 {member.phone}</p>
                <p className="text-indigo-100 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Head Office */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#E8EAF6] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#1A237E] rounded-xl flex items-center justify-center shrink-0">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold font-heading text-[#111827] mb-1">Head Office</h4>
              <p className="text-sm text-[#4B5563]">
                Shri Vinayak Computer Center, Balaji Chauk, Sabi Mandi, Gulabpura
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
