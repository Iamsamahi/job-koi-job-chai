from django.db import models
from datetime import *
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.gis.db import models as gismodel
from django.contrib.gis.geos import Point 
from django.contrib.auth.models import User
import requests
import urllib.parse  # Added for URL encoding
import os

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
    Sports = 'Sports'
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
    title = models.CharField(max_length=250, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=150, null=True)
    jobType = models.CharField(max_length=50, choices=JobType.choices, default=JobType.Permanent)
    education = models.CharField(max_length=50, choices=Education.choices, default=Education.Bachelors)
    industry = models.CharField(max_length=50, choices=Industry.choices, default=Industry.Business)
    experience = models.CharField(max_length=50, choices=Experience.choices, default=Experience.NO_EXPERIENCE)
    salary = models.IntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(1000000)])
    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)
    point = gismodel.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        print("Entering Job.save method")
        api_key = os.environ.get('GEOCODER_API')
        if not api_key:
            print("Geoapify API key missing")
            self.point = Point(0.0, 0.0)
        elif not self.address or not self.address.strip():
            print("Address is empty or whitespace")
            self.point = Point(0.0, 0.0)
        else:
            # URL-encode the address to handle special characters
            encoded_address = urllib.parse.quote(self.address.strip())
            geoapify_url = f"https://api.geoapify.com/v1/geocode/search?text={encoded_address}&apiKey={api_key}"
            print(f"Geocoding address: {self.address}")
            print(f"Geoapify URL: {geoapify_url}")
            try:
                response = requests.get(geoapify_url, timeout=5)
                print(f"Geoapify Status: {response.status_code}")
                response.raise_for_status()  # Raise for non-200 status
                data = response.json()
                print(f"Geoapify Response: {data}")
                if data.get('features') and len(data['features']) > 0:
                    coords = data['features'][0]['geometry']['coordinates']
                    if len(coords) == 2 and all(isinstance(c, (int, float)) for c in coords):
                        print(f"Coordinates found: {coords}")
                        self.point = Point(float(coords[0]), float(coords[1]))  # lng, lat
                    else:
                        print("Invalid coordinates format")
                        self.point = Point(0.0, 0.0)
                else:
                    print("No geocoding results found")
                    self.point = Point(0.0, 0.0)
            except requests.exceptions.RequestException as e:
                print(f"Geoapify geocoding failed: {e}")
                self.point = Point(0.0, 0.0)
        print(f"Saving job with point: {self.point}")
        super(Job, self).save(*args, **kwargs)

class CandidatesApplied(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200)
    appliedAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Applied for {self.job.title}"