import React, { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase/firebase';
import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  AppointmentForm,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

function App() {

  const actualDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(actualDate());
  const [currentView, setCurrentView] = useState('Day');

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'appointments'));
      const appointments = querySnapshot.docs.map(doc => {
        const data = doc.data();
  
        const startDate = data.startDate.toDate();
        const endDate = data.endDate.toDate();
  
        return {
          id: doc.id,
          ...data,
          startDate,
          endDate
        };
      });
      
      setData(appointments);
    } catch (error) {
      console.error("Fetching appointments failed...", error);
    }
  };
  

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  }

  const commitChanges = async ({ added, changed, deleted }) => {
      let newData = [...data];
      if (added) {
        try {
          const docRef = await addDoc(collection(firestore, 'appointments'), added);
          newData = [...newData, { id: docRef.id, ...added }];
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
      if (changed) {
        const changedIds = Object.keys(changed);
      
        for (let tempId of changedIds) {
          const changedAppointment = changed[tempId];
          try {
            const appointmentToUpdate = newData.find(appointment => appointment.id === tempId);

            if (!appointmentToUpdate) {
              console.error(`No matching appointment found for temp ID: ${tempId}`);
              continue;
            }
      
            const docRef = doc(firestore, 'appointments', appointmentToUpdate.id);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
              console.error(`No document to update: ${appointmentToUpdate.id}`);
              continue;
            }
            
            await updateDoc(docRef, changedAppointment);
            newData = newData.map(appointment =>
              appointment.id === appointmentToUpdate.id ? { ...appointment, ...changedAppointment } : appointment
            );

          } catch (error) {
            console.error("Error updating document: ", error);
          }
        }
      }
      
      if (deleted !== undefined) {
        try {
          const appointmentToDelete = newData.find(appointment => appointment.id === deleted);
          if(!appointmentToDelete) {
            console.error(`No matching appointment found for ID: ${deleted}`);
            return;
          }

          await deleteDoc(doc(firestore, 'appointments', appointmentToDelete.id));

          newData = newData.filter(appointment => appointment.id !== deleted);
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      }

      setData(newData);
  };

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={(date) => setCurrentDate(date)}
          currentViewName={currentView}
          onCurrentViewNameChange={handleViewChange}
        />
        <EditingState onCommitChanges={commitChanges}/>
        <DayView startDayHour={9} endDayHour={14} name="Day" />
        <IntegratedEditing />
        <WeekView startDayHour={9} endDayHour={14} name="Week" />
        <MonthView name="Month" />
        
        <Appointments />
        <AppointmentTooltip 
          showOpenButton
          showDeleteButton
          showCloseButton
        />
        <AppointmentForm/>
        <Toolbar />
        <ViewSwitcher
          currentViewName={currentView}
          onCurrentViewNameChange={handleViewChange}
        />
      </Scheduler>
    </Paper>
  );
}

export default App;