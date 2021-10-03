import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { DateRanges } from './date.interfaces';

dayjs.extend(advancedFormat);
dayjs.locale('en');

@Injectable()
export class DateService {
  getDate(date: Date = null) {
    return dayjs(date);
  }

  getFormattedDate(date: Date = null, format: string) {
    return dayjs(date).format(format);
  }

  getCurrentRange(rangeType: 'week' | 'month'): DateRanges {
    return {
      startDate: dayjs().startOf(rangeType).toDate(),
      endDate: dayjs().endOf(rangeType).toDate(),
    };
  }
}
