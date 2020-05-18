from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from listings.models import User, Listing, Question
from listings.serializers import UserSerializer, QuestionSerializer


class QuestionTest(APITestCase):
    """
    Module for testing question model and endpoint
    """
    user = 0                # Listing author
    author = 0              # question author
    listing = 0             # listing to post question to
    question = 0

    def setUp(self):
        self.user = User.objects.create(
            email='tester1@gmail.com',
            display_name='listing author'
        )

        self.author = User.objects.create(
            email='tester2@gmail.com',
            display_name='question author'
        )

        self.listing = Listing.objects.create(
            price=15.4,
            title='testing',
            description='listing to post question to',
            postal_code=42000,
            owner=self.user
        )

        self.question = Question.objects.create(
            listing=self.listing,
            question='Is this working?',
            author=self.author,
        )

    def test_database_returns_question(self):
        """Test that the database returns the question"""
        self.assertEqual(
            QuestionSerializer(self.question).data,
            QuestionSerializer(Question.objects.get(id=1)).data
        )

    def test_derived_field_seller(self):
        """Test that the derived field seller returns correct user"""
        question = QuestionSerializer(self.question).data
        seller = question['seller']
        self.assertEqual(
            UserSerializer(self.user).data,
            UserSerializer(seller).data
        )

    def test_api_returns_questions(self):
        """Test that the api returns questions"""
        client = APIClient()
        response = client.get('/api/questions/')
        print(response.data)
        question = response.data['results'][0]
        self.assertEqual(
            question,
            QuestionSerializer(self.question).data
        )
