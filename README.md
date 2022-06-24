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

