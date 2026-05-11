import { create } from 'zustand';
import { db } from '../lib/db';

export const useCourseStore = create((set, get) => ({
  courses: [],
  loading: false,

  fetchCourses: () => {
    set({ loading: true });
    const courses = db.courses.getAll();
    set({ courses, loading: false });
  },

  addCourse: (course) => {
    db.courses.add(course);
    get().fetchCourses();
  },

  updateCourse: (id, updates) => {
    db.courses.update(id, updates);
    get().fetchCourses();
  },

  deleteCourse: (id) => {
    db.courses.remove(id);
    get().fetchCourses();
  },

  getCourse: (id) => db.courses.getById(id),
}));
