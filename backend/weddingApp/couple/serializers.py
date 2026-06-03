from rest_framework import serializers
from .models import User, Couple, CoupleExtraInfo


class SendCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField()


class VerifyCodeSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    code = serializers.CharField()
    partner_id = serializers.CharField(required=False)


class CoupleRegisterSerializer(serializers.ModelSerializer):
    qr_url = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)  # ✅ add this

    class Meta:
        model = Couple
        fields = [
            'id',  # optional: Couple primary key
            'partner1_forename', 'partner1_surname', 'partner1_national_id',
            'partner2_forename', 'partner2_surname', 'partner2_national_id',
            'email', 'document', 'qr_url', 'user_id'  # ✅ now included
        ]

    def get_qr_url(self, obj):
        request = self.context.get('request')
        if obj.qr and request:
            return request.build_absolute_uri(obj.qr.url)
        return None

    def create(self, validated_data):
        user = self.context['request'].user
        return Couple.objects.create(user=user, **validated_data)




class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'user_type']
