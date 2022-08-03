import { selector } from 'recoil';
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
      return isSameDate;
    });

    return appointments;
  },
});
