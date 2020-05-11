from django.urls import path
from listings import views

urlpatterns = [
  path('listings/', views.listings_list),
  path('listings/<int:pk>/', views.listing_detail)
]