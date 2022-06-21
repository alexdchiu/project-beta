from django.db import models

# Create your models here.
class AutomobileVO(models.Model): 
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

    def __str__(self):
        return self.vin

class SalesPerson(models.Model): 
    name = models.CharField(max_length=200)
    number = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.name


class Customer(models.Model): 
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class SalesRecord(models.Model): 
    saleperson = models.ForeignKey(SalesPerson, related_name="salepersons", on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name="customers", on_delete=models.CASCADE) 
    price = models.CharField(max_length=200)
    automobile = models.ForeignKey(AutomobileVO, related_name="automobiles", on_delete=models.CASCADE) 

