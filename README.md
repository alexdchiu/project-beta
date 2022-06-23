# CarCar

Team:

* Person 1 - Which microservice? Bryant Irawan Sales 
* Person 2 - Which microservice?

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Made Customer, Saleperson, SaleRecord models as well as AutomobileVO. Only pulled vin and sold (I added sold to inventory automobile). While I could have just put a sold in AutomobileVO, I think realistically it would be useful for the inventory API to know if a car is sold so when I create a sale record it PUTS back to the inventory automobile model to make sold = true. It also immediately saves sold = true to automobileVO so someone cannot make a new sale record with that same car before the polling from automobile to automobileVO updates. 

