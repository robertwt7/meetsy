from rest_framework.serializers import ModelSerializer
from .models import Events, AvailableDates


class EventsSerializer(ModelSerializer):
    class Meta:
        model = Events
        fields = ["id", "user", "name", "location", "notes", "selected_time", "pending"]


class AvailableDatesSerializer(ModelSerializer):
    class Meta:
        model = AvailableDates
        fields = ["id", "event", "start", "end"]
