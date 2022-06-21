from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, InventoryVinVO

# Create your views here.
# class VinListEncoder(ModelEncoder):
#   model = Vin
#   properties = ["vin"]

class InventoryVinVOListEncoder(ModelEncoder):
  model = InventoryVinVO
  properties = ["vin"]

class TechnicianDetailEncoder(ModelEncoder):
  model = Technician
  properties = ['name', 'number']


class AppointmentListEncoder(ModelEncoder):
  model = Appointment
  properties = ["vin", "owner", "date", "time", "technician", "reason"]
  encoders = {
    "technician": TechnicianDetailEncoder(),
  }

class AppointmentDetailEncoder(ModelEncoder):
  model = Appointment
  properties = [
    "vin",
    "owner",
    "date",
    "time",
    "technician",
    "reason",
  ]
  encoders = {
    "technician": TechnicianDetailEncoder(),
  }

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
  if request.method == "GET":
    appointments = Appointment.objects.all()
    return JsonResponse (
      {"appointments": appointments},
      encoder = AppointmentListEncoder,
    )
  
  else:
    content = json.loads(request.body)
    appointment = Appointment.objects.create(**content)
    return JsonResponse(
      appointment,
      encoder = AppointmentDetailEncoder(),
    )

# @require_http_methods(["GET"])
# def api_list_vins(request):
#   vins = Vin.objects.all()
#   return JsonResponse(
#     {"vins": vins},
#     encoder = VinListEncoder,
#   )

@require_http_methods(["GET"])
def api_list_technicians(request):
  technicians = Technician.objects.all()
  return JsonResponse(
    {"technicians": technicians},
    encoder = TechnicianDetailEncoder,
  )

@require_http_methods(["GET"])
def api_list_inventory_vin(request):
  inventory_vin_vos = InventoryVinVO.objects.all()
  return JsonResponse(
    {"inventory_vins": inventory_vin_vos},
    encoder = InventoryVinVOListEncoder,
  )