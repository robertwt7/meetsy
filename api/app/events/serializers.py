from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Events, AvailableDates
import datetime
from django.core.signing import Signer
from meetsyauth.models import CustomUserModel


class AvailableDatesSerializer(ModelSerializer):
    class Meta:
        read_only_fields = ["id", "event"]
        model = AvailableDates
        fields = ["id", "event", "start", "end"]


class UserShortSerializer(ModelSerializer):
    class Meta:
        model = CustomUserModel
        fields = ["userId", "email", "first_name", "last_name"]


class EventsSerializer(ModelSerializer):
    available_dates = AvailableDatesSerializer(many=True)
    user = UserShortSerializer(many=False, read_only=True)

    def validate(self, data):
        """
        Check if start is before end
        """
        if data["available_dates"]:
            for x in data["available_dates"]:
                if x["start"] > x["end"]:
                    raise ValidationError("Start time cannot be after end time")
        else:
            raise ValidationError("Must select available dates")
        return data

    def create(self, validated_data):
        available_dates = validated_data.pop("available_dates")

        # Default expiry time is 3 days
        expiry = datetime.datetime.now() + datetime.timedelta(days=3)
        event = Events.objects.create(**validated_data, expiry=expiry)
        for selectedTime in available_dates:
            AvailableDates.objects.create(
                event=event,
                **selectedTime,
            )

        return event

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        expiry = ret["expiry"]
        signer = Signer()
        signedObject = signer.sign_object({"expiry": expiry, "id": ret["id"]})

        ret["invite_url"] = signedObject
        return ret

    class Meta:
        read_only_fields = ["id", "created_at", "updated_at", "selected_time", "user"]
        model = Events
        fields = [
            "id",
            "user",
            "name",
            "location",
            "notes",
            "expiry",
            "selected_time",
            "pending",
            "available_dates",
        ]
