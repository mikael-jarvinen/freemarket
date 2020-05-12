from rest_framework import serializers
from listings.models import Listing, User, Review, Question


class ListingSerializer(serializers.ModelSerializer):
    questions = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Question.objects.all()
    )

    class Meta:
        model = Listing
        fields = [
            'id',
            'price',
            'title',
            'description',
            'created',
            'postal_code',
            'author',
            'questions'
        ]


class UserSerializer(serializers.ModelSerializer):
    listings = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Listing.objects.all()
    )
    reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Review.objects.all()
    )
    given_reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Review.objects.all()
    )

    class Meta:
        model = User
        fields = [
            'id',
            'created',
            'display_name',
            'full_name',
            'email',
            'description',
            'website',
            'listings',
            'reviews',
            'given_reviews'
        ]


class ReviewSerializer(serializers.ModelSerializer):
    target = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Review
        fields = [
            'id',
            'feedback',
            'review',
            'target',
            'author',
            'created'
        ]


class QuestionSerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(
        queryset=Listing.objects.all()
    )
    author = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )

    class Meta:
        model = Question
        fields = [
            'id',
            'listing',
            'created',
            'question',
            'reply',
            'author'
        ]
