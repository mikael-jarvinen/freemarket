from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from listings import views
from rest_framework_simplejwt import views as jwt_views


router = DefaultRouter()
router.register(r'listings', views.ListingViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'reviews', views.ReviewViewSet)

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
    )
]

# Production media can be held in host machine, host machine serves our
# needs for image hosting
urlpatterns += static(
    settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT
)
