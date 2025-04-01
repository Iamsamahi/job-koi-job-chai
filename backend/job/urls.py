from django.urls import path 
from . import views 

urlpatterns = [
    path('jobs/' , views.getAllJobs, name='jobs'),
    path('jobs/new/' , views.newJob, name='new_jobs'),
    path('jobs/<str:pk>/' , views.getJob, name='job'),
    path('jobs/<str:pk>/update/' , views.updateJob, name='update_job'),
    path('jobs/<str:pk>/delete/' , views.deleteJob, name='delete_job'),
    path('stats/<str:topic>/' , views.getTopicStats, name='get_topic_stats'),
    path('jobs/<str:id>/apply/' , views.applyToJob, name='get_topic_stats'),
    path('me/jobs/applied/' , views.getCurrentAppliedJobs, name='get_current_applied_jobs'),
    path('jobs/<str:pk>/applied/' , views.isApplied, name='is_applied'),
    path('me/jobs/' , views.getCurrentUserJobs, name='get_current_user_jobs'),
]