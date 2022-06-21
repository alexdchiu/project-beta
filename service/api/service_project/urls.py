"""service_project URL Configuration

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
from service_rest.views import api_list_appointments, api_list_technicians, api_list_inventory_vin, api_delete_appointment

urlpatterns = [
    path('admin/', admin.site.urls),
    path('appointments/', api_list_appointments, name="list_appointments"),
    path('appointments/<int:pk>', api_delete_appointment, name="delete_appointment"),
    path('inventoryvins/', api_list_inventory_vin, name="list_inventory_vins"),
    path('technicians/', api_list_technicians, name="list_technicians"),
]
