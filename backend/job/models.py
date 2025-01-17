from django.db import models
from datetime import *
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.gis.db import models as gismodel
from django.contrib.gis.geos import Point 
from django.contrib.auth.models import User

# Create your models here.

class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Internship = 'Internship'
class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    Phd = 'Phd'
class Industry(models.TextChoices):
    Business = 'Business'
    IT = 'Information Technology'
    Banking = 'Banking'
    Education = 'Education or Training'
    Medical = 'Medical'
    Telecommunication = 'Tele Communiction'
    Sports= 'Sports'
    Others = 'Others'
class Experience(models.TextChoices):
    NO_EXPERIENCE = 'No Experience'
    ONE_YEAR = '1 Years'
    TWO_YEAR = '2 Years'
    TWO_YEAR_PLUS = 'More than 2 years'

def return_date_time(): 
    now = datetime.now() 
    return now + timedelta(days=10)

class Job(models.Model): 
    title = models.CharField(max_length=250 ,null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=150 , null=True)
    jobType = models.CharField(max_length=50, choices=JobType.choices, default=JobType.Permanent)
    education = models.CharField(max_length=50, choices=Education.choices, default=Education.Bachelors)
    industry = models.CharField(max_length=50, choices=Industry.choices, default=Industry.Business)
    experience = models.CharField(max_length=50, choices=Experience.choices, default=Experience.NO_EXPERIENCE)
    salary = models.IntegerField(default=1 , validators=[MinValueValidator(1) , MaxValueValidator(1000000)])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100 , null=True)
    point = gismodel.PointField(default=Point(0.0 , 0.0))
    lastDate = models.DateField(default=return_date_time)
    user = models.ForeignKey(User , on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)