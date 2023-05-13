from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskList, CustomUser
from .serializer import TaskListSerializer, TaskCreateSerializer, UserCreateSerializer, UserListSerializer

# Importaciones para la vista en django
from django.shortcuts import render
from django.http import JsonResponse
from .form import TaskListForm
from django.contrib.auth.decorators import login_required


def listTasksView(request):
    if request.method == 'GET':
        form = TaskListForm()
        return render(request, 'taskList.html', {'title': 'Tasks', 'form':form})
    
    if request.method == 'POST':
        try:
            data = {}
            action = request.POST['action']
            if action == 'search':
                tasks = TaskList.objects.all()
                list = []
                for task in tasks:
                    list.append([
                            task.id,
                            task.name,
                            task.assigned_to.username,
                            task.get_status_display(),
                            task.created_at.strftime('Fecha: %d/%m/%y Hora: %H:%M:%S'),
                            task.updated_at.strftime('Fecha: %d/%m/%y Hora:  %H:%M:%S'),
                            f'{task.assigned_to.first_name} {task.assigned_to.last_name}' if len(f'{task.assigned_to.first_name} {task.assigned_to.last_name}') > 5 else "Vacio",
                            task.assigned_to.phone_number,
                            task.assigned_to.address if len(task.assigned_to.address) > 2 else "Vacio",           
                        ])
                print(list)
                return JsonResponse(list, safe=False)
            elif action == 'cargar':
                form = TaskListForm(request.POST)
                if form.is_valid():
                    form.save()
                    return JsonResponse(data, safe=False)
                else:
                    data['error'] = form.errors
                    return JsonResponse(data,safe=False)
            elif action == 'edit':
                pk = request.POST['id']
                objeto = TaskList.objects.get(pk=pk)
                form = TaskListForm(request.POST, instance=objeto)
                if form.is_valid():
                    form.save()
                    return JsonResponse(data, safe=False)
                else:
                    data['error'] = form.errors
                    return JsonResponse(data,safe=False)
            elif action == 'delete':
                try:
                    pk = request.POST['data']
                    objeto = TaskList.objects.get(pk=pk)
                    objeto.delete()
                    return JsonResponse(data, safe=False)
                except Exception as e:
                    data['error'] = f'Error de excepcion en el servidor: {str(e)}'
                    return JsonResponse(data,safe=False)
        except Exception as e:
            data['error'] = str(e)
            return JsonResponse(data, safe=False)

# Vistas RestApi
# APIView es una clase proporcionada por Django Rest Framework que se utiliza como base para definir vistas personalizadas.
class TaskListView(APIView):
        def get(self, request):
            tasks = TaskList.objects.all()
            # El argumento tasks se pasa como el objeto que se va a serializar, y many=True indica que hay varios objetos a serializar.
            serializer = TaskListSerializer(tasks, many=True)
            #es una propiedad que devuelve un diccionario de datos serializados.
            return Response(serializer.data)

        def post(self, request):
            #estauramos esos tipos de datos nativos en un diccionario de datos validados. 
            serializer = TaskCreateSerializer(data=request.data)
            if serializer.is_valid(): 
                #True
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateUserView(APIView):
    
    def get(self,request):
        users = CustomUser.objects.all()
        serializer = UserListSerializer(users, many=True)
        return Response(serializer.data)


    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    