from django.urls import path
from .views import taskListView, registerUserView

app_name = 'taskList'

urlpatterns = [
    path('taskList/',taskListView, name='taskList'),
    path('registerUser/', registerUserView, name='registerUser'),
]