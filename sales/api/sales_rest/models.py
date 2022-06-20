from django.db import models

# Create your models here.
class AutomobileVO(models.Model): 
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()
    href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.year + self.vin + self.color 

class SalesPerson(models.Model): 
    name = models.CharField(max_length=200)
    number = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Customer(models.Model): 
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class SalesRecord(models.Model): 
    saleperson = models.ForeignKey(SalesPerson, related_name="salerecords", on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name="customers", on_delete=models.CASCADE) 
    price = models.DecimalField(max_digits=100, decimal_places=2)
    automobile = models.ForeignKey(AutomobileVO, related_name="automobiles", on_delete=models.CASCADE) 

    def __str__(self):
        return self.automobile + ' sold by ' + self.saleperson + ' sold to ' + self.customer 
