import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Search, Download, Eye, Edit2, Trash2 } from 'lucide-react';
import { Table } from '../../components/ui/Table';
import { Modal, SlideOver, ConfirmDialog } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { FeeStatusBadge } from '../../components/shared/FeeStatusBadge';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useStudentStore } from '../../store/studentStore';
import { useCourseStore } from '../../store/courseStore';
import { db } from '../../lib/db';
import { studentSchema } from '../../lib/validators';
import { generateId, generateStudentId, formatDate, formatCurrency, exportToCSV } from '../../lib/utils';
import { useToast } from '../../hooks/useToast';

export default function Students() {
  const { students, fetchStudents, addStudent, updateStudent, deleteStudent } = useStudentStore();
  const { courses, fetchCourses } = useCourseStore();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [viewSlide, setViewSlide] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, [fetchStudents, fetchCourses]);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search);
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchCourse = filterCourse === 'all' || (s.enrolledCourses || []).includes(filterCourse);
    return matchSearch && matchStatus && matchCourse;
  });

  const columns = [
    {
      key: 'name',
      label: 'Student',
      render: (v, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1A237E] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {v.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[#111827] text-sm">{v}</p>
            <p className="text-xs text-[#9CA3AF]">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone' },
    {
      key: 'enrolledCourses',
      label: 'Courses',
      sortable: false,
      render: (v) => (
        <div className="flex flex-wrap gap-1">
          {(v || []).slice(0, 2).map((cid) => {
            const c = courses.find((x) => x.id === cid);
            return c ? <Badge key={cid} variant="primary" size="sm">{c.name}</Badge> : null;
          })}
          {(v || []).length > 2 && <Badge variant="default" size="sm">+{v.length - 2}</Badge>}
        </div>
      ),
    },
    { key: 'admissionDate', label: 'Admission', render: (v) => formatDate(v) },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge variant={v} dot size="sm">{v}</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-1">
          <button onClick={() => setViewSlide(row)} className="p-1.5 rounded hover:bg-[#E8EAF6] text-[#1A237E] transition-colors" title="View"><Eye size={15} /></button>
          <button onClick={() => setEditModal(row)} className="p-1.5 rounded hover:bg-[#FFF3E0] text-[#FF6F00] transition-colors" title="Edit"><Edit2 size={15} /></button>
          <button onClick={() => setDeleteConfirm(row)} className="p-1.5 rounded hover:bg-[#FFEBEE] text-[#C62828] transition-colors" title="Delete"><Trash2 size={15} /></button>
        </div>
      ),
    },
  ];

  const handleExport = () => {
    exportToCSV(
      students.map((s) => ({
        ID: s.id, Name: s.name, Email: s.email, Phone: s.phone,
        'Father Name': s.fatherName, Gender: s.gender, Status: s.status,
        'Admission Date': formatDate(s.admissionDate),
      })),
      'students.csv'
    );
    toast({ message: 'Students exported to CSV', type: 'success' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading text-[#111827]">Students</h1>
          <p className="text-[#6B7280] text-sm mt-0.5">{students.length} total students</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download size={15} />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setAddModal(true)}>
            Add Student
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-48">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, phone..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E] focus:ring-2 focus:ring-[#1A237E]/20"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#1A237E]"
          >
            <option value="all">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </Card>

      <Table columns={columns} data={filtered} emptyMessage="No students found. Add your first student!" />

      {/* Add/Edit Modal */}
      {(addModal || editModal) && (
        <StudentFormModal
          isOpen={!!(addModal || editModal)}
          onClose={() => { setAddModal(false); setEditModal(null); }}
          student={editModal}
          courses={courses}
          onSave={(data) => {
            if (editModal) {
              updateStudent(editModal.id, data);
              toast({ message: 'Student updated successfully', type: 'success' });
            } else {
              const newStudent = {
                ...data,
                id: generateStudentId(),
                admissionDate: new Date().toISOString().split('T')[0],
              };
              addStudent(newStudent);
              // Add user account
              db.users.add({
                id: generateId('U'),
                name: newStudent.name,
                email: newStudent.email,
                password: 'student123',
                role: 'student',
                studentId: newStudent.id,
                createdAt: new Date().toISOString(),
              });
              toast({ message: 'Student added successfully! Default password: student123', type: 'success', duration: 6000 });
            }
            setAddModal(false);
            setEditModal(null);
          }}
        />
      )}

      {/* View Slide-over */}
      {viewSlide && (
        <StudentDetail
          student={viewSlide}
          courses={courses}
          onClose={() => setViewSlide(null)}
        />
      )}

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => {
          deleteStudent(deleteConfirm.id);
          toast({ message: 'Student deleted successfully', type: 'success' });
          setDeleteConfirm(null);
        }}
        title="Delete Student"
        message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
}

function StudentFormModal({ isOpen, onClose, student, courses, onSave }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: student || { status: 'active', enrolledCourses: [] },
  });

  const selected = useWatch({ control, name: 'enrolledCourses' }) ?? [];

  const toggleCourse = (cid) => {
    const curr = selected.includes(cid)
      ? selected.filter((x) => x !== cid)
      : [...selected, cid];
    setValue('enrolledCourses', curr, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 300));
    onSave(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={student ? 'Edit Student' : 'Add New Student'}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button form="student-form" type="submit" loading={isSubmitting}>
            {student ? 'Save Changes' : 'Add Student'}
          </Button>
        </>
      }
    >
      <form id="student-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name" required error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" required error={errors.email?.message} {...register('email')} />
          <Input label="Phone" required error={errors.phone?.message} {...register('phone')} />
          <Input label="Father's Name" required error={errors.fatherName?.message} {...register('fatherName')} />
          <Input label="Date of Birth" type="date" required error={errors.dob?.message} {...register('dob')} />
          <Select label="Gender" required error={errors.gender?.message} {...register('gender')}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>
        </div>
        <Input label="Address" required error={errors.address?.message} {...register('address')} />
        <Select label="Status" {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
        <div>
          <label className="text-sm font-medium text-[#374151] mb-2 block">
            Enrolled Courses <span className="text-[#C62828]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {courses.map((c) => (
              <label key={c.id} className="flex items-center gap-2 p-2.5 border border-[#E5E7EB] rounded-lg cursor-pointer hover:bg-[#F9FAFB] transition-colors">
                <input
                  type="checkbox"
                  checked={selected.includes(c.id)}
                  onChange={() => toggleCourse(c.id)}
                  className="accent-[#1A237E]"
                />
                <span className="text-sm text-[#374151]">{c.name}</span>
              </label>
            ))}
          </div>
          {errors.enrolledCourses && (
            <p className="form-error mt-1">{errors.enrolledCourses.message}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}

function StudentDetail({ student, courses, onClose }) {
  const fees = db.fees.getByStudent(student.id);
  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const paidFees = fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);

  return (
    <SlideOver isOpen title={`${student.name}'s Profile`} onClose={onClose}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4 p-5 bg-[#E8EAF6] rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#1A237E] flex items-center justify-center text-white text-2xl font-black">
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#111827]">{student.name}</h3>
            <p className="text-sm text-[#6B7280]">{student.id}</p>
            <Badge variant={student.status} dot size="sm" className="mt-1">{student.status}</Badge>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4">
          {[
            ['Email', student.email],
            ['Phone', student.phone],
            ['Father', student.fatherName],
            ['DOB', formatDate(student.dob)],
            ['Gender', student.gender],
            ['Admission', formatDate(student.admissionDate)],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-[#9CA3AF] font-medium">{label}</p>
              <p className="text-sm text-[#111827] font-medium">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-[#9CA3AF] font-medium mb-1">Address</p>
          <p className="text-sm text-[#111827]">{student.address}</p>
        </div>

        {/* Enrolled Courses */}
        <div>
          <h4 className="font-bold text-[#111827] mb-3">Enrolled Courses</h4>
          <div className="space-y-2">
            {(student.enrolledCourses || []).map((cid) => {
              const c = courses.find((x) => x.id === cid);
              return c ? (
                <div key={cid} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">{c.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{c.duration} • {formatCurrency(c.fee)}</p>
                  </div>
                  <Badge variant="primary" size="sm">{c.category}</Badge>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Fee Summary */}
        <div>
          <h4 className="font-bold text-[#111827] mb-3">Fee Summary</h4>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
              <p className="text-lg font-black text-[#111827]">{formatCurrency(totalFees)}</p>
              <p className="text-xs text-[#9CA3AF]">Total</p>
            </div>
            <div className="text-center p-3 bg-[#E8F5E9] rounded-xl">
              <p className="text-lg font-black text-[#2E7D32]">{formatCurrency(paidFees)}</p>
              <p className="text-xs text-[#6B7280]">Paid</p>
            </div>
            <div className="text-center p-3 bg-[#FFEBEE] rounded-xl">
              <p className="text-lg font-black text-[#C62828]">{formatCurrency(totalFees - paidFees)}</p>
              <p className="text-xs text-[#6B7280]">Pending</p>
            </div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {fees.map((f) => {
              const course = courses.find((c) => c.id === f.courseId);
              return (
                <div key={f.id} className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] text-sm">
                  <div>
                    <p className="font-medium text-[#111827]">{f.month} {f.year}</p>
                    <p className="text-xs text-[#9CA3AF]">{course?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#111827]">{formatCurrency(f.amount)}</p>
                    <FeeStatusBadge status={f.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideOver>
  );
}
