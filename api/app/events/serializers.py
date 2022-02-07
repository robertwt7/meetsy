from rest_framework.serializers import ModelSerializer, ManyRelatedField
from .models import Events, AvailableDates


class AvailableDatesSerializer(ModelSerializer):
    class Meta:
        model = AvailableDates
        fields = ["id", "event", "start", "end"]


class EventsSerializer(ModelSerializer):
    available_dates = AvailableDatesSerializer(many=True)

    # TODO: Update event to include the signed url string
    def create(self, validated_data):
        selectedTimes = validated_data.pop("selectedTimes")
        event = Events.objects.create(**validated_data)
        for selectedTime in selectedTimes:
            AvailableDates.objects.create(event=event, **selectedTime)
        return event

    class Meta:
        read_only_fields = ["id", "created_at", "updated_at", "selected_time"]
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
