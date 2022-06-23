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
import CreateCustomer from './CreateCustomer';
import CreateSalesPerson from './CreateSalesPerson';
import CreateSalesRecord from './CreateSalesRecord';
import SaleRecordList from './SalesRecordList';
import SaleRecordByPerson from './SaleRecordByPerson';
import Automobiles from './Automobiles';
import Manufacturers from './Manufacturer';
import VehicleModels from './Vehiclemodels';


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
          <Route path="/customer/new/" element={<CreateCustomer />} />
          <Route path="/salesperson/new" element={<CreateSalesPerson />} />
          <Route path="/salerecord/new" element={<CreateSalesRecord />} />
          <Route path="/salerecord" element={<SaleRecordList />} />
          <Route path="/salerecordbyperson" element={<SaleRecordByPerson />} />
          <Route path="/automobiles" element={<Automobiles />} />
          <Route path="/manufacturers" element={<Manufacturers />} />
          <Route path="/models" element={<VehicleModels />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
