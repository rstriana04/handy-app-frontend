export interface ServiceReport {
  id?: number;
  dateFrom: string;
  dateUntil: string;
  serviceIdentification: string;
  staffIdentification: string;
  week: number;
  day?: number;
  totalHours?: number;
}
