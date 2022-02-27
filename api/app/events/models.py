from django.db import models
from meetsyauth.models import CustomUserModel


class Events(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, blank=False)
    location = models.CharField(max_length=128, blank=True)
    notes = models.TextField(blank=True)
    selected_time = models.DateField(blank=True, null=True)
    duration = models.IntegerField()
    pending = models.BooleanField(default=True, null=True)
    expiry = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AvailableDates(models.Model):
    event = models.ForeignKey(
        Events, on_delete=models.CASCADE, related_name="available_dates"
    )
    start = models.DateTimeField()
    end = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
