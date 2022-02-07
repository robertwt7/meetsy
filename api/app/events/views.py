import datetime
from dateutil.relativedelta import relativedelta

from events.utils import connect_to_calendar
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from googleapiclient.errors import HttpError
from .permissions import IsOwner
from .serializers import EventsSerializer, AvailableDatesSerializer
from .models import Events, AvailableDates

# TODO: Create view to process the endpoint of signed url string
class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.queryset.filter(user=self.request.user)
        return Events.objects.none()


class AvailableDatesViewSet(viewsets.ModelViewSet):
    queryset = AvailableDates.objects.all()
    serializer_class = AvailableDatesSerializer
    permission_classes = [IsAuthenticated]


class GoogleEventsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # If no request, then default to 1 month from now
        now = datetime.datetime.utcnow()
        nowString = now.isoformat() + "Z"  # 'Z' indicates UTC time
        minDate = (
            request.query_params["minDate"]
            if request.query_params["minDate"]
            else nowString
        )
        maxDate = (
            request.query_params["maxDate"]
            if request.query_params["maxDate"]
            else (now + relativedelta(months=1)).isoformat() + "Z"
        )

        try:
            events = (
                connect_to_calendar(request)
                .events()
                .list(calendarId="primary", timeMin=minDate, timeMax=maxDate)
                .execute()
            )
            return Response(events)
        except HttpError as e:
            return Response(e.error_details, e.status_code)
        except Exception as e:
            return Response({"message": str(e)}, status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        # Example event saved
        event = {
            "summary": "Google I/O 2015",
            "location": "800 Howard St., San Francisco, CA 94103",
            "description": "A chance to hear more about Google's developer products.",
            "start": {
                "dateTime": "2015-05-28T09:00:00-07:00",
                "timeZone": "America/Los_Angeles",
            },
            "end": {
                "dateTime": "2015-05-28T17:00:00-07:00",
                "timeZone": "America/Los_Angeles",
            },
            "recurrence": ["RRULE:FREQ=DAILY;COUNT=2"],
            "attendees": [
                {"email": "lpage@example.com"},
                {"email": "sbrin@example.com"},
            ],
            "reminders": {
                "useDefault": False,
                "overrides": [
                    {"method": "email", "minutes": 24 * 60},
                    {"method": "popup", "minutes": 10},
                ],
            },
        }

        try:
            event = (
                connect_to_calendar(request)
                .events()
                .insert(calendarId="primary", body=event)
                .execute()
            )
            print("Event created: %s" % (event.get("htmlLink")))
            return Response(event)
        except HttpError as e:
            return Response(e.error_details, e.status_code)
        except Exception as e:
            return Response({"message": str(e)}, status.HTTP_401_UNAUTHORIZED)
