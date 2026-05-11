import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Printer, Check } from 'lucide-react';
import { Table } from '../../components/ui/Table';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/shared/StatCard';
import { FeeStatusBadge } from '../../components/shared/FeeStatusBadge';
import { useFeeStore } from '../../store/feeStore';
import { useCourseStore } from '../../store/courseStore';
import { useStudentStore } from '../../store/studentStore';
import { feeSchema, markPaidSchema } from '../../lib/validators';
import { generateId, generateReceiptNo, formatDate, formatCurrency } from '../../lib/utils';
import { useToast } from '../../hooks/useToast';
import { CreditCard, AlertCircle, TrendingUp } from 'lucide-react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Fees() {
  const { fees, fetchFees, addFee, markPaid } = useFeeStore();
  const { courses, fetchCourses } = useCourseStore();
  const { students, fetchStudents } = useStudentStore();
  const { toast } = useToast();

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [markPaidModal, setMarkPaidModal] = useState(null);
  const [receiptModal, setReceiptModal] = useState(null);

  useEffect(() => {
    fetchFees(); fetchCourses(); fetchStudents();
  }, [fetchFees, fetchCourses, fetchStudents]);

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const totalCollected = fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const totalPending = fees.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);
  const collectedThisMonth = fees
    .filter((f) => f.paid && f.paidDate &&
      new Date(f.paidDate).getMonth() === thisMonth &&
      new Date(f.paidDate).getFullYear() === thisYear)
    .reduce((s, f) => s + f.amount, 0);

  const filtered = fees.filter((f) => {
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    const matchCourse = filterCourse === 'all' || f.courseId === filterCourse;
    const matchMonth = filterMonth === 'all' || f.month === filterMonth;
    return matchStatus && matchCourse && matchMonth;
  });

  const columns = [
    {
      key: 'studentId',
      label: 'Student',
      render: (v) => {
        const s = students.find((x) => x.id === v);
        return (
          <div>
            <p className="font-semibold text-[#111827] text-sm">{s?.name || v}</p>
            <p className="text-xs text-[#9CA3AF]">{v}</p>
          </div>
        );
      },
    },
    {
      key: 'courseId',
      label: 'Course',
      render: (v) => {
        const c = courses.find((x) => x.id === v);
        return <span className="text-sm">{c?.name || v}</span>;
      },
    },
    { key: 'month', label: 'Month', render: (v, row) => `${v} ${row.year}` },
    { key: 'amount', label: 'Amount', render: (v) => formatCurrency(v) },
    { key: 'dueDate', label: 'Due Date', render: (v) => formatDate(v) },
    { key: 'status', label: 'Status', render: (v) => <FeeStatusBadge status={v} /> },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          {!row.paid && (
            <button
              onClick={() => setMarkPaidModal(row)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#E8F5E9] text-[#2E7D32] rounded-lg hover:bg-[#C8E6C9] transition-colors"
            >
              <Check size={12} /> Mark Paid
            </button>
          )}
          {row.paid && (
            <button
              onClick={() => setReceiptModal(row)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#E8EAF6] text-[#1A237E] rounded-lg hover:bg-[#C5CAE9] transition-colors"
            >
              <Printer size={12} /> Receipt
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading text-[#111827]">Fee Management</h1>
          <p className="text-[#6B7280] text-sm">{fees.length} fee records</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setAddModal(true)}>
          Add Fee Record
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Collected" value={formatCurrency(totalCollected)} icon={TrendingUp} color="success" />
        <StatCard title="Total Pending" value={formatCurrency(totalPending)} icon={AlertCircle} color="warning" />
        <StatCard title="This Month Collected" value={formatCurrency(collectedThisMonth)} icon={CreditCard} color="primary" />
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-wrap gap-4">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E]">
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E]">
            <option value="all">All Courses</option>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}
            className="px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E]">
            <option value="all">All Months</option>
            {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </Card>

      <Table columns={columns} data={filtered} emptyMessage="No fee records found" />

      {/* Add Fee Modal */}
      {addModal && (
        <AddFeeModal
          isOpen
          onClose={() => setAddModal(false)}
          students={students}
          courses={courses}
          onSave={(data) => {
            addFee({
              id: generateId('F'),
              ...data,
              paid: false,
              status: new Date(data.dueDate) < new Date() ? 'overdue' : 'pending',
              receiptNo: null,
              paidDate: null,
              paymentMethod: null,
            });
            toast({ message: 'Fee record added', type: 'success' });
            setAddModal(false);
          }}
        />
      )}

      {/* Mark Paid Modal */}
      {markPaidModal && (
        <MarkPaidModal
          isOpen
          fee={markPaidModal}
          onClose={() => setMarkPaidModal(null)}
          onSave={(data) => {
            markPaid(markPaidModal.id, {
              ...data,
              paidDate: data.paidDate,
              receiptNo: generateReceiptNo(),
              status: 'paid',
            });
            toast({ message: 'Fee marked as paid! Receipt generated.', type: 'success' });
            setMarkPaidModal(null);
          }}
        />
      )}

      {/* Receipt Modal */}
      {receiptModal && (
        <ReceiptModal
          isOpen
          fee={receiptModal}
          student={students.find((s) => s.id === receiptModal.studentId)}
          course={courses.find((c) => c.id === receiptModal.courseId)}
          onClose={() => setReceiptModal(null)}
        />
      )}
    </div>
  );
}

function AddFeeModal({ isOpen, onClose, students, courses, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(feeSchema), defaultValues: { year: new Date().getFullYear(), month: MONTHS[new Date().getMonth()] } });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Fee Record" size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button form="fee-form" type="submit" loading={isSubmitting}>Add Record</Button></>}>
      <form id="fee-form" onSubmit={handleSubmit(async (d) => { await new Promise(r => setTimeout(r, 300)); onSave(d); })} className="space-y-4">
        <Select label="Student" required error={errors.studentId?.message} {...register('studentId')}>
          <option value="">Select student</option>
          {students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
        </Select>
        <Select label="Course" required error={errors.courseId?.message} {...register('courseId')}>
          <option value="">Select course</option>
          {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Amount (₹)" type="number" required error={errors.amount?.message} {...register('amount')} />
          <Input label="Due Date" type="date" required error={errors.dueDate?.message} {...register('dueDate')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Month" required error={errors.month?.message} {...register('month')}>
            {MONTHS.map((m) => <option key={m}>{m}</option>)}
          </Select>
          <Input label="Year" type="number" required error={errors.year?.message} {...register('year')} />
        </div>
      </form>
    </Modal>
  );
}

function MarkPaidModal({ isOpen, fee, onClose, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(markPaidSchema),
    defaultValues: { paidDate: new Date().toISOString().split('T')[0] },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mark Fee as Paid" size="sm"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button form="paid-form" type="submit" variant="success" loading={isSubmitting}>Confirm Payment</Button></>}>
      <form id="paid-form" onSubmit={handleSubmit(async (d) => { await new Promise(r => setTimeout(r, 300)); onSave(d); })} className="space-y-4">
        <div className="bg-[#E8F5E9] rounded-xl p-4">
          <p className="text-sm font-semibold text-[#2E7D32]">Amount: {formatCurrency(fee.amount)}</p>
          <p className="text-xs text-[#6B7280]">{fee.month} {fee.year}</p>
        </div>
        <Select label="Payment Method" required error={errors.paymentMethod?.message} {...register('paymentMethod')}>
          <option value="">Select method</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Cheque</option>
          <option>NEFT</option>
        </Select>
        <Input label="Payment Date" type="date" required error={errors.paidDate?.message} {...register('paidDate')} />
      </form>
    </Modal>
  );
}

function ReceiptModal({ isOpen, fee, student, course, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fee Receipt" size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Close</Button><Button onClick={() => window.print()} leftIcon={<Printer size={16} />}>Print Receipt</Button></>}>
      <div className="receipt-container p-2">
        <div className="text-center border-b-2 border-[#1A237E] pb-4 mb-6">
          <h2 className="text-xl font-black text-[#1A237E] font-heading">Shri Shyam Computer & Coaching Center</h2>
          <p className="font-hindi text-sm text-[#6B7280]">श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर</p>
          <p className="text-xs text-[#6B7280] mt-1">Sadar Bazar, Nagola, Teh. Bhinay, Ajmer, Rajasthan</p>
          <p className="text-xs text-[#6B7280]">Ph: 9950669970 | 8619494994</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-sm font-bold text-[#1A237E] bg-[#E8EAF6] px-3 py-1 rounded-full">FEE RECEIPT</span>
          </div>
          <div className="text-right text-sm text-[#6B7280]">
            <p>Receipt No: <strong className="text-[#111827]">{fee.receiptNo}</strong></p>
            <p>Date: <strong className="text-[#111827]">{formatDate(fee.paidDate)}</strong></p>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          {[
            ['Student Name', student?.name],
            ['Student ID', student?.id],
            ['Course', course?.name],
            ['Fee For', `${fee.month} ${fee.year}`],
            ['Amount Paid', formatCurrency(fee.amount)],
            ['Payment Method', fee.paymentMethod],
            ['Payment Date', formatDate(fee.paidDate)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-[#F3F4F6] text-sm">
              <span className="text-[#6B7280] font-medium">{label}</span>
              <span className="text-[#111827] font-semibold">{value || '—'}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#E8F5E9] rounded-xl p-4 text-center">
          <p className="text-2xl font-black text-[#2E7D32]">{formatCurrency(fee.amount)}</p>
          <p className="text-sm text-[#6B7280]">Total Amount Paid</p>
        </div>
        <p className="text-center text-xs text-[#9CA3AF] mt-4">Thank you for your payment! This is a computer-generated receipt.</p>
      </div>
    </Modal>
  );
}
