import datetime
from dateutil.relativedelta import relativedelta

from events.utils import connect_to_calendar
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from googleapiclient.errors import HttpError

# Create your views here.
class EventsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # If no request, then default to 1 month from now
        now = datetime.datetime.utcnow()
        nowString = now.isoformat() + "Z"  # 'Z' indicates UTC time
        minDate = request.data["minDate"] if request.data["minDate"] else nowString
        maxDate = (
            request.data["maxDate"]
            if request.data["maxDate"]
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
            return Response({"message": str(e)}, 401)
