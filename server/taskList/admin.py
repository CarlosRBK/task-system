
from django.contrib import admin
from .models import TaskList, CustomUser

# Register your models here.


admin.site.register(TaskList)
admin.site.register(CustomUser)