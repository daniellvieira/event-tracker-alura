import React from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { eventListState } from '../../state/atom';
import { IEvento } from '../../interfaces/IEvento';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const events = useRecoilValue(eventListState);
  const eventosKalend = new Map<string, IKalendEvento[]>();
  const setAppointmentsList = useSetRecoilState<IEvento[]>(eventListState);

  events.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })

  const onEventDragFinish: OnEventDragFinish = (
    kalendPrevEvent: CalendarEvent,
    kalendUpdatedEvent: CalendarEvent
  ) => {
    const event = events.find(event=> event.descricao === kalendUpdatedEvent.summary)
    if (event) {
      const updatedAppointment = {
        ...event,
        inicio: new Date(kalendUpdatedEvent.startAt),
        fim: new Date(kalendUpdatedEvent.endAt),
      }

      setAppointmentsList(oldList => {
        const index = oldList.findIndex(evt => evt.id === event.id)
        return [...oldList.slice(0, index), updatedAppointment, ...oldList.slice(index + 1)]
      })
    }
  };

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario