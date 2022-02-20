from django.urls import path, include
from django.urls.resolvers import URLPattern
from .views import GoogleEventsView, EventsViewSet, AvailableDatesViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"meetsy-events", EventsViewSet)
router.register(r"available-dates", AvailableDatesViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("events/", GoogleEventsView.as_view(), name="events"),
]
