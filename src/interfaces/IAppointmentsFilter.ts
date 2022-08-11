export enum StatusEnum {
  COMPLETE = 'complete',
  UNCOMPLETE = 'uncomplete',
  BOTH = 'both',
}

export interface IAppointmentsFilter {
  data?: Date | null;
  status: StatusEnum;
}
