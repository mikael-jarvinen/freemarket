from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User, Listing
from .serializers import UserSerializer, ListingSerializer


class UserTest(APITestCase):
    """Test module for users"""

    INITIAL_USERS = [0, 0]

    def setUp(self):
        self.INITIAL_USERS[0] = User.objects.create(
            email='tester1@gmail.com',
            display_name='tester1'
        )
        self.INITIAL_USERS[1] = User.objects.create(
            email='tester2@gmail.com',
            display_name='tester2',
            full_name='tester two',
            biography='User here for testing',
            website='http://tester2.com'
        )

    def test_database_returns_users(self):
        """Test that the database returns users"""
        self.assertEqual(
            User.objects.get(id=self.INITIAL_USERS[0].id),
            self.INITIAL_USERS[0]
        )
        self.assertEqual(
            User.objects.get(id=self.INITIAL_USERS[1].id),
            self.INITIAL_USERS[1]
        )

    def test_api_returns_users(self):
        """Test that the API returns users"""
        client = APIClient()
        response = client.get('/api/users/', format='json')
        tester1 = response.data['results'][0]
        tester2 = response.data['results'][1]
        self.assertEqual(
            tester1,
            UserSerializer(self.INITIAL_USERS[0]).data
        )
        self.assertEqual(
            tester2,
            UserSerializer(self.INITIAL_USERS[1]).data
        )

    def test_api_returns_user(self):
        """Test that the api returns single user"""
        client = APIClient()
        user_id = self.INITIAL_USERS[0].id
        response = client.get(f'/api/users/{user_id}/', format='json')
        self.assertEqual(
            response.data,
            UserSerializer(self.INITIAL_USERS[0]).data
        )

    def test_api_posting_users(self):
        client = APIClient()
        response = client.post(
            '/api/users/',
            {
                'email': 'tester3@gmail.com',
                'display_name': 'tester3',
            },
            format='json'
        )
        self.assertEqual(
            response.data,
            UserSerializer(User.objects.get(id=3)).data
        )
        response = client.post(
            '/api/users/',
            {
                'email': 'tester4@gmail.com',
                'display_name': 'tester4',
                'full_name': 'tester 4',
                'biography': 'tester number 4',
                'website': 'http://testers.com',
                'password': 'secret'
            },
            format='json'
        )
        self.assertEqual(
            response.data,
            UserSerializer(User.objects.get(id=4)).data
        )


class AuthorizationTest(APITestCase):
    """
    Test module for testing authorization
    """
    access_token = 0
    refresh_token = 0

    def setUp(self):
        user = User.objects.create(
            email='tester@gmail.com',
            display_name='tester'
        )
        user.set_password('verylongpassword')
        user.save()

        refresh = RefreshToken.for_user(user)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

    def test_api_returns_tokens(self):
        """Test that the api returns access and refresh tokens"""
        client = APIClient()
        response = client.post(
            '/api/token/',
            {
                'email': 'tester@gmail.com',
                'password': 'verylongpassword'
            }
        )
        self.assertIsNotNone(response.data['refresh'])
        self.assertIsNotNone(response.data['access'])

    def test_user_details_patch_unauthorized(self):
        """Test that without token request is unauthorized"""
        client = APIClient()
        response = client.patch(
            '/api/users/1/',
            {
                'display_name': 'changed'
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED
        )

    def test_user_details_path_authorized(self):
        """Test that with token request is authorized"""
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.access_token
        )
        response = client.patch(
            '/api/users/1/',
            {
                'display_name': 'changed'
            }
        )
        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )
        self.assertEqual(
            response.data['display_name'],
            'changed'
        )


class ListingTest(APITestCase):
    """
    Test module for testing endpoint for Listing model
    """

    access_token = 0
    refresh_token = 0

    listing1 = 0
    listing2 = 0

    def setUp(self):
        user = User.objects.create(
            email='tester@gmail.com',
            display_name='tester'
        )
        user.set_password('verylongpassword')
        user.save()

        refresh = RefreshToken.for_user(user)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

        self.listing1 = Listing.objects.create(
            price=15.5,
            title='testing1',
            description='very good listing for testing',
            postal_code=42000,
            owner=user
        )

        self.listing2 = Listing.objects.create(
            price=66.9,
            title='testing2',
            description='testing',
            postal_code=54000,
            owner=user
        )

    def test_database_returns_listings(self):
        """Test that the database returns listings"""
        listing1 = Listing.objects.get(id=self.listing1.id)
        listing2 = Listing.objects.get(id=self.listing2.id)

        self.assertEqual(self.listing1, listing1)
        self.assertEqual(self.listing2, listing2)

    def test_api_returns_listings(self):
        """Test that the api returns listings"""
        client = APIClient()
        response = client.get('/api/listings/')
        listing1 = response.data['results'][0]
        listing2 = response.data['results'][1]
        self.assertEqual(
            listing1,
            ListingSerializer(self.listing1).data
        )
        self.assertEqual(
            listing2,
            ListingSerializer(self.listing2).data
        )

    def test_api_returns_listing(self):
        """Test that the api returns a single listing"""
        client = APIClient()
        response = client.get(f'/api/listings/{self.listing1.id}/')
        self.assertEqual(
            response.data,
            ListingSerializer(self.listing1).data
        )

    def test_api_listing_posting(self):
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Bearer ' + self.access_token
        )
        response = client.post(
            '/api/listings/',
            {
                'price': 4.5,
                'title': 'listing',
                'description': 'posted listing',
                'postal_code': 26500
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            response.data,
            ListingSerializer(Listing.objects.get(id=3)).data
        )
