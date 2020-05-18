from rest_framework import serializers
from listings.models import Listing, User, Review, Question


class ListingSerializer(serializers.ModelSerializer):
    questions = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Listing
        fields = [
            'id',
            'price',
            'title',
            'description',
            'created',
            'postal_code',
            'owner',
            'questions',
        ]


class UserSerializer(serializers.ModelSerializer):
    listings = ListingSerializer(many=True, read_only=True)
    reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    given_reviews = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )
    password = serializers.HiddenField(default='password')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
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
            "password"
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
    author = serializers.ReadOnlyField(source='author.id')
    seller = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'id',
            'listing',
            'created',
            'question',
            'reply',
            'author',
            'seller'
        ]

    def get_seller(self, instance):
        return UserSerializer(instance.listing.owner).data
