import { atom } from 'recoil';
import {
  IAppointmentsFilter,
  StatusEnum,
} from '../interfaces/IAppointmentsFilter';
import { IEvento } from '../interfaces/IEvento';

export const eventListState = atom<IEvento[]>({
  key: 'eventListState',
  default: [
    {
      descricao: 'Estudar React',
      inicio: new Date('2022-07-30T09:00'),
      fim: new Date('2022-07-30T13:00'),
      completo: false,
      id: 1642342747,
    },
    {
      descricao: 'Estudar Recoil',
      inicio: new Date('2022-07-31T09:00'),
      fim: new Date('2022-07-31T11:00'),
      completo: false,
      id: 1642342959,
    },
  ],
});

export const appointmentsFilter = atom<IAppointmentsFilter>({
  key: 'appointmentsFilter',
  default: { status: StatusEnum.BOTH },
});
