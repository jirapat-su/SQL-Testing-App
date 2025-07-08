import { addHours } from 'date-fns'

import { BigCalendar } from '@/src/components/big-calendar'

export default function Page() {
  return (
    <div className="p-4">
      <BigCalendar
        events={[
          {
            allDay: false,
            end: addHours(new Date(), 1),
            start: addHours(new Date(), 2),
            title: 'Sample Event 1',
          },
          {
            allDay: false,
            end: addHours(new Date(), 3),
            start: addHours(new Date(), 4),
            title: 'Sample Event 2',
          },
          {
            allDay: false,
            end: addHours(new Date(), 5),
            start: addHours(new Date(), 6),
            title: 'Sample Event 3',
          },
        ]}
        onSelectEvent={ev => {
          alert(`Selected event: ${ev.title}`)
        }}
      />
    </div>
  )
}
