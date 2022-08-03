import React from 'react';
import useListAppointments from '../../state/hooks/useListAppointments';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';

const ListaDeEventos: React.FC<{ 
  aoFiltroAplicado: (data: Date | null) => void
}> = ({ aoFiltroAplicado }) => {

  const events = useListAppointments();

  return (<section>
    <Filtro aoFiltroAplicado={aoFiltroAplicado} />
    <div className={style.Scroll}>
      {events.map(evento => (
        <Evento evento={evento} key={evento.id} />
      ))}
    </div>
  </section>)
}

export default ListaDeEventos;
