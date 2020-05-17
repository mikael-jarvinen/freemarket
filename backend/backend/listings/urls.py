from django.urls import path, include
from rest_framework.routers import DefaultRouter
from listings import views
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()
router.register(r'listings', views.ListingViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path(
        'api/token/',
        jwt_views.TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),
    path(
        'api/token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name='token_refresh'
    ),
]
