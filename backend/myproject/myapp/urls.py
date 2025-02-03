from django.urls import path,include
from rest_framework import routers
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router=routers.DefaultRouter()
router.register(r'turf',TurfViewsets)

urlpatterns = [
    path('',include(router.urls)),
    path('login/',LoginView.as_view(),name='login'),
    path('register/',RegisterView.as_view(),name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('turf/<int:turf_id>/', TurfViewsets.as_view({'get': 'retrieve'}), name='turf-detail'),
     path('contact/',contact_form,name="contact"),
]
