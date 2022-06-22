import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './AppointmentsList';
import AppointmentsSearch from './SearchAppointments';
import CreateAppointmentForm from './CreateAppointment';
import CreateTechnicianForm from './CreateTechnician';
import CreateManufacturer from './CreateManufacturer';
import CreateVehicleModel from './CreateVehicleModel';
import CreateAutomobile from './CreateAutomobile';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<CreateAppointmentForm />} />
          <Route path="/appointments/search" element={<AppointmentsSearch />} />
          <Route path="/technicians" element={<CreateTechnicianForm />} />
          <Route path="/manufacturers/new" element={<CreateManufacturer />} />
          <Route path="/models/new" element={<CreateVehicleModel />} />
          <Route path="/automobiles/new" element={<CreateAutomobile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
