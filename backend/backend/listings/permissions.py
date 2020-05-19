from rest_framework import permissions


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
    Allow patch permissions to seller
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.method == 'PATCH' and request.user == obj.seller:
            return True
        return False
