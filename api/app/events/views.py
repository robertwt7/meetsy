from django.shortcuts import render
from events.utils import connect_to_calendar
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
class CalendarView(APIView):
    permission_classes = [IsAuthenticated]

    def __init__(self):
        self.calendar = connect_to_calendar()

    def get(self, request):
        events = self.calendar.events().list(calendarId="primary").execute()
        return Response(events)
