import React from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import useUpdateAppointment from '../../state/hooks/useUpdateAppointment';
import useListAppointments from '../../state/hooks/useListAppointments';

interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const events = useListAppointments();
  const eventosKalend = new Map<string, IKalendEvento[]>();
  const updateAppointment = useUpdateAppointment();

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
      updateAppointment(updatedAppointment)
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