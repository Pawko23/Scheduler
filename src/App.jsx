import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';

const schedulerData = [
  { startDate: '2024-09-04T09:45', endDate: '2024-09-04T11:00', title: 'Meeting' },
  { startDate: '2024-09-04T12:00', endDate: '2024-09-04T13:30', title: 'Go to a gym' },
]

function App() {

  const [currentDate, setCurrentDate] = useState('2024-09-04');
  const [currentView, setCurrentView] = useState('Day');

  const handleViewChange = (view) => {
    setCurrentView(view);
  }

  return (
    <Paper>
      <Scheduler data={schedulerData}>
        
        <ViewState 
          currentDate={currentDate} 
          onCurrentDateChange={(date) => setCurrentDate(date)}
          currentViewName={currentView}
          onCurrentViewNameChange={handleViewChange}  
        />

        <DayView startDayHour={9} endDayHour={14} name="Day"/>
        <WeekView startDayHour={9} endDayHour={14} name="Week"/>
        <MonthView name="Month"/>
        
        <Appointments />
        <Toolbar />
        <ViewSwitcher
          currentViewName={currentView}
          onCurrentViewNameChange={handleViewChange}
        />
      </Scheduler>
    </Paper>
  )
}

export default App
