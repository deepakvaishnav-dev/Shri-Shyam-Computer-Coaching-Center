import { useState } from 'react';
import { Printer } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../../store/authStore';
import { db } from '../../lib/db';
import { formatDate, formatCurrency } from '../../lib/utils';
import { FeeStatusBadge } from '../../components/shared/FeeStatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Card, CardTitle } from '../../components/ui/Card';

const PIE_COLORS = ['#2E7D32', '#C62828', '#F9A825'];

export default function MyFees() {
  const { studentId } = useAuthStore();
  const fees = db.fees.getByStudent(studentId);
  const courses = db.courses.getAll();
  const student = db.students.getById(studentId);
  const [receiptModal, setReceiptModal] = useState(null);

  const totalFee = fees.reduce((s, f) => s + f.amount, 0);
  const paid = fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const pending = totalFee - paid;

  const pieData = [
    { name: 'Paid', value: paid },
    { name: 'Pending', value: pending > 0 ? pending : 0 },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-heading text-[#111827]">My Fees</h1>
        <p className="text-[#6B7280] text-sm">{fees.length} fee records</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Fee Table */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="overflow-x-auto rounded-2xl">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-10 text-[#9CA3AF]">No fee records found</td></tr>
                  ) : fees.map((f) => {
                    const course = courses.find((c) => c.id === f.courseId);
                    return (
                      <tr key={f.id}>
                        <td><span className="font-medium">{f.month} {f.year}</span></td>
                        <td>{course?.name || '—'}</td>
                        <td className="font-semibold">{formatCurrency(f.amount)}</td>
                        <td>{formatDate(f.dueDate)}</td>
                        <td><FeeStatusBadge status={f.status} /></td>
                        <td>
                          {f.paid && (
                            <button
                              onClick={() => setReceiptModal(f)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#E8EAF6] text-[#1A237E] rounded-lg hover:bg-[#C5CAE9] transition-colors"
                            >
                              <Printer size={12} /> Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Pie Chart */}
        <div>
          <Card padding="md">
            <CardTitle className="mb-4">Fee Overview</CardTitle>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
            <div className="space-y-3 mt-4">
              {[
                { label: 'Total', value: formatCurrency(totalFee), color: 'text-[#111827]', bg: 'bg-[#F9FAFB]' },
                { label: 'Paid', value: formatCurrency(paid), color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9]' },
                { label: 'Pending', value: formatCurrency(pending), color: 'text-[#C62828]', bg: 'bg-[#FFEBEE]' },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} rounded-xl p-3 flex justify-between items-center`}>
                  <span className="text-sm text-[#6B7280] font-medium">{label}</span>
                  <span className={`font-bold text-sm ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptModal && (
        <Modal isOpen onClose={() => setReceiptModal(null)} title="Fee Receipt" size="md"
          footer={<><Button variant="ghost" onClick={() => setReceiptModal(null)}>Close</Button><Button onClick={() => window.print()} leftIcon={<Printer size={16} />}>Print</Button></>}>
          <div className="receipt-container">
            <div className="text-center border-b-2 border-[#1A237E] pb-4 mb-5">
              <h2 className="text-lg font-black text-[#1A237E] font-heading">Shri Shyam Computer & Coaching Center</h2>
              <p className="font-hindi text-xs text-[#6B7280]">श्री श्याम कम्प्यूटर एण्ड कोचिंग सेन्टर</p>
              <p className="text-xs text-[#9CA3AF] mt-1">Sadar Bazar, Nagola, Teh. Bhinay, Ajmer, Rajasthan</p>
            </div>
            <div className="flex justify-between mb-5">
              <span className="text-sm font-bold text-[#1A237E] bg-[#E8EAF6] px-3 py-1 rounded-full">FEE RECEIPT</span>
              <div className="text-right text-sm text-[#6B7280]">
                <p>Receipt: <strong>{receiptModal.receiptNo}</strong></p>
                <p>Date: <strong>{formatDate(receiptModal.paidDate)}</strong></p>
              </div>
            </div>
            <div className="space-y-2 mb-5">
              {[
                ['Student Name', student?.name],
                ['Student ID', student?.id],
                ['Course', courses.find((c) => c.id === receiptModal.courseId)?.name],
                ['Fee Period', `${receiptModal.month} ${receiptModal.year}`],
                ['Amount', formatCurrency(receiptModal.amount)],
                ['Payment Method', receiptModal.paymentMethod],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between py-2 border-b border-[#F3F4F6] text-sm">
                  <span className="text-[#6B7280]">{l}</span>
                  <span className="font-semibold text-[#111827]">{v || '—'}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#E8F5E9] rounded-xl p-4 text-center">
              <p className="text-2xl font-black text-[#2E7D32]">{formatCurrency(receiptModal.amount)}</p>
              <p className="text-sm text-[#6B7280]">Amount Paid</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
