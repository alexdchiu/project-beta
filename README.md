# CarCar

Team:

* Bryant Irawan - sales
* Alex Chiu - service

## Design

## Service microservice

For the service microservice, I created technician and appointment models to allow users to enter new technicians and appointments into the system. I also created an InventoryVinVO model to poll from the inventory API. Once I got the list of VINs from the Inventory API, I put them in a list to compare against VINs of service appointments to see if they were VIP or not. 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Made Customer, Saleperson, SaleRecord models as well as AutomobileVO. Only pulled vin and sold (I added sold to inventory automobile). While I could have just put a sold in AutomobileVO, I think realistically it would be useful for the inventory API to know if a car is sold so when I create a sale record it PUTS back to the inventory automobile model to make sold = true. It also immediately saves sold = true to automobileVO so someone cannot make a new sale record with that same car before the polling from automobile to automobileVO updates. 

