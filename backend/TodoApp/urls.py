from django.urls import path

from .views import *

urlpatterns = [
    path('getAll',getAllTodoItems),
    path('addTodo',addTodoItem),

]
