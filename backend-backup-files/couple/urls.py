from django.urls import path
from .views import SendCodeView, VerifyCodeView, LogoutView, CoupleRegisterView

urlpatterns = [
    path('auth/send-code/', SendCodeView.as_view(), name='send_code'),
    path('auth/verify/', VerifyCodeView.as_view(), name='verify_code'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('couples/register/', CoupleRegisterView.as_view(), name='couple_register'),
]
