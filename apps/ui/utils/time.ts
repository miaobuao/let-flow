import dayjs, { Dayjs } from 'dayjs';

export function isExpired(datetime: Dayjs) {
  return datetime.isBefore(dayjs());
}
