import { useRecoilValue } from 'recoil';
import { filteredAppointmentsState } from '../selectors';

const useListAppointments = () => {
  return useRecoilValue(filteredAppointmentsState);
};

export default useListAppointments;
