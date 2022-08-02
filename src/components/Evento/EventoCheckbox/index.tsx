import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import useUpdateAppointment from '../../../state/hooks/useUpdateAppointment';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const updateAppointment = useUpdateAppointment();

  const changeStatus = () => {
    const changedEvent = { ...evento, completo: !evento.completo }
    updateAppointment(changedEvent)
  }

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  return (<i className={estilos.join(' ')} onClick={changeStatus}></i>)
}

export default EventoCheckbox