from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

DJANGO_SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]

