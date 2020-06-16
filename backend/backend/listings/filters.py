import django_filters.rest_framework as filters
from .models import Listing


class CategoryFilter(filters.Filter):
    def filter(self, qs, value):
        if not value:
            return qs

        values = value.split(',')
        return qs.filter(category__in=values)


class ListingFilter(filters.FilterSet):
    price__gte = filters.NumberFilter(
        field_name='price',
        lookup_expr='gte'
    )
    price__lte = filters.NumberFilter(
        field_name='price',
        lookup_expr='lte'
    )
    category = CategoryFilter()

    class Meta:
        model = Listing
        fields = ['price']
