import React from 'react';
import useListAppointments from '../../state/hooks/useListAppointments';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';

const ListaDeEventos: React.FC = () => {

  const appointments = useListAppointments();

  return (<section>
    <Filtro />
    <div className={style.Scroll}>
      {appointments.map(evento => (
        <Evento evento={evento} key={evento.id} />
      ))}
    </div>
  </section>)
}

export default ListaDeEventos;
