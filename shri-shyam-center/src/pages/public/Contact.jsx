import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, MapPin, Clock, Send, User } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Input, Textarea } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { contactSchema } from '../../lib/validators';
import { db } from '../../lib/db';
import { generateId } from '../../lib/utils';
import { useToast } from '../../hooks/useToast';

const contactInfo = [
  { icon: MapPin, title: 'Address', lines: ['Sadar Bazar, Nagola', 'Teh. Bhinay, Ajmer', 'Rajasthan – 305 624'], color: 'bg-[#E8EAF6] text-[#1A237E]', iconBg: 'bg-[#1A237E]' },
  { icon: Phone, title: 'Phone Numbers', lines: ['9950669970', '8619494994', 'Director: 9414332261', '7014801464'], color: 'bg-[#FFF3E0] text-[#E65100]', iconBg: 'bg-[#FF6F00]' },
  { icon: Clock, title: 'Working Hours', lines: ['Mon–Sat: 8:00 AM – 8:00 PM', 'Sunday: 9:00 AM – 2:00 PM'], color: 'bg-[#E8F5E9] text-[#2E7D32]', iconBg: 'bg-[#2E7D32]' },
  { icon: User, title: 'Director', lines: ['Anju Vashisth', '9414332261 | 7014801464'], color: 'bg-[#FFFDE7] text-[#F57F17]', iconBg: 'bg-[#F9A825]' },
];

export default function Contact() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    db.contacts.add({ id: generateId('CON'), ...data, createdAt: new Date().toISOString() });
    toast({ message: 'Message sent! We\'ll contact you within 24 hours.', type: 'success' });
    reset();
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-black font-heading mb-3">Contact Us</h1>
        <p className="text-indigo-200 text-lg">We're here to help you start your learning journey</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {contactInfo.map(({ icon: Icon, title, lines, color, iconBg }) => (
              <div key={title} className={`${color} rounded-2xl p-5`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-heading mb-1.5">{title}</h4>
                    {lines.map((l, i) => (
                      <p key={i} className="text-sm opacity-80">{l}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-[#E5E7EB] rounded-2xl h-52 flex items-center justify-center text-[#6B7280] text-sm">
              <div className="text-center">
                <MapPin size={32} className="mx-auto mb-2 text-[#1A237E]" />
                <p className="font-medium">Sadar Bazar, Nagola</p>
                <p className="text-xs">Bhinay, Ajmer, Rajasthan</p>
                <a
                  href="https://maps.google.com/?q=Bhinay+Ajmer+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-[#1A237E] font-semibold underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] p-8">
              <h2 className="text-2xl font-black font-heading text-[#111827] mb-2">Send a Message</h2>
              <p className="text-[#6B7280] text-sm mb-7">Fill out the form and we'll get back to you shortly.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    required
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    required
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  required
                  error={errors.phone?.message}
                  {...register('phone')}
                />
                <Textarea
                  label="Your Message"
                  placeholder="Tell us about what course you're interested in or any questions..."
                  required
                  error={errors.message?.message}
                  {...register('message')}
                />
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={isSubmitting}
                  rightIcon={<Send size={18} />}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
