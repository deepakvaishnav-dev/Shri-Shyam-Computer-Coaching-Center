import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Select, Textarea } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useCourseStore } from '../../store/courseStore';
import { courseSchema } from '../../lib/validators';
import { generateId, formatCurrency } from '../../lib/utils';
import { db } from '../../lib/db';
import { useToast } from '../../hooks/useToast';

const CATEGORY_LABELS = { computer: 'Computer', coaching: 'Coaching', language: 'Language', ai: 'AI & Technology', webdev: 'Web Development' };
const CATEGORY_COLORS = { computer: 'primary', coaching: 'accent', language: 'success', ai: 'warning', webdev: 'danger' };

export default function CoursesAdmin() {
  const { courses, fetchCourses, addCourse, updateCourse, deleteCourse } = useCourseStore();
  const { toast } = useToast();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading text-[#111827]">Course Management</h1>
          <p className="text-[#6B7280] text-sm">{courses.length} courses available</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setAddModal(true)}>Add Course</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => {
          const enrollments = db.enrollments.getByCourse(course.id);
          return (
            <div key={course.id} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
              <div className="h-1.5 bg-linear-to-r from-[#1A237E] to-[#FF6F00]" />
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={CATEGORY_COLORS[course.category] || 'default'} size="sm">
                    {CATEGORY_LABELS[course.category] || course.category}
                  </Badge>
                  <div className="flex gap-1">
                    <button onClick={() => setEditModal(course)} className="p-1.5 rounded hover:bg-[#FFF3E0] text-[#FF6F00] transition-colors"><Edit2 size={14} /></button>
                    <button onClick={() => setDeleteConfirm(course)} className="p-1.5 rounded hover:bg-[#FFEBEE] text-[#C62828] transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#111827] font-heading mb-0.5">{course.name}</h3>
                {course.nameHindi && <p className="font-hindi text-xs text-[#6B7280] mb-2">{course.nameHindi}</p>}
                <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-4 flex-1">{course.description}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#F9FAFB] rounded-lg p-2">
                    <p className="text-sm font-bold text-[#1A237E]">{formatCurrency(course.fee)}</p>
                    <p className="text-xs text-[#9CA3AF]">Fee</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-2">
                    <p className="text-sm font-bold text-[#111827]">{course.duration}</p>
                    <p className="text-xs text-[#9CA3AF]">Duration</p>
                  </div>
                  <div className="bg-[#F9FAFB] rounded-lg p-2">
                    <div className="flex items-center justify-center gap-1">
                      <Users size={12} className="text-[#9CA3AF]" />
                      <p className="text-sm font-bold text-[#111827]">{enrollments.length}/{course.seats}</p>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">Enrolled</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(addModal || editModal) && (
        <CourseFormModal
          isOpen
          course={editModal}
          onClose={() => { setAddModal(false); setEditModal(null); }}
          onSave={(data) => {
            if (editModal) {
              updateCourse(editModal.id, data);
              toast({ message: 'Course updated', type: 'success' });
            } else {
              addCourse({ id: generateId('C'), enrolled: 0, ...data });
              toast({ message: 'Course added', type: 'success' });
            }
            setAddModal(false); setEditModal(null);
          }}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => { deleteCourse(deleteConfirm.id); toast({ message: 'Course deleted', type: 'success' }); setDeleteConfirm(null); }}
        title="Delete Course"
        message={`Delete "${deleteConfirm?.name}"? Students enrolled in this course will not be affected.`}
        confirmText="Delete"
      />
    </div>
  );
}

function CourseFormModal({ isOpen, onClose, course, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {},
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course ? 'Edit Course' : 'Add New Course'} size="lg"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button form="course-form" type="submit" loading={isSubmitting}>{course ? 'Save Changes' : 'Add Course'}</Button></>}>
      <form id="course-form" onSubmit={handleSubmit(async (d) => { await new Promise(r => setTimeout(r, 300)); onSave(d); })} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Course Name (English)" required error={errors.name?.message} {...register('name')} />
          <Input label="Course Name (Hindi)" error={errors.nameHindi?.message} {...register('nameHindi')} />
          <Input label="Duration" placeholder="e.g. 3 Months" required error={errors.duration?.message} {...register('duration')} />
          <Input label="Fee (₹)" type="number" required error={errors.fee?.message} {...register('fee')} />
          <Select label="Category" required error={errors.category?.message} {...register('category')}>
            <option value="">Select category</option>
            <option value="computer">Computer</option>
            <option value="coaching">Coaching</option>
            <option value="language">Language</option>
            <option value="ai">AI & Technology</option>
            <option value="webdev">Web Development</option>
          </Select>
          <Input label="Total Seats" type="number" required error={errors.seats?.message} {...register('seats')} />
        </div>
        <Textarea label="Description" required error={errors.description?.message} {...register('description')} />
      </form>
    </Modal>
  );
}
