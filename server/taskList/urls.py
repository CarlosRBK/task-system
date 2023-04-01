from django.urls import path
from .views import TaskListView, CreateUserView, listTasksView

urlpatterns = [
    path('taskList/', TaskListView.as_view(), name='taskList'),
    path('register/', CreateUserView.as_view(),name='register'),
    path('adminTasks/', listTasksView,name="adminTasks"),
]
