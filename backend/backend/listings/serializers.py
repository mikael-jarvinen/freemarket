from rest_framework import serializers
from .models import Listing, User, Review, Question


class UserSerializer(serializers.ModelSerializer):
    listings = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    given_reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = [
            'id',
            'created',
            'display_name',
            'full_name',
            'email',
            'biography',
            'website',
            'listings',
            'reviews',
            'given_reviews',
            'avatar'
        ]


class QuestionSerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(
        queryset=Listing.objects.all()
    )
    author = UserSerializer(read_only=True)
    seller = serializers.ReadOnlyField(source='seller.id')

    class Meta:
        model = Question
        fields = '__all__'


class ListingSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Listing
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    target = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Review
        fields = '__all__'
