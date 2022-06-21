from sqlite3 import Date, Time
from xmlrpc.client import DateTime
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from datetime import date, time
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
  properties = ['name', 'number', 'id']

class DateEncoder(json.JSONEncoder):
  def default (self, o):
    if isinstance(o, date):
      return o.isoformat()

    return json.JSONEncoder.default(self, o)

class TimeEncoder(json.JSONEncoder):
  def default (self, o):
    if isinstance(o, time):
      return o.isoformat()

    return json.JSONEncoder.default(self, o)

class AppointmentListEncoder(ModelEncoder):
  model = Appointment
  properties = ["id", "vin", "owner", "date", "time", "technician", "reason"]
  encoders = {
    "technician": TechnicianDetailEncoder(),
    "date": DateEncoder(),
    "time": TimeEncoder(),
  }

class AppointmentDetailEncoder(ModelEncoder):
  model = Appointment
  properties = [
    "id",
    "vin",
    "owner",
    "date",
    "time",
    "technician",
    "reason",
  ]
  encoders = {
    "technician": TechnicianDetailEncoder(),
    "date": DateEncoder(),
    "time": TimeEncoder(),
  }

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
  if request.method == "GET":
    appointments = Appointment.objects.all()
    print(appointments)
    return JsonResponse (
      {"appointments": appointments},
      encoder = AppointmentListEncoder,
    )
  
  else:
    content = json.loads(request.body)
    try:
      technician = Technician.objects.get(id=content['technician'])
      content['technician'] = technician
    except Technician.DoesNotExist:
      return JsonResponse(
        {"message": "Invalid technician id"},
        status=400,
      )
    
    appointment = Appointment.objects.create(**content)
    return JsonResponse(
      appointment,
      encoder = AppointmentListEncoder(),
      safe = False,
    )

# @require_http_methods(["GET"])
# def api_list_vins(request):
#   vins = Vin.objects.all()
#   return JsonResponse(
#     {"vins": vins},
#     encoder = VinListEncoder,
#   )

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
  if request.method == "GET":
    technicians = Technician.objects.all()
    return JsonResponse(
      {"technicians": technicians},
      encoder = TechnicianDetailEncoder,
    )
  
  else:
    try:
      content = json.loads(request.body)
      technician = Technician.objects.create(**content)
      return JsonResponse(
        technician,
        encoder=TechnicianDetailEncoder,
        safe=False,
      )
    except:
      response = JsonResponse(
          {"message": "Could not create the technician"}
      )
      response.status_code = 400
      return response

@require_http_methods(["GET"])
def api_list_inventory_vin(request):
  inventory_vin_vos = InventoryVinVO.objects.all()
  return JsonResponse(
    {"inventory_vins": inventory_vin_vos},
    encoder = InventoryVinVOListEncoder,
  )


@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
  count, _ = Appointment.objects.filter(id=pk).delete()
  return JsonResponse({"deleted": count > 0})