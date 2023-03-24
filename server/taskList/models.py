
from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class TaskList(models.Model):
    name = models.CharField(max_length=200)
    assigned_to = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='user')

    def __str__(self):
        return self.name

