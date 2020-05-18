from rest_framework import permissions
from django.conf import settings


class IsOwnerReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsUserReadOnly(permissions.BasePermission):
    """
    Allow write permissions only if object is the user
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request and POST request
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.method == 'POST':
            return True

        return obj == request.user


class QuestionPermissions(permissions.BasePermission):
    """
    Allow read permissions to everyone
    Allow post permissions to logged on users
    """

    def has_object_permission(self, request, view, obj):
        print(request)
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.method == 'POST':
            return True
        elif request.user in settings.AUTH_USER_MODEL.objects.all():
            if request.method == 'PATCH':
                return True
        return False
