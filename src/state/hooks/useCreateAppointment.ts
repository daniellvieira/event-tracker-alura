import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../interfaces/IEvento';
import { getId } from '../../utils/uuid';
import { eventListState } from '../atom';

const useCreateAppointment = () => {
  const setAppointmentsList = useSetRecoilState<IEvento[]>(eventListState);

  return (appointment: IEvento) => {
    const today = new Date();
    if (appointment.inicio < today) {
      throw new Error(
        'Eventos não podem ser cadastrados com data menor a atual.',
      );
    }
    appointment.id = getId();
    return setAppointmentsList((oldList) => [...oldList, appointment]);
  };
};

export default useCreateAppointment;
