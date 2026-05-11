import { GraduationCap, Phone, MapPin, Mail, Shield } from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black font-heading text-[#111827]">Settings</h1>
        <p className="text-[#6B7280] text-sm">Institute information and configuration</p>
      </div>

      <Card padding="md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1A237E] flex items-center justify-center">
            <GraduationCap size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black font-heading text-[#111827]">Shri Shyam Computer & Coaching Center</h2>
            <p className="font-hindi text-sm text-[#6B7280]">श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: MapPin, label: 'Address', value: 'Sadar Bazar, Nagola, Teh. Bhinay, Ajmer, Rajasthan' },
            { icon: Phone, label: 'Contact', value: '9950669970 | 8619494994' },
            { icon: Mail, label: 'Email', value: 'admin@shrishyam.com' },
            { icon: Shield, label: 'Certifications', value: 'RS-CIT Certified | NIOS Board | Govt. Recognized' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 p-3 bg-[#F9FAFB] rounded-xl">
              <Icon size={18} className="text-[#1A237E] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wide">{label}</p>
                <p className="text-sm text-[#111827] font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="md">
        <CardTitle className="mb-4">Director Information</CardTitle>
        <div className="space-y-3">
          {[
            ['Name', 'Anju Vashisth'],
            ['Phone', '9414332261 | 7014801464'],
            ['Head Office', 'Shri Vinayak Computer Center, Balaji Chauk, Sabi Mandi, Gulabpura'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-[#F3F4F6] last:border-0">
              <span className="text-sm text-[#6B7280] font-medium">{label}</span>
              <span className="text-sm text-[#111827] font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card padding="md">
        <CardTitle className="mb-4">System Information</CardTitle>
        <div className="space-y-3">
          {[
            ['Version', '1.0.0'],
            ['Database', 'LocalStorage (Browser)'],
            ['Framework', 'React 18 + Vite 5'],
            ['Auth', 'Role-based (Admin / Student)'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-[#F3F4F6] last:border-0">
              <span className="text-sm text-[#6B7280] font-medium">{label}</span>
              <span className="text-sm text-[#111827] font-mono">{value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
