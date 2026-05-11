import { z } from 'zod';

// ─── Auth Schemas ───
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// ─── Student Schema ───
export const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  fatherName: z.string().min(2, 'Father name must be at least 2 characters'),
  address: z.string().min(5, 'Please enter a complete address'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other'], { message: 'Please select a gender' }),
  enrolledCourses: z.array(z.string()).min(1, 'Please select at least one course'),
  status: z.enum(['active', 'inactive']).default('active'),
});

// ─── Course Schema ───
export const courseSchema = z.object({
  name: z.string().min(2, 'Course name is required'),
  nameHindi: z.string().optional(),
  duration: z.string().min(1, 'Duration is required'),
  fee: z.coerce.number().min(0, 'Fee must be a positive number'),
  category: z.enum(['computer', 'coaching', 'language', 'ai', 'webdev'], {
    message: 'Please select a valid category',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  seats: z.coerce.number().min(1, 'Seats must be at least 1'),
});

// ─── Fee Schema ───
export const feeSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  courseId: z.string().min(1, 'Please select a course'),
  amount: z.coerce.number().min(1, 'Amount must be greater than 0'),
  dueDate: z.string().min(1, 'Due date is required'),
  month: z.string().min(1, 'Month is required'),
  year: z.coerce.number().min(2020).max(2099),
});

// ─── Mark Fee Paid Schema ───
export const markPaidSchema = z.object({
  paymentMethod: z.enum(['Cash', 'UPI', 'Cheque', 'NEFT'], {
    message: 'Please select a payment method',
  }),
  paidDate: z.string().min(1, 'Paid date is required'),
});

// ─── Notice Schema ───
export const noticeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  body: z.string().min(10, 'Notice body must be at least 10 characters'),
  priority: z.enum(['normal', 'urgent']).default('normal'),
});

// ─── Contact Schema ───
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

// ─── Change Password Schema ───
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
