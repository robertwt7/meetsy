from rest_framework.serializers import ModelSerializer, ManyRelatedField
from .models import Events, AvailableDates
import datetime, pytz


class AvailableDatesSerializer(ModelSerializer):
    class Meta:
        read_only_fields = ["id", "event"]
        model = AvailableDates
        fields = ["id", "event", "start", "end"]


class EventsSerializer(ModelSerializer):
    available_dates = AvailableDatesSerializer(many=True)

    # TODO: Update event to include the signed url string
    # TODO: Add validation that end shouldn't be earlier than start
    def create(self, validated_data):
        available_dates = validated_data.pop("available_dates")
        event = Events.objects.create(**validated_data)
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
