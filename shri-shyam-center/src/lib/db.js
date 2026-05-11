// ─── LocalStorage DB Layer ───
// All keys prefixed with "ssc_"

const KEYS = {
  users: 'ssc_users',
  students: 'ssc_students',
  fees: 'ssc_fees',
  courses: 'ssc_courses',
  enrollments: 'ssc_enrollments',
  notices: 'ssc_notices',
  contacts: 'ssc_contacts',
  seeded: 'ssc_seeded',
};

// ─── Generic Helpers ───
function getAll(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getById(key, id) {
  return getAll(key).find((item) => item.id === id) || null;
}

function add(key, item) {
  const all = getAll(key);
  all.push(item);
  saveAll(key, all);
  return item;
}

function update(key, id, updates) {
  const all = getAll(key);
  const idx = all.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  saveAll(key, all);
  return all[idx];
}

function remove(key, id) {
  const all = getAll(key).filter((item) => item.id !== id);
  saveAll(key, all);
  return true;
}

function query(key, predicate) {
  return getAll(key).filter(predicate);
}

// clear() removed — use db.[collection].remove(id) for targeted deletion

// ─── Typed Collections ───
export const db = {
  // Users
  users: {
    getAll: () => getAll(KEYS.users),
    getById: (id) => getById(KEYS.users, id),
    getByEmail: (email) => getAll(KEYS.users).find((u) => u.email === email) || null,
    add: (item) => add(KEYS.users, item),
    update: (id, updates) => update(KEYS.users, id, updates),
    remove: (id) => remove(KEYS.users, id),
  },
  // Students
  students: {
    getAll: () => getAll(KEYS.students),
    getById: (id) => getById(KEYS.students, id),
    add: (item) => add(KEYS.students, item),
    update: (id, updates) => update(KEYS.students, id, updates),
    remove: (id) => remove(KEYS.students, id),
    query: (predicate) => query(KEYS.students, predicate),
  },
  // Fees
  fees: {
    getAll: () => getAll(KEYS.fees),
    getById: (id) => getById(KEYS.fees, id),
    add: (item) => add(KEYS.fees, item),
    update: (id, updates) => update(KEYS.fees, id, updates),
    remove: (id) => remove(KEYS.fees, id),
    query: (predicate) => query(KEYS.fees, predicate),
    getByStudent: (studentId) => query(KEYS.fees, (f) => f.studentId === studentId),
  },
  // Courses
  courses: {
    getAll: () => getAll(KEYS.courses),
    getById: (id) => getById(KEYS.courses, id),
    add: (item) => add(KEYS.courses, item),
    update: (id, updates) => update(KEYS.courses, id, updates),
    remove: (id) => remove(KEYS.courses, id),
  },
  // Enrollments
  enrollments: {
    getAll: () => getAll(KEYS.enrollments),
    getById: (id) => getById(KEYS.enrollments, id),
    add: (item) => add(KEYS.enrollments, item),
    update: (id, updates) => update(KEYS.enrollments, id, updates),
    remove: (id) => remove(KEYS.enrollments, id),
    getByStudent: (studentId) => query(KEYS.enrollments, (e) => e.studentId === studentId),
    getByCourse: (courseId) => query(KEYS.enrollments, (e) => e.courseId === courseId),
  },
  // Notices
  notices: {
    getAll: () => getAll(KEYS.notices),
    getById: (id) => getById(KEYS.notices, id),
    add: (item) => add(KEYS.notices, item),
    update: (id, updates) => update(KEYS.notices, id, updates),
    remove: (id) => remove(KEYS.notices, id),
  },
  // Contacts
  contacts: {
    getAll: () => getAll(KEYS.contacts),
    add: (item) => add(KEYS.contacts, item),
  },
};

// ─── Seed Flag ───
export function isSeeded() {
  return localStorage.getItem(KEYS.seeded) === 'true';
}

export function markSeeded() {
  localStorage.setItem(KEYS.seeded, 'true');
}

export function clearAll() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
