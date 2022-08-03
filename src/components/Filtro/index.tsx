import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IAppointmentsFilter } from '../../interfaces/IAppointmentsFilter';
import { appointmentsFilter } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')

  const setAppointmentFilter = useSetRecoilState<IAppointmentsFilter>(appointmentsFilter)
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const filter: IAppointmentsFilter = {
      data: data ? new Date(data) : null
    } as IAppointmentsFilter;
    setAppointmentFilter(filter)
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />

    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro