from django.urls import path, include
from django.urls.resolvers import URLPattern
from .views import CalendarView

urlpatterns = [
    path("calendar/", CalendarView.as_view(), name="calendar"),
]
