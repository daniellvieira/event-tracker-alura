import { useRecoilValue } from 'recoil';
import { eventListState } from '../atom';

const useListAppointments = () => {
  return useRecoilValue(eventListState);
};

export default useListAppointments;
