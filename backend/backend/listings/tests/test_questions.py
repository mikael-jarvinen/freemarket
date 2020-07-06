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

    access_token = 0
    refresh_token = 0

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
            seller=self.user
        )

        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

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
            UserSerializer(self.user).data['id'],
            seller
        )

    def test_api_returns_questions(self):
        """Test that the api returns questions"""
        client = APIClient()
        response = client.get('/api/questions/')
        question = response.data['results'][0]
        self.assertEqual(
            question,
            QuestionSerializer(self.question).data
        )

    def test_api_returns_question(self):
        client = APIClient()
        response = client.get(f'/api/questions/{self.question.id}/')
        question = response.data
        self.assertEqual(
            question,
            QuestionSerializer(self.question).data
        )

    def test_api_question_posting_unauthorized(self):
        client = APIClient()
        response = client.post(
            '/api/questions/',
            {
                'listing': self.listing.id,
                'question': 'This should not post',
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    def test_api_question_posting_authorized(self):
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.access_token
        )
        response = client.post(
            '/api/questions/',
            {
                'listing': self.listing.id,
                'question': 'This should post',
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED
        )
        self.assertEqual(
            response.data['seller'],
            UserSerializer(self.user).data['id']
        )
