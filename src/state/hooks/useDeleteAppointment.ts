import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../interfaces/IEvento';
import { eventListState } from '../atom';

const useDeleteAppointment = () => {
  const setAppointmentsList = useSetRecoilState<IEvento[]>(eventListState);

  return (appointment: IEvento) => {
    return setAppointmentsList((oldList) =>
      oldList.filter((evt) => evt.id !== appointment.id),
    );
  };
};

export default useDeleteAppointment;
