import django_filters.rest_framework as filters
from .models import Listing


class ListingFilter(filters.FilterSet):
    price__gt = filters.NumberFilter(field_name='price', lookup_expr='gt')
    price__lt = filters.NumberFilter(field_name='price', lookup_expr='lt')

    class Meta:
        model = Listing
        fields = ['category', 'price']
