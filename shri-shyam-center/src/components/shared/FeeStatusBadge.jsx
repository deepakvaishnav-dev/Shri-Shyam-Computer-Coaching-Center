import { Badge } from '../ui/Badge';

export function FeeStatusBadge({ status }) {
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
  };
  return (
    <Badge variant={status} dot size="md">
      {labels[status] || status}
    </Badge>
  );
}
