from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Events, AvailableDates
import datetime, pytz


class AvailableDatesSerializer(ModelSerializer):
    class Meta:
        read_only_fields = ["id", "event"]
        model = AvailableDates
        fields = ["id", "event", "start", "end"]


class EventsSerializer(ModelSerializer):
    available_dates = AvailableDatesSerializer(many=True)

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

    # TODO: Update event to include the signed url string
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
