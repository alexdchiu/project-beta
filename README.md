# CarCar

Team:

* Bryant Irawan - sales
* Alex Chiu - service

## Design

## Service microservice

For the service microservice, I created technician and appointment models to allow users to enter new technicians and appointments into the system. Appointments and technicians have a many to one relationship (one technician can have many appointments). I also created an InventoryVinVO model for the data polled from the inventory API as this was the only property of an automobile services needed (not color, year, model, etc.). Once I got the VINs from the Inventory API, I put them in a list to compare against VINs of service appointments to see if customers were VIP or not. Within the context of the Inventory API, VINs must be unique. However, within the context of the service application, VINs did not need to be unique as one VIN could/would have multiple appointments. 

For the appointments list feature, I fetched data from the appointment API and also the inventory API. I then used conditionals on the list of appointments to show only appointments that were not finished/were still open. Additionally, I compared the VIN of an appointment to the VINs I fetched from the Inventory API to display if they were VIP or not. 

For the appointments search feature, I did similar fetches for data from the appointment API and the inventory API. However, I then only included results whose VIN included the search query VIN (or partial VIN that was entered).

Due to the project assignment and prompt, there wasn't overlap between the services and sales microservices. As such, we defined separate bounded contexts for services and sales. There was some data shared between inventory and sales and inventory and services respectively so we needed to be able to poll data from services / sales to inventory. For the service microservice, I was able to determine if a customer was VIP by comparing against VINs from the Inventory API. Realistically, that should probably be set by passing data from sales to service directly. Furthermore, in a real business setting, there would probably be a lot more overlap between service / sales since service packages are often included in sales (eg. warranties / service packages / etc.) which would require more overlap between the two contexts.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Made Customer, Saleperson, SaleRecord models as well as AutomobileVO for sales API. As other info was not needed (color, year, etc.), only polled for vin and sold (I added sold to inventory automobile) to make AutomobileVO. While I could have just put a sold property in AutomobileVO, I think realistically it would be useful for the inventory API to know if a car is sold so when I create a sale record it PUTS back to the inventory automobile model to make sold = true. It also immediately saves sold = true to AutomobileVO so someone cannot make a new sale record with that same car before the polling from automobile to automobileVO updates in 60 seconds. Officially, the bounded context for this project was meant for inventory and sales  to be in one BC and inventory and services to be in another but I think it’s more realistic for all 3 to be in one BC eventually as services shouldn’t assume that cars that were once in inventory were sold. For example, a used car could’ve been in the inventory that needs servicing before it gets sold. This should have lower priority than an actual customer’s car that needs servicing.

