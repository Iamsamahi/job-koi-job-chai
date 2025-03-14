from django.urls import path 
from . import views 

urlpatterns = [
    path('register/' , views.register, name='register'),
    path('myself/' , views.currentUser, name='current_user'),
    path('myself/update/' , views.updateUser, name='update_user')
]