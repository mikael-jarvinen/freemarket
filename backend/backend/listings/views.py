from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from django.db.utils import IntegrityError
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import (
    IsOwnerReadOnly,
    IsUserReadOnly,
    QuestionPermissions,
    ReviewPermissions
)
from .models import Listing, User, Review, Question
from .serializers import (
    ListingSerializer,
    UserSerializer,
    ReviewSerializer,
    QuestionSerializer,
)
from .filters import ListingFilter


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    filter_backends = (
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend
    )
    filterset_class = ListingFilter
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'price', 'created']

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields = ['email']
    filter_backends = (filters.SearchFilter,)

    def perform_create(self, serializer):
        serializer.save(password=self.request.data['password'])

    permission_classes = [
        IsUserReadOnly
    ]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    permission_classes = [
        ReviewPermissions
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def handle_exception(self, exc):
        if isinstance(exc, IntegrityError):
            data = {
                'success': 'false',
                'code': 'INTEGRITY_UNIQUE_ERROR',
                'message': str(exc)
            }
            return Response(
                data=data,
                status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return super().handle_exception(exc)


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    permission_classes = [
        QuestionPermissions
    ]

    def perform_create(self, serializer):
        listing_id = self.request.data['listing']
        seller_id = ListingSerializer(
            Listing.objects.get(id=listing_id)
        ).data['owner']
        serializer.save(
            author=self.request.user,
            seller=User.objects.get(id=seller_id)
        )
