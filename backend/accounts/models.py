from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, related_name='userprofile', on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/' , null=True)

    @receiver(post_save, sender=User)
    def save_profile(sender, instance, created, **kwargs):
        print(instance)
        if created:
            profile = UserProfile.objects.create(user=instance)  
