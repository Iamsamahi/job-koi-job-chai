from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import SignUpSerializer , UserSerializer
from django.contrib.auth.models import User
import requests
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer
import requests
import hmac
import hashlib
import time
from urllib.parse import urlencode
from .validators import validate_file_extensions


# Create your views here.

@api_view(['POST'])
def register(request): 
    data = request.data 

    user = SignUpSerializer(data = data) 

    if user.is_valid():
        if not User.objects.filter(username = data['email']).exists():
            user = User.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'],
                username = data['email'],
                email = data['email'],
                password = make_password(data['password']),      
            )
            return Response({
                'message': 'User has been successfully registered'}, 
                status=status.HTTP_200_OK
            )

        else: 
            return Response({
                'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST
            )
    
    else: 
        return Response(user.errors)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request): 
    user = UserSerializer(request.user)
    
    return Response(user.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    data = request.data 
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '' :
        user.password = make_password(data['password'])
    user.save()
    serializer = UserSerializer(user , many =False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])

def uploadResume(request):
    user = request.user
    resume = request.FILES['resume']
    
    if resume == '':
        return Response({'error' :'Please upload your resume'})
   
    isValidFile = validate_file_extensions(resume.name)
    if not isValidFile:
        return Response({'error' : 'File type not supported. Please upload a PDF file.'})

    


    
    
    serializer = UserSerializer(user , many = False)
    
    user.userprofile.resume = resume
    user.userprofile.save()
    
    return Response(serializer.data)

