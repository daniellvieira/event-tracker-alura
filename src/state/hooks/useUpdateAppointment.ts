import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../interfaces/IEvento';
import { eventListState } from '../atom';

const useUpdateAppointment = () => {
  const setAppointmentsList = useSetRecoilState<IEvento[]>(eventListState);

  return (appointment: IEvento) => {
    return setAppointmentsList((oldList) => {
      const index = oldList.findIndex((evt) => evt.id === appointment.id);
      return [
        ...oldList.slice(0, index),
        appointment,
        ...oldList.slice(index + 1),
      ];
    });
  };
};

export default useUpdateAppointment;
