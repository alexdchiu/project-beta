import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateCustomer from './CreateCustomer';
import CreateSalesPerson from './CreateSalesPerson';
import CreateSalesRecord from './CreateSalesRecord';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/customer/new" element={<CreateCustomer />} />
        </Routes>
        <Routes>
          <Route path="/salesperson/new" element={<CreateSalesPerson />} />
        </Routes>
        <Routes>
          <Route path="/salerecord/new" element={<CreateSalesRecord />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
