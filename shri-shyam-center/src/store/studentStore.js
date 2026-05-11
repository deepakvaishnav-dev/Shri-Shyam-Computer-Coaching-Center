import { create } from 'zustand';
import { db } from '../lib/db';

export const useStudentStore = create((set, get) => ({
  students: [],
  loading: false,

  fetchStudents: () => {
    set({ loading: true });
    const students = db.students.getAll();
    set({ students, loading: false });
  },

  addStudent: (student) => {
    db.students.add(student);
    get().fetchStudents();
  },

  updateStudent: (id, updates) => {
    db.students.update(id, updates);
    get().fetchStudents();
  },

  deleteStudent: (id) => {
    db.students.remove(id);
    get().fetchStudents();
  },

  getStudent: (id) => db.students.getById(id),
}));
