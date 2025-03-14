from django.urls import path 
from . import views 

urlpatterns = [
    path('register/' , views.register, name='register'),
    path('myself/' , views.currentUser, name='current_user'),
    # path('accounts/new/' , views.newJob, name='new_accounts'),
    # path('accounts/<str:pk>/' , views.getJob, name='accounts'),
    # path('accounts/<str:pk>/update/' , views.updateJob, name='update_accounts'),
    # path('accounts/<str:pk>/delete/' , views.deleteJob, name='delete_account'),
    # path('stats/<str:topic>' , views.getTopicStats, name='get_topic_stats'),
]