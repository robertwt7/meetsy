from allauth.socialaccount.models import SocialAccount, SocialToken
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Connect to Google Calendar
def connect_to_calendar(request, user):
    # Fetches the User of the request
    qs = SocialAccount.objects.filter(user=user)

    # Fetches the Acces token of the User
    token = SocialToken.objects.filter(account=qs[0]).values("token", "token_secret")

    # The scope of service like if we want readonly etc
    SCOPES = [
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/calendar",
    ]

    print("This is token: ", token)
    # Refresh token if available
    refresh = token[0]["token_secret"] or ""

    print("refresh: ", refresh)

    # Finally making a connection request
    # TODO: error refresh token: The credentials do not contain the necessary fields need to refresh the access token. You must specify refresh_token, token_uri, client_id, and client_secret."
    creds = Credentials(token[0]["token"], scopes=SCOPES, refresh_token=refresh)
    service = build("calendar", "v3", credentials=creds)
    return service
