from rest_framework import serializers
from .models import TaskList, CustomUser
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
        

class UserCreationForm(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
