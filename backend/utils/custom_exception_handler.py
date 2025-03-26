from rest_framework.views import exception_handler

def custom_exception_handler(exc, context): 

    response = exception_handler(exc, context)

    execption_class = exc.__class__.__name__ 

    print(f'The Exception is : {execption_class}')

    if execption_class == "AuthenticationFailed":
        response.data = {
            'error': 'Please provide valid Password and Username. Please Try Again'
        }
    
    if execption_class == "NotAuthenticated":
        response.data = {
            'error': 'Login First to access this site!'
        }
    if execption_class == "PermissionDenied":
        response.data = {
            'error': 'Unfortunately you do not have permission to access this page!'
        }
    if execption_class == "InvalidToken":
        response.data = {
            'error': 'Your authentication token has expired. Please login again'
        }
    return response