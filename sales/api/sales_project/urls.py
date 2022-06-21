"""sales_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sales_rest.views import api_list_sale_records, api_customer, api_salesperson

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        "salerecords/",
        api_list_sale_records,
        name="list_sale_records",
    ),
    path(
        "salerecord/new/",
        api_list_sale_records,
        name="create_sales_record",
    ),
    path(
        "customer/new/",
        api_customer,
        name="create_customer",
    ),
    path(
        "customer/",
        api_customer,
        name="list_customers",
    ),
        path(
        "salesperson/new/",
        api_salesperson,
        name="create_salesperson",
    ),
    path(
        "salesperson/",
        api_salesperson,
        name="list_salesperson",
    ),
    path(
         "salesperson/<int:salesperson_vo_id>/salesrecord/",
        api_list_sale_records,
        name="list_sale_records_for_sales_person",
    ),
]
