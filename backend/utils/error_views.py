from django.http import JsonResponse

def handler500(request):  
    message = (' Internal Server Error')
    response = JsonResponse(data={'error': message})
    response.status_code = 500
    return response

def handler404(request, exception=None):  
    message = (' Route Not found')
    response = JsonResponse(data={'error': message})
    response.status_code = 404 
    return response

