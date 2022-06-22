from django.db import models

# Create your models here.
# class Vin(models.Model):
#   vin = models.CharField(max_length=17, unique=True)
#   # color = models.CharField(max_length=50)
#   # year = models.PositiveSmallIntegerField()
#   # model = models.CharField(max_length=100)

#   def __str__(self):
#     return self.vin

class InventoryVinVO(models.Model):
  vin = models.CharField(max_length=17, unique=True)

  def __str__(self):
    return self.vin


class Technician(models.Model):
  name = models.CharField(max_length=100)
  number = models.CharField(max_length=100)

  def __str__(self):
    return self.name


class Appointment(models.Model):
  vin = models.CharField(max_length=17)
  owner = models.CharField(max_length=100)
  date = models.DateField()
  time = models.TimeField()
  technician = models.ForeignKey(
    Technician,
    related_name="appointments",
    on_delete=models.CASCADE,
  )
  reason = models.TextField()
  finished = models.BooleanField(default=False)

  def __str__(self):
    return f'{self.id} - {self.vin}'

