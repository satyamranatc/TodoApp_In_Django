from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('todo/', include("TodoApp.urls")),
    path('admin/', admin.site.urls),
]
