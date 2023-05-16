from rest_framework import serializers
from .models import TaskList, CustomUser
from django.contrib.auth.models import User

# La serialización es el proceso de convertir objetos de Python en un formato que pueda ser almacenado o transmitido. 
# assigned_to_id: es un campo personalizado que se agrega al serializador. Utiliza el atributo id del objeto assigned_to relacionado para mostrar el id del usuario asignado a la tarea.

#Este serializador se utilizara para mostrar la lista de tareas serializadas, con datos adicionales
class TaskListSerializer(serializers.ModelSerializer):
    assigned_to_first_name = serializers.CharField(source='assigned_to.first_name')
    assigned_to_last_name = serializers.CharField(source='assigned_to.last_name')
    status_display = serializers.CharField(source='get_status_display')
    class Meta:
        model = TaskList
        fields = '__all__'
    
# Este serializador se utilizara para crear una tarea nueva    
class TaskCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'
        
   
 # Esto muestra la lista de usuario con cada tarea relacionado al mismo       
class UserListSerializer(serializers.ModelSerializer):
    tasks = TaskListSerializer(many=True)
    
    class Meta:
        model = CustomUser
        exclude = ('password',)


# esto se utilizara para crear un nuevo usuario
class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ('password',)

