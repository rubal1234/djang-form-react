from django.db import models

# Create your models here.

class Form(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=120) 
    dob   =  models.CharField(max_length=20)
    number = models.IntegerField()

    def _str_(self):
        return self.name