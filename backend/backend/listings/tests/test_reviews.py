from rest_framework.test import APIClient, APITransactionTestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from listings.models import User, Listing, Review
from listings.serializers import ReviewSerializer


class ReviewTest(APITransactionTestCase):
    """
    Test module for testing Reviews model, serializer and viewset
    """
    user = 0            # user to be reviewed
    author = 0          # review author
    author2 = 0
    listing = 0
    review = 0

    access_token = 0
    refresh_token = 0

    def setUp(self):
        self.user = User.objects.create(
            email='tester@gmail.com',
            display_name='tester'
        )
        self.author = User.objects.create(
            email='author@gmail.com',
            display_name='author'
        )
        self.author2 = User.objects.create(
            email='author2@gmail.com',
            display_name='author2'
        )
        self.listing = Listing.objects.create(
            price=15.5,
            title='testing',
            description='testing',
            postal_code=42000,
            owner=self.user
        )
        self.review = Review.objects.create(
            feedback='NEUTRAL',
            review='Tests working randomly',
            target=self.user,
            author=self.author
        )

        refresh = RefreshToken.for_user(self.author2)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

    def test_database_returns_review(self):
        """Test that the database returns the review"""
        review = Review.objects.get(id=self.review.id)
        self.assertEqual(
            ReviewSerializer(review).data,
            ReviewSerializer(self.review).data
        )

    def test_api_returns_review_list(self):
        """Test that the api return the review through list endpoint"""
        client = APIClient()
        response = client.get('/api/reviews/')
        review = response.data['results'][0]
        self.assertEqual(
            review,
            ReviewSerializer(self.review).data
        )

    def test_api_returns_review_detail(self):
        """Test that the api returns the review through detail endpoint"""
        client = APIClient()
        response = client.get(f'/api/reviews/{self.review.id}/')
        review = response.data
        self.assertEqual(
            review,
            ReviewSerializer(self.review).data
        )

    def test_api_review_posting_unauthorized(self):
        """Test that a review cannot be posted without credentials"""
        client = APIClient()
        response = client.post(
            '/api/reviews/',
            {
                'feedback': 'NEGATIVE',
                'review': 'no comment',
                'target': self.user.id
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    def test_api_review_posting_authorized(self):
        """Test that a review can be posted with credentials"""
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.access_token
        )
        response = client.post(
            '/api/reviews/',
            {
                'feedback': 'POSITIVE',
                'review': 'This should post',
                'target': self.user.id
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            ReviewSerializer(Review.objects.get(id=response.data['id'])).data
        )

    def test_api_review_posting_twice(self):
        """
        Test that a single user cannot post two reviews for a single target
        """
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.access_token
        )
        response = client.post(
            '/api/reviews/',
            {
                'feedback': 'POSITIVE',
                'review': 'This should post',
                'target': self.user.id
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response = client.post(
            '/api/reviews/',
            {
                'feedback': 'POSITIVE',
                'review': 'This should not post',
                'target': self.user.id
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(2, len(Review.objects.all()))
