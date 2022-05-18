from django.test import TestCase
from rest_framework.test import (
    APITestCase,
)
from rest_framework import status
from .models import Events
from django.urls import reverse
from meetsyauth.models import CustomUserModel
from django.core.signing import Signer
import datetime

# Create your tests here.
class MeetsyEventsTestCase(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUserModel.objects.create(
            username="robertwt7", password="password"
        )
        data = {
            "name": "Testing initial event",
            "location": "Australia",
            "notes": "This is my notes",
        }
        self.event = Events.objects.create(**data, user=self.user, duration="30")
        return super().setUp()

    def test_create_events(self):
        user = CustomUserModel.objects.get(username="robertwt7")
        url = reverse("events-list")
        data = {
            "name": "Testing my event",
            "duration": "30",
            "location": "Australia",
            "notes": "This is my notes",
            "available_dates": [
                {
                    "start": "2022-02-09T22:39:02+11:00",
                    "end": "2022-02-09T23:39:02+11:00",
                },
                {
                    "start": "2022-02-10T10:39:02+11:00",
                    "end": "2022-02-10T23:39:02+11:00",
                },
            ],
        }
        self.client.force_authenticate(user=user)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 2 because of the default event created in setUp
        self.assertEqual(Events.objects.count(), 2)
        self.assertEqual(
            Events.objects.get(id=response.data["id"]).name, "Testing my event"
        )
        self.assertIn("invite_url", response.data)

    # This will fail becasue of missing duration property
    def test_failed_create_events(self):
        user = CustomUserModel.objects.get(username="robertwt7")
        url = reverse("events-list")
        data = {
            "name": "Testing my event",
            "location": "Australia",
            "notes": "This is my notes",
            "available_dates": [
                {
                    "start": "2022-02-09T22:39:02+11:00",
                    "end": "2022-02-09T23:39:02+11:00",
                },
                {
                    "start": "2022-02-10T10:39:02+11:00",
                    "end": "2022-02-10T23:39:02+11:00",
                },
            ],
        }
        self.client.force_authenticate(user=user)
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invite_link_expired(self):
        url = reverse("events-open-invite")
        signer = Signer()
        signedObject = signer.sign_object(
            {"expiry": datetime.datetime.today().isoformat(), "id": 1}
        )
        response = self.client.get(url, {"invite_url": signedObject})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invite_link(self):
        url = reverse("events-open-invite")
        signer = Signer()
        signedObject = signer.sign_object(
            {
                "expiry": (
                    datetime.datetime.now() + datetime.timedelta(days=2)
                ).isoformat()
                + "Z",
                "id": self.event.id,
            }
        )
        response = self.client.get(url, {"invite_url": signedObject})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Testing initial event")
