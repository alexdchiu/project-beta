import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadSaleRecords() {
  const response = await fetch('http://localhost:8090/salerecords/');
  if (response.ok) {
    const data = await response.json() 
    console.log('data from index.js: ', data)
    root.render(
      <React.StrictMode>
        <App salerecords={data.salerecords} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadSaleRecords();
