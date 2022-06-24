from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, SalesPerson, Customer, SalesRecord
from .models import Customer as CustomerModel

class AutomobileVODetailEncoder(ModelEncoder): 
    model = AutomobileVO 
    properties = ["vin", "sold"] 

class SalesPersonEncoder(ModelEncoder): 
    model = SalesPerson 
    properties = ["name", "number", "id"]

class CustomerEncoder(ModelEncoder): 
    model = Customer 
    properties = ["name", "id"]

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        # 👇️ if passed in object is instance of Decimal
        # convert it to a string
        if isinstance(obj, float):
            return str(obj)
        # 👇️ otherwise use the default behavior
        return json.JSONEncoder.default(self, obj)

class SaleRecordPriceEncoder(DecimalEncoder): 
    model = SalesRecord
    properties = ["price"]
    
class SaleRecordDetailEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["saleperson", "customer", "price", "automobile", "id"]
    encoders = {
        "saleperson": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_sale_records(request, salesperson_vo_id=None):
    if request.method == "GET":
        if salesperson_vo_id is not None:
            salerecords= SalesRecord.objects.filter(saleperson=salesperson_vo_id)
        else:
            salerecords = SalesRecord.objects.all()
        return JsonResponse(
            {"salerecord": salerecords},
            encoder= SaleRecordDetailEncoder,
        )
    #POST create sale record 
    else:
        content = json.loads(request.body)
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            if automobile.sold == True: 
                return JsonResponse(
                    {"message": "automobile already sold"},
                    status=400,
            )
            content["automobile"] = automobile

            salesperson = SalesPerson.objects.get(id=content["saleperson"])
            content["saleperson"] = salesperson 
            customer = Customer.objects.get(id=content["customer"])
            content["customer"] = customer 

            salerecord = SalesRecord.objects.create(**content)
            automobile.sold = True
            automobile.save() 
            #this is just updating automobileVO. need a way to update autmobile in inventory with PUT request
             

            return JsonResponse(
                salerecord,
                encoder=SaleRecordDetailEncoder,
                safe=False,
            )
            
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )

@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "POST":
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)  
        return JsonResponse(
        customer,
        encoder=CustomerEncoder,
        safe=False,
    )
    else: 
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder= CustomerEncoder,
        )


@require_http_methods(["GET", "POST"])
def api_salesperson(request):
    if request.method == "POST":
        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)  
        return JsonResponse(
        salesperson,
        encoder=SalesPersonEncoder,
        safe=False,
    )
    else: 
        saleperson = SalesPerson.objects.all()
        return JsonResponse(
            {"saleperson": saleperson},
            encoder= SalesPersonEncoder,
        )

# @require_http_methods(["GET"])
# def api_salesperson_by_salesperson(request):
#     if request.method == "POST":
#         content = json.loads(request.body)
#         salesperson = SalesPerson.objects.create(**content)  
#         return JsonResponse(
#         salesperson,
#         encoder=SalesPersonEncoder,
#         safe=False,
#     )
#     else: 
#         saleperson = SalesPerson.objects.all()
#         return JsonResponse(
#             {"saleperson": saleperson},
#             encoder= SalesPersonEncoder,
#         )
