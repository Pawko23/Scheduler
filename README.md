# React Scheduler App

This is a simple **Scheduler** application that allows users to create, edit and delete appointments on a calendar. The application is connected to a Firestore databasee, ensuring that all appointments are stored and updated in real-time. Application is available at: [https://pawko23.github.io/Scheduler/](https://pawko23.github.io/Scheduler/)

## Features

* **Create appointments**: Users can create appointments by double-clicking the empty space in the calendar
* **Edit appointments**: Users can edit an existing appointment by clicking on it and then selecting the edit icon in the popup window that appears.
* **Delete appointments**: Users can delete an appointment using the same process as editing by clicking delete icon in the popup
* **Firestore Integration**: All apointments are saved and updated in real-time using Firestore as the database

## Technologies

* **React**: The front-end of the app is built with React
* **React Scheduler** Library: A third-party library used to display and manage the scheduling calendar
* **Firebase Firestore**: A NoSQL database used to store and synchronize appointment data

## Instalation

Open the application online: [https://pawko23.github.io/Scheduler/](https://pawko23.github.io/Scheduler/)

Or setup the application in your IDE:
1. Clone the repo with ```git clone https://github.com/Pawko23/Scheduler.git```
2. Navigate to the ```Scheduler``` directory
3. Run ```npm install``` to install all the necessary packages
4. Run ```npm start```. App will be available at ```http://localhost:5173/```

## Future Improvements

The application is open for new features, such as:
* User authentication to allow users to manage their personal appointments
* Nottifications or reminders of the upcoming events
* Enhanced UI/UX improvements

## Data Access Limitations

In order to ensure security of the application and protect the data, the following Firestore security rules are currently in place:
- **Read**: All users are allowed to read data from the Firestore Database
- **Write (Add, Edit, Delete)**: Since there is not any authorization system implemented in the application, all write operations are blocked. Users cannot add, edit or delete data.
