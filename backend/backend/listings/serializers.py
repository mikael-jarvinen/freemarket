from rest_framework import serializers
from listings.models import Listing, User, Review, Question, FEEDBACK_CHOICES

class ListingSerializer(serializers.ModelSerializer):
  questions = serializers.PrimaryKeyRelatedField(many=True)

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
  reviews = serializers.PrimaryKeyRelatedField(many=True)
  given_reviews = serializers.PrimaryKeyRelatedField(many=True)
  
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
  target = serializers.PrimaryKeyRelatedField()
  author = serializers.PrimaryKeyRelatedField()

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
  listing = serializers.PrimaryKeyRelatedField()
  author = serializers.PrimaryKeyRelatedField()

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