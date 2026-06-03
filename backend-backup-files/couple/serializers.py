from rest_framework import serializers
from .models import User, OTP, Couple


class PhoneSerializer(serializers.Serializer):
    phone_number = serializers.CharField()


class VerifyCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    code = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number']

class CoupleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Couple
        fields = '__all__'
        read_only_fields = ['user']