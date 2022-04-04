from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

DJANGO_SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
POSTGRES_DB=os.environ['MEETSY_POSTGRES_DB']
POSTGRES_USER=os.environ['MEETSY_POSTGRES_USER']
POSTGRES_PASSWORD=os.environ['MEETSY_POSTGRES_PASSWORD']