# Create your views here.
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings


class GoogleLoginView(SocialLoginView):
    authentication_classes = (
        []
    )  # disable authentication, make sure to override `allowed origins` in settings.py in production!
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000"  # frontend application url
    client_class = OAuth2Client
