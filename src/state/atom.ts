import { atom } from 'recoil';
import {
  IAppointmentsFilter,
  StatusEnum,
} from '../interfaces/IAppointmentsFilter';
import { IEvento } from '../interfaces/IEvento';
import { appointmentsAsync } from './selectors';

export const eventListState = atom<IEvento[]>({
  key: 'eventListState',
  default: appointmentsAsync,
});

export const appointmentsFilter = atom<IAppointmentsFilter>({
  key: 'appointmentsFilter',
  default: { status: StatusEnum.BOTH },
});
