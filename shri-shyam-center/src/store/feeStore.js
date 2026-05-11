import { create } from 'zustand';
import { db } from '../lib/db';

export const useFeeStore = create((set, get) => ({
  fees: [],
  loading: false,

  fetchFees: () => {
    set({ loading: true });
    const fees = db.fees.getAll();
    set({ fees, loading: false });
  },

  addFee: (fee) => {
    db.fees.add(fee);
    get().fetchFees();
  },

  updateFee: (id, updates) => {
    db.fees.update(id, updates);
    get().fetchFees();
  },

  deleteFee: (id) => {
    db.fees.remove(id);
    get().fetchFees();
  },

  markPaid: (id, paymentInfo) => {
    db.fees.update(id, {
      paid: true,
      status: 'paid',
      ...paymentInfo,
    });
    get().fetchFees();
  },

  getStudentFees: (studentId) => db.fees.getByStudent(studentId),
}));
