from django.db import models
from meetsyauth.models import CustomUserModel


class Events(models.Model):
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=128, blank=False)
    location = models.CharField(max_length=128, blank=True)
    notes = models.TextField(blank=True)
    selected_time = models.DateField(blank=True)
    pending = models.BooleanField(default=True)
    expiry = models.DateField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class AvailableDates(models.Model):
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    start = models.DateField()
    end = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
