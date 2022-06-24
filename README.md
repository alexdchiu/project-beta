# CarCar

Team:

* Bryant Irawan - sales
* Alex Chiu - service

## Design

## Service microservice

For the service microservice, I created technician and appointment models to allow users to enter new technicians and appointments into the system. Appointments and technicians have a many to one relationship (one technician can have many appointments). I also created an InventoryVinVO model for the data polled from the inventory API as this was the only property of automobile from the Inventory API that the service microservice needed (not color, year, model, etc.). Once I got the VINs from the Inventory API, I put them in a list to compare against VINs of service appointments to see if customers were VIP or not. Within the context of the Inventory API, VINs must be unique. However, within the context of the service application, VINs did not need to be unique as one VIN could/would have multiple appointments. 

For the appointments list feature, I fetched data from the appointment API and also the inventory API. I then used conditionals on the list of appointments to show only appointments that were not finished/were still open. Additionally, I compared the VIN of an appointment to the VINs I fetched from the Inventory API to display if they were VIP or not within the JSX. An example of the service appointments list can be found below:

{
	"appointments": [
		{
			"id": 10,
			"vin": "JH4DC4340RS0TEST1",
			"owner": "Bryant",
			"date": "2022-06-24",
			"time": "18:28:00",
			"technician": {
				"name": "adam tech",
				"number": "123",
				"id": 1
			},
			"reason": "cracked mirror",
			"finished": false
		},
		{
			"id": 8,
			"vin": "servicetestasVIN5",
			"owner": "Hank",
			"date": "2022-08-22",
			"time": "08:12:00",
			"technician": {
				"name": "TEST TECH2",
				"number": "888",
				"id": 2
			},
			"reason": "loud noise",
			"finished": false
		},
		{
			"id": 1,
			"vin": "servicetestVIN123",
			"owner": "G Chang",
			"date": "2022-06-21",
			"time": "02:19:33",
			"technician": {
				"name": "adam tech",
				"number": "123",
				"id": 1
			},
			"reason": "blown tire",
			"finished": false
		}
  ]
}

For this I followed RESTful API standards and my view was set to accept GET and POST requests. My AppointmentListEncoder was utilized to include all properties of an appointment in the response. I had to incorporate separate encoders to get details of technicians for an appointment and also to make sure date and time were formatted correctly to be JSON serializable. I set up a separate view to handle PUT and DELETE requests of specific instances of appointments. 

For the appointments search feature, I did similar fetches for data from the appointment API and the inventory API. However, I then only included results whose VIN included the search query VIN (or partial VIN that was entered).

Due to the project assignment and prompt, there wasn't overlap between the services and sales microservices. As such, we defined separate bounded contexts for services and sales. This way each business line (service / sales) could best design / build its service to address its specific needs / requirements. Within each BC, we could ensure that all models / VOs / entities / terms / definitions / concepts were consistent. There was some data shared between inventory and sales and inventory and services respectively so we needed to be able to poll data from inventory to services / sales (we also added some functionality so that sales could update the sold property of a specific automobile to prevent the same automobile from being sold twice). For the service microservice, I was able to determine if a customer was VIP by comparing against VINs from the Inventory API. Realistically, that should probably be set by passing data from sales to service directly. Furthermore, in a real business setting, there would probably be a lot more overlap between service / sales since service packages are often included in sales (eg. warranties / service packages / etc.) which would require more overlap between the two contexts.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

Made Customer, Saleperson, SaleRecord models as well as AutomobileVO for sales API. As other info was not needed (color, year, etc.), only polled for vin and sold (I added sold to inventory automobile) to make AutomobileVO. While I could have just put a sold property in AutomobileVO, I think realistically it would be useful for the inventory API to know if a car is sold so when I create a sale record it PUTS back to the inventory automobile model to make sold = true. It also immediately saves sold = true to AutomobileVO so someone cannot make a new sale record with that same car before the polling from automobile to automobileVO updates in 60 seconds. Officially, the bounded context for this project was meant for inventory and sales  to be in one BC and inventory and services to be in another but I think it's more realistic for all 3 to be in one BC eventually as services shouldn't assume that cars that were once in inventory were sold. For example, a used car could've been in the inventory that needs servicing before it gets sold. This should have lower priority than an actual customer's car that needs servicing. 

Sales API has several view functions that can be used. The sale record API combines all the information from the other API functions. Below is an example of a sale record list. It follows RESTful API standards and accepts GET and POST requests. Inside the response body of the sale record list, it uses the SalesPersonEncoder to generate name/number/id properties of saleperson, CustomerEncoder to generate name/id of customer, and finally AutomobileVOencoder to generate vin/sold.                       


{
	"salerecord": [
		{
			"saleperson": {
				"name": "Peter",
				"number": "909090",
				"id": 1
			},
			"customer": {
				"name": "Mike",
				"id": 1
			},
			"price": "1231.00",
			"automobile": {
				"vin": "1231245"
			},
			"id": 12
		},
		{
			"saleperson": {
				"name": "Mike",
				"number": "9090901",
				"id": 5
			},
			"customer": {
				"name": "Mike",
				"id": 1
			},
			"price": "1231.00",
			"automobile": {
				"vin": "1231245"
			},
			"id": 13
		},
	]
}

