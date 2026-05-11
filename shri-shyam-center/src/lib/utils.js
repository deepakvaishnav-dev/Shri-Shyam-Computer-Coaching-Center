import { format, parseISO, isValid } from 'date-fns';
import { db, isSeeded, markSeeded } from './db';

// ─── ID Generation ───
export function generateId(prefix = '') {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}${ts}${rand}`.toUpperCase();
}

export function generateReceiptNo() {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `SSC-${year}-${num}`;
}

export function generateStudentId() {
  const year = new Date().getFullYear().toString().slice(-2);
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `SSC${year}${num}`;
}

// ─── Date Formatting ───
export function formatDate(dateStr, fmt = 'dd MMM yyyy') {
  if (!dateStr) return '—';
  try {
    const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr);
    return isValid(d) ? format(d, fmt) : '—';
  } catch {
    return '—';
  }
}

export function formatDateTime(dateStr) {
  return formatDate(dateStr, 'dd MMM yyyy, hh:mm a');
}

// ─── Currency Formatting ───
export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Class Name Utility ───
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ─── Export CSV ───
export function exportToCSV(data, filename) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((h) => JSON.stringify(row[h] ?? '')).join(',')
    ),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Fee Status Logic ───
export function computeFeeStatus(fee) {
  if (fee.paid) return 'paid';
  const due = new Date(fee.dueDate);
  const now = new Date();
  return due < now ? 'overdue' : 'pending';
}

// ─── Seed Database ───
export function seedDatabase() {
  if (isSeeded()) return;

  // Courses
  const courses = [
    {
      id: 'C001',
      name: 'RS-CIT',
      nameHindi: 'आर एस-सीआईटी',
      duration: '3 Months',
      fee: 3500,
      category: 'computer',
      description: 'Rajasthan State Certificate Course in Information Technology – Government recognized computer literacy course.',
      seats: 30,
      enrolled: 18,
    },
    {
      id: 'C002',
      name: 'Class 1-8 Coaching',
      nameHindi: 'कक्षा 1-8 कोचिंग',
      duration: '1 Year',
      fee: 1200,
      category: 'coaching',
      description: 'Comprehensive academic coaching for students of classes 1 to 8 covering all subjects.',
      seats: 40,
      enrolled: 28,
    },
    {
      id: 'C003',
      name: 'Class 9-12 Coaching',
      nameHindi: 'कक्षा 9-12 कोचिंग',
      duration: '1 Year',
      fee: 1800,
      category: 'coaching',
      description: 'Advanced coaching for class 9-12 students with focus on Science, Math, and Commerce.',
      seats: 35,
      enrolled: 22,
    },
    {
      id: 'C004',
      name: 'NIOS 10th Board',
      nameHindi: 'NIOS 10वीं बोर्ड',
      duration: '6 Months',
      fee: 2500,
      category: 'coaching',
      description: 'National Institute of Open Schooling 10th board preparation – flexible learning for all age groups.',
      seats: 25,
      enrolled: 15,
    },
    {
      id: 'C005',
      name: 'NIOS 12th Board',
      nameHindi: 'NIOS 12वीं बोर्ड',
      duration: '6 Months',
      fee: 2800,
      category: 'coaching',
      description: 'NIOS 12th board preparation with subject specialization in Arts, Science, and Commerce streams.',
      seats: 25,
      enrolled: 12,
    },
    {
      id: 'C006',
      name: 'Web Development',
      nameHindi: 'वेब डेवलपमेंट',
      duration: '4 Months',
      fee: 6000,
      category: 'webdev',
      description: 'Full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js basics.',
      seats: 20,
      enrolled: 8,
    },
    {
      id: 'C007',
      name: 'Generative AI & Prompt Engineering',
      nameHindi: 'जेनरेटिव AI',
      duration: '2 Months',
      fee: 4000,
      category: 'ai',
      description: 'Learn AI tools, ChatGPT, Gemini, Midjourney and prompt engineering for modern professionals.',
      seats: 20,
      enrolled: 10,
    },
    {
      id: 'C008',
      name: 'English Spoken (Summer Batch)',
      nameHindi: 'अंग्रेजी स्पोकन',
      duration: '2 Months',
      fee: 1500,
      category: 'language',
      description: 'Intensive spoken English summer batch. Build confidence in communication, grammar, and vocabulary.',
      seats: 30,
      enrolled: 20,
    },
  ];
  courses.forEach((c) => db.courses.add(c));

  // Users & Students
  const adminUser = {
    id: generateId('U'),
    name: 'Anju Vashisth',
    email: 'admin@shrishyam.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
  };
  db.users.add(adminUser);

  const students = [
    {
      id: 'STU001',
      name: 'Ramesh Kumar Sharma',
      email: 'student1@shrishyam.com',
      phone: '9876543210',
      fatherName: 'Mohan Sharma',
      address: 'Village Nagola, Bhinay, Ajmer',
      dob: '2005-03-15',
      gender: 'Male',
      enrolledCourses: ['C001', 'C008'],
      admissionDate: '2024-01-10',
      status: 'active',
    },
    {
      id: 'STU002',
      name: 'Priya Meena',
      email: 'student2@shrishyam.com',
      phone: '9765432109',
      fatherName: 'Suresh Meena',
      address: 'Sadar Bazar, Bhinay, Ajmer',
      dob: '2006-07-22',
      gender: 'Female',
      enrolledCourses: ['C003', 'C004'],
      admissionDate: '2024-02-05',
      status: 'active',
    },
    {
      id: 'STU003',
      name: 'Vikram Singh Rajput',
      email: 'student3@shrishyam.com',
      phone: '9654321098',
      fatherName: 'Bharat Singh',
      address: 'Gulabpura Road, Bhinay, Ajmer',
      dob: '2004-11-08',
      gender: 'Male',
      enrolledCourses: ['C006', 'C007'],
      admissionDate: '2024-01-20',
      status: 'active',
    },
  ];

  const studentPasswords = ['student123', 'student123', 'student123'];
  students.forEach((s, i) => {
    db.students.add(s);
    db.users.add({
      id: generateId('U'),
      name: s.name,
      email: s.email,
      password: studentPasswords[i],
      role: 'student',
      studentId: s.id,
      createdAt: new Date().toISOString(),
    });
    // Enrollments
    s.enrolledCourses.forEach((courseId) => {
      db.enrollments.add({
        id: generateId('E'),
        studentId: s.id,
        courseId,
        enrollDate: s.admissionDate,
        status: 'active',
      });
    });
  });

  // Fee records — last 3 months for each student
  const now = new Date();
  let receiptCounter = 1001;
  students.forEach((student) => {
    student.enrolledCourses.forEach((courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return;
      for (let m = 2; m >= 0; m--) {
        const feeDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const dueDate = new Date(now.getFullYear(), now.getMonth() - m, 10);
        const isPaid = m > 0;
        db.fees.add({
          id: generateId('F'),
          studentId: student.id,
          courseId,
          amount: course.fee,
          paid: isPaid,
          dueDate: dueDate.toISOString(),
          paidDate: isPaid ? new Date(now.getFullYear(), now.getMonth() - m, Math.floor(Math.random() * 8) + 1).toISOString() : null,
          paymentMethod: isPaid ? (Math.random() > 0.5 ? 'Cash' : 'UPI') : null,
          month: feeDate.toLocaleString('default', { month: 'long' }),
          year: feeDate.getFullYear(),
          status: isPaid ? 'paid' : (dueDate < now ? 'overdue' : 'pending'),
          receiptNo: isPaid ? `SSC-${feeDate.getFullYear()}-${receiptCounter++}` : null,
        });
      }
    });
  });

  // Notices
  const notices = [
    {
      id: generateId('N'),
      title: 'Summer English Batch Starting May 15',
      body: 'Registrations open for our intensive English Spoken summer batch. Special discount for early birds. Contact: 9950669970.',
      date: new Date().toISOString(),
      priority: 'urgent',
    },
    {
      id: generateId('N'),
      title: 'NIOS Admission Open – 10th & 12th',
      body: 'NIOS board admission for October session is now open. Last date: June 30. Documents required: Aadhar, photo, previous marksheet.',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      priority: 'normal',
    },
    {
      id: generateId('N'),
      title: 'RS-CIT Exam Preparation Workshop',
      body: 'Free RS-CIT exam preparation workshop on every Saturday from 10 AM. All enrolled students are requested to attend.',
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      priority: 'normal',
    },
  ];
  notices.forEach((n) => db.notices.add(n));

  markSeeded();
  console.log('✅ Shri Shyam Center database seeded successfully!');
}
