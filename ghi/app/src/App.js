import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './AppointmentsList';
import CreateAppointmentForm from './CreateAppointment';
import CreateTechnicianForm from './CreateTechnician';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<CreateAppointmentForm />} />
          <Route path="/technicians" element={<CreateTechnicianForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
