import { convertStatus } from '@/helpers/recipe/convertStatus';
import { Badge } from '../ui/badge';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';

const BadgeStatus = ({ code }: any) => {
  return code === 'VALIDATED' ? (
    <Badge variant="destructive">
      {convertStatus(code)}
      <CheckCircleIcon className="ml-1 h-4 w-4" />
    </Badge>
  ) : code === 'PENDING' ? (
    <Badge variant="destructive">
      {convertStatus(code)}
      <ClockIcon className="ml-1 h-4 w-4" />
    </Badge>
  ) : (
    <Badge variant="destructive">
      {convertStatus(code)}
      <XCircleIcon className="ml-1 h-4 w-4" />
    </Badge>
  );
};

export default BadgeStatus;
