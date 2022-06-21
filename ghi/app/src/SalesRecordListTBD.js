function SalesList(props) {
    return (<table className="table .table-striped">
    <thead>
      <tr>
        <th>Sale Person</th>
        <th>Customer</th>
        <th>Automobile</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
{props.salerecords.map(sale => {
return (
<tr key={sale.id}>
  {/* <td>{ sale.saleperson.name }</td>
  <td>{ sale.customer.name }</td> */}
  <td>{ sale.price }</td>
  {/* <td>{ sale.automobile.vin }</td> */}
</tr>
);
})}
    </tbody>
  </table>)


}

export default SalesList;