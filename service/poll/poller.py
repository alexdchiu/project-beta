import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import VinVO

def get_vins():
    response = requests.get("http://wardrobe-api:8100/api/automobiles/")
    content = json.loads(response.content)
    for automobile in content["automobiles"]:
        VinVO.objects.update_or_create(
            href= automobile["href"],
            defaults={
                "vin": automobile["vin"],
            }
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
