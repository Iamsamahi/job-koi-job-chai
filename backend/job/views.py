from datetime import timezone
from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from .models import Job ,CandidatesApplied
from .serializers import JobSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django.db.models import Avg , Min , Max , Count
from .filters import JobsFilter
from rest_framework.permissions import IsAuthenticated


# Create your views here.

@api_view(['GET'])
def getAllJobs(request): 

    filterset = JobsFilter(request.GET , queryset=Job.objects.all().order_by('id')) 
    count = filterset.qs.count()
    
     #Pagination
    resPerPage =3  
    paginator = PageNumberPagination()  
    paginator.page_size = resPerPage
    queryset = paginator.paginate_queryset(filterset.qs,request)

    serializer = JobSerializer(queryset , many = True)
    return Response({
            "count" : count,
            "resPerPage" : resPerPage ,
            'jobs' : serializer.data 
    })
   

@api_view(['GET']) 
def getJob(request , pk): 
    job = get_object_or_404(Job , id=pk)
    serializer = JobSerializer(job , many = False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):
    request.data['user'] = request.user
    data = request.data 
    job = Job.objects.create(**data)
    serializer = JobSerializer(job , many =False)
    return Response(serializer.data)

@api_view(['PUT']) 
@permission_classes([IsAuthenticated])
def updateJob(request , pk): 
    job = get_object_or_404(Job , id=pk)

    if job.user != request.user: 
        return Response({ 'message' : 'You cannot update this job'}, status=status.HTTP_403_FORBIDDEN)

    if 'title' in request.data:
        job.title = request.data['title']
    if 'description' in request.data:
        job.description = request.data['description']
    if 'email' in request.data:
        job.email = request.data['email']
    if 'address' in request.data:
        job.address = request.data['address']
    if 'jobType' in request.data:
        job.jobType = request.data['jobType']
    if 'education' in request.data:
        job.education = request.data['education']
    if 'industry' in request.data:
        job.industry = request.data['industry']
    if 'experience' in request.data:
        job.experience = request.data['experience']
    if 'salary' in request.data:
        job.salary = request.data['salary']
    if 'positions' in request.data:
        job.positions = request.data['positions']
    if 'company' in request.data:
        job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)

@api_view(['DELETE']) 
@permission_classes([IsAuthenticated])
def deleteJob(request , pk):
    job = get_object_or_404(Job , id = pk)

    if job.user != request.user: 

        return Response({ 'message' : 'You cannot delete this job'}, status=status.HTTP_403_FORBIDDEN)
    job.delete()
    return Response({'message' : 'Job is deleted Successfully.'}, status=status.HTTP_200_OK)    

@api_view(['GET'])
def getTopicStats(request ,topic):
    args = {'title__icontains' : topic}
    jobs =Job.objects.filter(**args)

    if len(jobs) == 0: 
        return Response({'message': 'No stats found for {topic}'.format(topic=topic)})
    
    stats = jobs.aggregate(
        total_jobs = Count('title'),
        avg_positions = Avg('positions'),
        avg_salary = Avg('salary'),
        min_salary = Min('salary'),
        max_salary = Max('salary')

    )

    return Response (stats)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyToJob(request , pk): 
    job = get_object_or_404(Job , id=pk)
    user = request.user

    if user.profile.resume == None:
        return Response({'message' : 'Please upload your resume'}, status=status.HTTP_400_BAD_REQUEST)

    if job.lastDate < timezone.now().date():
        return Response({'message' : 'Last date to apply has passed.'}, status=status.HTTP_400_BAD_REQUEST)
    
    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()
    if alreadyApplied: 
        return Response({'message' : 'You have already applied for this job'}, status=status.HTTP_400_BAD_REQUEST)


    if job.user == user: 
        return Response({'message' : 'You cannot apply for your own job'}, status=status.HTTP_403_FORBIDDEN)

    if job.positions <= 0: 
        return Response({'message' : 'No positions available'}, status=status.HTTP_400_BAD_REQUEST)

    jobApplied = CandidatesApplied.objects.create(
        job = job,
        user = user,
        resume = user.profile.resume
    )

    return Response(
        {
            'applied' : True,
            'job_id' : jobApplied.id,       
         }, status=status.HTTP_200_OK)