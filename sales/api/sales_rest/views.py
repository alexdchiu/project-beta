from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord

class AutomobileVODetailEncoder(ModelEncoder): 
    model = AutomobileVO 
    properties = ["color", "year", "vin", "sold", "href"] 

class SalesPerson(ModelEncoder): 
    model = SalesPerson 
    properties = ["name", "number"]

class Customer(ModelEncoder): 
    model = Customer 
    properties = ["name", "address", "phone"]
    
class SaleRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["salerecord", "customer", "price", "id"]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
    }
    def get_extra_data(self, o):
        return {
            "automobile href": o.automobile.href, 
        }

@require_http_methods(["GET", "POST"])
def api_list_sale_records(request, salesperson_vo_id=None):
    if request.method == "GET":
        if salesperson_vo_id is not None:
            salerecords= SalesRecord.objects.filter(salesperson=salesperson_vo_id)
        else:
            salerecords = SalesRecord.objects.all()
        return JsonResponse(
            {"salerecords": salerecords},
            encoder= SaleRecordDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(href=content["automobile"])
            if automobile.sold == True: 
                return JsonResponse(
                    {"message": "automobile already sold"},
                    status=400,
            )
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )
        salerecord = SalesRecord.objects.create(**content)
        return JsonResponse(
            salerecord,
            encoder=SaleRecordDetailEncoder,
            safe=False,
        )
@require_http_methods(["GET", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else: 
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

