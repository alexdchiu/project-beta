from django.contrib import admin

# Register your models here.
from .models import Technician, Appointment, InventoryVinVO

# @admin.register(Vin)
# class VinVOAdmin(admin.ModelAdmin):
#   pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
  pass

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
  pass

@admin.register(InventoryVinVO)
class InventoryVinVOAdmin(admin.ModelAdmin):
  pass