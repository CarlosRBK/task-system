from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskList, CustomUser
from .serializer import TaskSerializer, UserCreationForm

# Importaciones para la vista en django
from django.shortcuts import render
from django.http import JsonResponse
from .form import TaskListForm

# Vistas Django
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
                            task.created_at.strftime('%d/%m/%y ||  %H:%M:%S'),
                            task.updated_at.strftime('%d/%m/%y ||  %H:%M:%S')   
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
class TaskListView(APIView):
    def get(self, request):
        tasks = TaskList.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CreateUserView(APIView):
    def get(self,request):
        users = CustomUser.objects.all()
        print(users)
        serializer = UserCreationForm(users, many=True)
        return Response(serializer.data)
    
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UserCreationForm(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)