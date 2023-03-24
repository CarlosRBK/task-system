
from django.shortcuts import render, HttpResponseRedirect
from .models import TaskList
from .form import TaskListForm
from django.urls import reverse_lazy
from django.middleware.csrf import get_token
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse

def taskListView(request):
    template_name = 'taskList.html'
    
    if request.method == 'GET':
        task = TaskList.objects.select_related('assigned_to')
        form = TaskListForm()
        return render(request, template_name, {'task':task,'form':form})
    
    if request.method == 'POST':
        template_name = reverse_lazy('taskList:taskList')
        form = TaskListForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(template_name)
        
        
def registerUserView(request):
    print(request.POST)
    template_name = reverse_lazy('taskList:taskList')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(template_name)
    else:
        csrf_token = get_token(request)
        print(csrf_token)
        form = UserCreationForm()
        return JsonResponse({'token':csrf_token})
    
  
