import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
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
        </Routes>
        <Routes>
          <Route path="/customer/new/" element={<CreateCustomer />} />
        </Routes>
        <Routes>
          <Route path="/salesperson/new" element={<CreateSalesPerson />} />
        </Routes>
        <Routes>
          <Route path="/salerecord/new" element={<CreateSalesRecord />} />
        </Routes>
        <Routes>
          <Route path="/salerecord" element={<SaleRecordList />} />
        </Routes>
        <Routes>
          <Route path="/salerecordbyperson" element={<SaleRecordByPerson />} />
        </Routes>
        <Routes>
          <Route path="/automobiles" element={<Automobiles />} />
        </Routes>
        <Routes>
          <Route path="/manufacturers" element={<Manufacturers />} />
        </Routes>
        <Routes>
          <Route path="/models" element={<VehicleModels />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
