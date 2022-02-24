from rest_framework.serializers import ModelSerializer
from .models import CustomUserModel
from django.conf import settings


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = [
            "userId",
            "username",
            "email",
            "password",
        ]

    def create(self, validated_data):
        user = CustomUserModel.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["first_name"],
            validated_data["last_name"],
            validated_data["password"],
        )

        return user
