export interface ServiceReport {
  id?: number;
  dateFrom: string;
  dateUntil: string;
  serviceIdentification: string;
  staffIdentification: string;
  week: number;
  hourFrom: string;
  hourUntil: string;
}
