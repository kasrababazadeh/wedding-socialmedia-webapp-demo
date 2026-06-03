from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("auth/send-code/", views.SendCodeView.as_view()),
    path("auth/verify/", views.VerifyCodeView.as_view()),
    path("auth/profile/", views.ProfileView.as_view()),
    path('auth/logout/', views.LogoutView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("couples/register/", views.CoupleRegisterView.as_view()),
    path('couples/<slug:slug>/', views.CoupleDetailView.as_view(), name='couple-detail'),
]
