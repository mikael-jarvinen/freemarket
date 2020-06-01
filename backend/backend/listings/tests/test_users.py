from rest_framework.test import APIClient, APITestCase
from listings.models import User
from listings.serializers import UserSerializer


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
                'password': 'default'
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

    def test_api_search_user(self):
        client = APIClient()
        user_email = self.INITIAL_USERS[0].email
        response = client.get(f'/api/users/?search={user_email}')
        self.assertEqual(
            len(response.data['results']),
            1
        )
        self.assertEqual(
            response.data['results'][0],
            UserSerializer(self.INITIAL_USERS[0]).data
        )
