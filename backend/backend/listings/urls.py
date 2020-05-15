from django.urls import path
from django.conf.urls import include
from rest_framework.urlpatterns import format_suffix_patterns
from listings import views

urlpatterns = [
  path('listings/', views.ListingList.as_view(), name='listing-list'),
  path('listings/<int:pk>/', views.ListingDetail.as_view(), name='listing-detail'),
  path('users/', views.UserList.as_view(), name='user-list'),
  path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
  path('questions/', views.QuestionList.as_view(), name='question-list'),
  path('questions/<int:pk>/', views.QuestionDetail.as_view(), name='question-detail'),
  path('reviews/', views.ReviewList.as_view(), name='review-list'),
  path('reviews/<int:pk>/', views.ReviewDetail.as_view(), name='review-detail'),
  path('', views.api_root)
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
  path('api-auth/', include('rest_framework.urls'))
]
