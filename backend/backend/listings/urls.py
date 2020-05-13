from django.urls import path
from django.conf.urls import include
from rest_framework.urlpatterns import format_suffix_patterns
from listings import views

urlpatterns = [
  path('listings/', views.ListingList.as_view()),
  path('listings/<int:pk>/', views.ListingDetail.as_view()),
  path('users/', views.UserList.as_view()),
  path('users/<int:pk>/', views.UserDetail.as_view()),
  path('questions/', views.QuestionList.as_view()),
  path('questions/<int:pk>/', views.QuestionDetail.as_view()),
  path('reviews/', views.ReviewList.as_view()),
  path('reviews/<int:pk>/', views.ReviewDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
  path('api-auth/', include('rest_framework.urls'))
]
