from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser
from .models import User, Couple
from .serializers import (
    SendCodeSerializer,
    VerifyCodeSerializer,
    CoupleRegisterSerializer,
    ProfileSerializer,
)
from django.core.cache import cache
import random


class SendCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SendCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone_number']
        ip = request.META.get('REMOTE_ADDR')

        # Limit: 1 request per 60 seconds per phone
        phone_limit_key = f"sms_limit_phone_{phone}"
        ip_limit_key = f"sms_limit_ip_{ip}"

        # if cache.get(phone_limit_key) or cache.get(ip_limit_key):
        #     return Response({"detail": "لطفاً کمی صبر کرده و دوباره تلاش کنید."}, status=429)

        # Set rate limit: 60 seconds
        cache.set(phone_limit_key, True, timeout=60)
        cache.set(ip_limit_key, True, timeout=60)

        code = str(random.randint(100000, 999999))
        cache.set(f"otp_{phone}", code, timeout=120)  # 2 minutes

        # Replace this with actual SMS sending
        print(f"DEBUG: OTP for {phone} is {code}")
        return Response({"message": "کد ارسال شد"})


class VerifyCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']
        attempt_key = f"otp_attempts_{phone}"
        attempts = cache.get(attempt_key, 0)
        # if attempts >= 5:
        #     return Response({"detail": "تعداد تلاش بیش از حد"}, status=429)
        cached_code = cache.get(f"otp_{phone}")
        if not cached_code or cached_code != code:
            cache.set(attempt_key, attempts + 1, timeout=120)
            return Response({"detail": "کد اشتباه است"}, status=400)

        user, created = User.objects.get_or_create(phone_number=phone, defaults={'user_type': 'couple'})

        refresh = RefreshToken.for_user(user)
        couple = Couple.objects.filter(user=user).first()
        cache.delete(f"otp_{phone}")

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "slug": couple.slug if couple else None,
            "user_type": user.user_type
        })



class CoupleRegisterView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        print("inserting couple")
        serializer = CoupleRegisterSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        if Couple.objects.filter(user=request.user).exists():
            return Response({"detail": "این کاربر قبلاً ثبت‌نام کرده است."}, status=400)

        couple = serializer.save()
        return Response({
            "message": "ثبت موفق",
            "slug": couple.slug,
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(ProfileSerializer(request.user).data)

class CoupleDetailView(RetrieveAPIView):
    queryset = Couple.objects.all()
    serializer_class = CoupleRegisterSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "با موفقیت خارج شدید"})
        except Exception:
            return Response({"detail": "مشکلی رخ داده"}, status=400)