import { selector } from 'recoil';
import { StatusEnum } from '../../interfaces/IAppointmentsFilter';
import { appointmentsFilter, eventListState } from '../atom';

export const filteredAppointmentsState = selector({
  key: 'filteredAppointmentsState',
  get: ({ get }) => {
    const filter = get(appointmentsFilter);
    const allAppointments = get(eventListState);

    const appointments = allAppointments.filter((appointment) => {
      if (!filter.data) return true;

      const isSameDate =
        filter.data.toISOString().slice(0, 10) ===
        appointment.inicio.toISOString().slice(0, 10);

      let isSameStaus = false;
      if (filter.status === StatusEnum.BOTH) {
        isSameStaus = true;
      } else if (filter.status === StatusEnum.COMPLETE) {
        isSameStaus = appointment.completo;
      } else {
        isSameStaus = !appointment.completo;
      }

      return isSameDate && isSameStaus;
    });

    return appointments;
  },
});
