from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from listings.models import User


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
