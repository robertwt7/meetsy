from django.urls import path, include
from django.urls.resolvers import URLPattern
from .views import EventsView

urlpatterns = [
    path("events/", EventsView.as_view(), name="events"),
]
