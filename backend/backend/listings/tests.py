from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User
from .serializers import UserSerializer


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
