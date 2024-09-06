import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase/firebase';

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


function App() {

  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState('2024-09-04');
  const [currentView, setCurrentView] = useState('Day');

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'appointments'))

      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAppointments(data);
    } catch (error) {
      console.error("Fetching appointments failed...", error);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  }

  console.log(appointments);


  const addAppointment = async (newAppointment) => {
    try {
      await addDoc(collection(firestore, 'appointments'), newAppointment);
      fetchAppointments();
    } catch (error) {
      console.error("Adding appointment failed...", error);
    }
  }

  const editAppointment = async (id, updatedAppointment) => {
    try {
      const appointmentDoc = doc(firestore, 'appointments', id);
      await updateDoc(appointmentDoc, updatedAppointment);
      fetchAppointments();
    } catch (error) {
      console.error("Editing appointment failed...", error);
    }
  }

  const deleteAppointment = async (id) => {
    try {
      const appointmentDoc = doc(firestore, 'appointments', id);
      await deleteDoc(appointmentDoc);
      fetchAppointments();
    } catch (error) {
      console.error("Deleting appointemt failed...", error);
    }
  }


  return (
    <Paper>
      <Scheduler data={appointments}>
        
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
