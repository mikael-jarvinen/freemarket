import django_filters.rest_framework as filters
from .models import Listing


class ListingFilter(filters.FilterSet):
    price__gte = filters.NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Listing
        fields = ['category', 'price']
