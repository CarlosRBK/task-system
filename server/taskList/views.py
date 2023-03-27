from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskList
from .serializer import TaskSerializer, UserCreationFormSerializer, UserViewForm
from django.contrib.auth.models import User

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
        users = User.objects.all()
        print(users)
        serializer = UserViewForm(users, many=True)
        return Response(serializer.data)
    
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UserCreationFormSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)