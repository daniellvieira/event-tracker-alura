import { selector } from 'recoil';
import { StatusEnum } from '../../interfaces/IAppointmentsFilter';
import { IEvento } from '../../interfaces/IEvento';
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

export const appointmentsAsync = selector({
  key: 'appointmentsAsync',
  get: async () => {
    const responseHttp = await fetch('http://localhost:8080/eventos');
    const appointmentJson: IEvento[] = await responseHttp.json();
    return appointmentJson.map((appointment) => ({
      ...appointment,
      inicio: new Date(appointment.inicio),
      fim: new Date(appointment.fim),
    }));
  },
});
