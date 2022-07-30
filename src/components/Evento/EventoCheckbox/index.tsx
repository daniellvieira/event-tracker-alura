import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../../interfaces/IEvento';
import { eventListState } from '../../../state/atom';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const setAppointmentsList = useSetRecoilState<IEvento[]>(eventListState);
  const changeStatus = () => {
    const changedEvent = { ...evento, completo: !evento.completo }

    setAppointmentsList(oldList => {
      const index = oldList.findIndex(evt => evt.id === evento.id)
      return [...oldList.slice(0, index), changedEvent, ...oldList.slice(index + 1)]
    })
  }

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  return (<i className={estilos.join(' ')} onClick={changeStatus}></i>)
}

export default EventoCheckbox