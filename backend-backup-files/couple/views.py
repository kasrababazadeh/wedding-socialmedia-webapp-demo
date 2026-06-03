from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, OTP
from .serializers import PhoneSerializer, VerifyCodeSerializer, UserSerializer, CoupleSerializer
from .utils import send_sms_code
import random
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from rest_framework_simplejwt.tokens import RefreshToken


def generate_otp():
    return str(random.randint(100000, 999999))


class SendCodeView(APIView):
    def post(self, request):
        serializer = PhoneSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone_number']
            code = generate_otp()

            OTP.objects.filter(phone_number=phone).delete()
            OTP.objects.create(phone_number=phone, code=code)

            send_sms_code(phone, code)
            return Response({"detail": "OTP sent."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyCodeView(APIView):
    def post(self, request):
        serializer = VerifyCodeSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone_number']
            code = serializer.validated_data['code']

            try:
                otp_obj = OTP.objects.get(phone_number=phone, code=code)
                if otp_obj.is_expired():
                    return Response({"detail": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

                user, created = User.objects.get_or_create(phone_number=phone)
                otp_obj.delete()

                refresh = RefreshToken.for_user(user)

                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data
                })
            except OTP.DoesNotExist:
                return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)



class CoupleRegisterView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        serializer = CoupleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)