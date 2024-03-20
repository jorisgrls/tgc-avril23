import { convertStatus } from '@/helpers/recipe/convertStatus';
import { Badge } from '../ui/badge';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';

const BadgeStatus = ({ code }: any) => {
  return code === 'VALIDATED' ? (
    <Badge variant="success">{convertStatus(code)}</Badge>
  ) : code === 'PENDING' ? (
    <Badge variant="danger">{convertStatus(code)}</Badge>
  ) : (
    <Badge variant="destructive">{convertStatus(code)}</Badge>
  );
};

export default BadgeStatus;
