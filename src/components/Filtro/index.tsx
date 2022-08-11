import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IAppointmentsFilter, StatusEnum } from '../../interfaces/IAppointmentsFilter';
import { appointmentsFilter } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('')
  const [status, setStatus] = useState<string>(StatusEnum.COMPLETE)

  const setAppointmentFilter = useSetRecoilState<IAppointmentsFilter>(appointmentsFilter)

  const handleChange = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(evento.target.value)
  }

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const filter: IAppointmentsFilter = {
      data: data ? new Date(data) : null,
      status: status
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
      value={data}
    />

    <label>Situação</label>
    <select
      value={status}
      onChange={evento => handleChange(evento)}
      className={style.input}
    >
      <option value={StatusEnum.COMPLETE}>Completos</option>
      <option value={StatusEnum.UNCOMPLETE}>Incompletos</option>
      <option value={StatusEnum.BOTH}>Ambos</option>
    </select>


    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro