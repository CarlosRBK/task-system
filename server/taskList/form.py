
from django import forms
from .models import TaskList


class TaskListForm(forms.ModelForm):
    class Meta:
        model = TaskList
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control'
            }),
            'assigned_to': forms.Select(attrs={
                'class': 'form-control'
            })
        }