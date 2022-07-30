import React from 'react';
import { useRecoilValue } from 'recoil';
import { eventListState } from '../../state/atom';
import Evento from '../Evento';
import Filtro from '../Filtro';
import style from './ListaDeEventos.module.scss';

const ListaDeEventos: React.FC<{ 
  aoAlterarStatus: (id: number) => void, 
  aoFiltroAplicado: (data: Date | null) => void
}> = ({ aoAlterarStatus, aoFiltroAplicado }) => {

  const events = useRecoilValue(eventListState);

  return (<section>
    <Filtro aoFiltroAplicado={aoFiltroAplicado} />
    <div className={style.Scroll}>
      {events.map(evento => (
        <Evento aoAlterarStatus={aoAlterarStatus} evento={evento} key={evento.id} />
      ))}
    </div>
  </section>)
}

export default ListaDeEventos;
