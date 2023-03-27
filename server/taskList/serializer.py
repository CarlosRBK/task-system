from rest_framework import serializers
from .models import TaskList
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
        

class UserViewForm(serializers.Serializer):
    class Meta:
        model = User
        fields = "__all__"
        
        
        
class UserCreationFormSerializer(serializers.Serializer):
    username = serializers.CharField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def create(self, validated_data):
        form = UserCreationForm(validated_data)
        if form.is_valid():
            user = form.save()
            return user
        else:
            raise serializers.ValidationError(form.errors)
