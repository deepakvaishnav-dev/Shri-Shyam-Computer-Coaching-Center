import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Edit2, Trash2, Bell, AlertTriangle } from 'lucide-react';
import { Modal, ConfirmDialog } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { db } from '../../lib/db';
import { noticeSchema } from '../../lib/validators';
import { generateId, formatDateTime } from '../../lib/utils';
import { useToast } from '../../hooks/useToast';

export default function Notices() {
  const [, forceUpdate] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  // Derive notices directly from LocalStorage (synchronous) — no useEffect needed
  // refresh counter forces a re-read after mutations
  const notices = db.notices.getAll().sort((a, b) => new Date(b.date) - new Date(a.date));

  const load = () => forceUpdate((n) => n + 1);

  const handleSave = (data, existing) => {
    if (existing) {
      db.notices.update(existing.id, { ...data, date: existing.date });
      toast({ message: 'Notice updated', type: 'success' });
    } else {
      db.notices.add({ id: generateId('N'), ...data, date: new Date().toISOString() });
      toast({ message: 'Notice published', type: 'success' });
    }
    load();
    setAddModal(false);
    setEditModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading text-[#111827]">Notice Board</h1>
          <p className="text-[#6B7280] text-sm">{notices.length} notices published</p>
        </div>
        <Button size="sm" leftIcon={<Plus size={15} />} onClick={() => setAddModal(true)}>
          Add Notice
        </Button>
      </div>

      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="text-center py-16 text-[#9CA3AF]">
            <Bell size={48} className="mx-auto mb-3 opacity-30" />
            <p>No notices yet. Create your first notice!</p>
          </div>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              className={`bg-white rounded-2xl border shadow-sm p-5 flex gap-4 ${
                notice.priority === 'urgent' ? 'border-[#C62828]/30' : 'border-[#E5E7EB]'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                notice.priority === 'urgent' ? 'bg-[#FFEBEE]' : 'bg-[#E8EAF6]'
              }`}>
                {notice.priority === 'urgent'
                  ? <AlertTriangle size={18} className="text-[#C62828]" />
                  : <Bell size={18} className="text-[#1A237E]" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-[#111827] text-base">{notice.title}</h3>
                  <Badge variant={notice.priority} size="sm">{notice.priority}</Badge>
                </div>
                <p className="text-sm text-[#4B5563] leading-relaxed mb-2">{notice.body}</p>
                <p className="text-xs text-[#9CA3AF]">{formatDateTime(notice.date)}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => setEditModal(notice)} className="p-2 rounded-lg hover:bg-[#FFF3E0] text-[#FF6F00] transition-colors"><Edit2 size={15} /></button>
                <button onClick={() => setDeleteConfirm(notice)} className="p-2 rounded-lg hover:bg-[#FFEBEE] text-[#C62828] transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {(addModal || editModal) && (
        <NoticeModal
          isOpen
          notice={editModal}
          onClose={() => { setAddModal(false); setEditModal(null); }}
          onSave={(data) => handleSave(data, editModal)}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => { db.notices.remove(deleteConfirm.id); load(); toast({ message: 'Notice deleted', type: 'success' }); setDeleteConfirm(null); }}
        title="Delete Notice"
        message={`Delete notice "${deleteConfirm?.title}"?`}
        confirmText="Delete"
      />
    </div>
  );
}

function NoticeModal({ isOpen, onClose, notice, onSave }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(noticeSchema),
    defaultValues: notice || { priority: 'normal' },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={notice ? 'Edit Notice' : 'Add Notice'} size="md"
      footer={<><Button variant="ghost" onClick={onClose}>Cancel</Button><Button form="notice-form" type="submit" loading={isSubmitting}>{notice ? 'Save' : 'Publish'}</Button></>}>
      <form id="notice-form" onSubmit={handleSubmit(async (d) => { await new Promise(r => setTimeout(r, 300)); onSave(d); })} className="space-y-4">
        <Input label="Notice Title" required error={errors.title?.message} {...register('title')} />
        <Textarea label="Notice Content" required error={errors.body?.message} {...register('body')} />
        <Select label="Priority" {...register('priority')}>
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </Select>
      </form>
    </Modal>
  );
}
