from rest_framework import viewsets, permissions
from .permissions import IsOwnerReadOnly, IsUserReadOnly, QuestionPermissions
from listings.models import Listing, User, Review, Question
from listings.serializers import (
    ListingSerializer,
    UserSerializer,
    ReviewSerializer,
    QuestionSerializer
)


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [
        IsUserReadOnly
    ]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    permission_classes = [
        QuestionPermissions
    ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
