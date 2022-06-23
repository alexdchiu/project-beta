from django.contrib import admin

# Register your models here.
from sales_rest.models import AutomobileVO, SalesPerson, Customer, SalesRecord 

@admin.register(AutomobileVO) 
class AutomobileVO(admin.ModelAdmin):
    pass 

@admin.register(SalesPerson)
class SalesPerson(admin.ModelAdmin):
    pass

@admin.register(Customer)
class Customer(admin.ModelAdmin):
    pass

@admin.register(SalesRecord)
class SalesRecord(admin.ModelAdmin):
    pass