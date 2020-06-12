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
        fields = '__all__'


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


class ReviewSerializer(serializers.ModelSerializer):
    target = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all()
    )
    author = serializers.ReadOnlyField(source='author.id')

    class Meta:
        model = Review
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(
        queryset=Listing.objects.all()
    )
    question = serializers.ReadOnlyField()
    author = serializers.ReadOnlyField(source='author.id')
    seller = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = '__all__'

    def get_seller(self, instance):
        return UserSerializer(instance.listing.owner).data
