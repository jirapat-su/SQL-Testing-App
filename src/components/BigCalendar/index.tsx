import type { Event } from 'react-big-calendar'

import { Box } from '@mui/material'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { th } from 'date-fns/locale/th'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import './dark-theme.css'

const locales = { th }
const localizer = dateFnsLocalizer({ format, getDay, locales, parse, startOfWeek })

type BigCalendarProps = {
  events: Event[]
  height?: number | string
  onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void
}

const noopOnSelectEvent = (_ev: Event, _e: React.SyntheticEvent<HTMLElement>) => {}

export default function BigCalendar({ events, height = '500px', onSelectEvent = noopOnSelectEvent }: BigCalendarProps) {
  return (
    <Box style={{ height }}>
      <Calendar
        culture='th'
        endAccessor='end'
        events={events}
        localizer={localizer}
        messages={{
          agenda: 'กำหนดการ',
          allDay: 'ทั้งวัน',
          date: 'วันที่',
          day: 'วัน',
          event: 'กิจกรรม',
          month: 'เดือน',
          next: 'ถัดไป',
          noEventsInRange: 'ไม่มีเหตุการณ์ในช่วงนี้',
          previous: 'ก่อนหน้า',
          showMore: (total) => `+ เพิ่มอีก ${total} รายการ`,
          time: 'เวลา',
          today: 'วันนี้',
          tomorrow: 'พรุ่งนี้',
          week: 'สัปดาห์',
          work_week: 'สัปดาห์ทำงาน',
          yesterday: 'เมื่อวานนี้',
        }}
        onSelectEvent={onSelectEvent}
        startAccessor='start'
        style={{ height: '100%' }}
        views={['month', 'week', 'day', 'agenda']}
      />
    </Box>
  )
}
