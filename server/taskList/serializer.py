from rest_framework import serializers
from .models import TaskList, CustomUser
from django.contrib.auth.models import User

# La serialización es el proceso de convertir objetos de Python en un formato que pueda ser almacenado o transmitido. 
# assigned_to_id: es un campo personalizado que se agrega al serializador. Utiliza el atributo id del objeto assigned_to relacionado para mostrar el id del usuario asignado a la tarea.
class TaskSerializer(serializers.ModelSerializer):
    assigned_to_first_name = serializers.CharField(source='assigned_to.first_name')
    assigned_to_last_name = serializers.CharField(source='assigned_to.last_name')
    status_display = serializers.CharField(source='get_status_display')
    
    class Meta:
        model = TaskList
        fields = '__all__'
        

class UserCreationForm(serializers.ModelSerializer):
    #l campo tasks que está relacionado con el modelo TaskList, 
    # y se utiliza el serializador TaskSerializer para serializar múltiples objetos de TaskList. 
    # La opción many=True se utiliza para indicar que se serializan múltiples objetos en lugar de un solo objeto.
    tasks = TaskSerializer(many=True)
    class Meta:
        model = CustomUser
        exclude = ('password',)
