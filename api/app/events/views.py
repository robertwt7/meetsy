from django.shortcuts import render
from events.utils import connect_to_calendar
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from googleapiclient.errors import HttpError

# Create your views here.
class CalendarView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            events = (
                connect_to_calendar(request)
                .events()
                .list(calendarId="primary")
                .execute()
            )
            return Response(events)
        except HttpError as e:
            return Response(e.error_details, e.status_code)
