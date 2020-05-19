from rest_framework.test import APIClient, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from listings.models import User, Listing
from listings.serializers import UserSerializer, ListingSerializer


class ListingTest(APITestCase):
    """
    Test module for testing endpoint for Listing model
    """
    user = 0

    access_token = 0
    refresh_token = 0

    listing1 = 0
    listing2 = 0

    def setUp(self):
        self.user = User.objects.create(
            email='tester@gmail.com',
            display_name='tester'
        )
        self.user.set_password('verylongpassword')
        self.user.save()

        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

        self.listing1 = Listing.objects.create(
            price=15.5,
            title='testing1',
            description='very good listing for testing',
            postal_code=42000,
            owner=self.user
        )

        self.listing2 = Listing.objects.create(
            price=66.9,
            title='testing2',
            description='testing',
            postal_code=54000,
            owner=self.user
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
        owner_id = response.data['owner']
        self.assertEqual(
            UserSerializer(User.objects.get(id=owner_id)).data,
            UserSerializer(self.user).data
        )

    def test_api_listing_posting_unauthorized(self):
        client = APIClient()
        response = response = client.post(
            '/api/listings/',
            {
                'price': 4.5,
                'title': 'listing',
                'description': 'posted listing',
                'postal_code': 26500
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
