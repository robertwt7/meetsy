# Meetsy Backend

This backend is created in [django rest framework](https://www.django-rest-framework.org/) with [postgresql](https://www.postgresql.org/).

I also have our own forked version of [dj-rest-auth](https://github.com/iMerica/dj-rest-auth) called [dj-rest-auth-social](https://github.com/robertwt7/dj-rest-auth-social) that implements extra features (such as saving refresh token and expiry in the db to re-use)


## Requirements

- Python 3.10
- Django 4.0.4
- [Pipenv](https://pipenv.pypa.io/en/latest/)
- Google [OAuth credentials](https://console.cloud.google.com/apis/credentials) which has access to google calendar API. Set the **Authorized redirect URIs** to `http://localhost:3000/api/auth/callback/google`
- OAuth consent screen setup with these scopes: `[/auth/calendar.readonly, /auth/calendar.events, openid, /auth/userinfo.email, /auth/userinfo.profile]`


## Setup Local Guide

1. Setup PostgreSQL from the installer, or use [docker](#docker)
2. Download [Pipenv](https://pipenv.pypa.io/en/latest/)
3. Run `pipenv install`
4. Run `pipenv shell`
5. Copy `./app/env.example` to `./app/.env`
6. Adjust the details of DB, also randomize the secrets
7. Once DB connection is verified, run `python manage.py mgirate`
8. Run `python manage.py runserver`

Note: to develop locally you might need to change `./app/core/settings.py` from this line:
```
239. DEBUG = True

241. ALLOWED_HOSTS = [".meetsy.xyz", "localhost"]
```
11. Run `python manage.py createsuperuser` then follow instruction to create super user
10. go to `localhost:8000/admin` and login with super user
11. Click **Social applications** -> add new at the top right
12. Choose google -> enter secrets and api key -> save

## Deployment

### Using Fly.io

1. Clear up all the `.env` locally in both root and `./app`
2. Create [postgres db](https://fly.io/docs/reference/postgres/) in fly
3. Setup all these envs by running `flyctl secrets set` or `flyctl secrets import`
```
DJANGO_SECRET_KEY=test
JWT_SECRET_KEY=test
MEETSY_POSTGRES_DB=test
MEETSY_POSTGRES_USER=test
MEETSY_POSTGRES_PASSWORD=asdfasdf
MEETSY_POSTGRES_HOST=localhost
```
4. Run `make deploy-fly`

### Using your own VPS

1. Clone the repo to your VPS
2. Setup `.env` file in root and `./app`
3. Run `docker-compose up -d postgres certbot`
4. After certbot has successfully create the cert, you can run `docker-compose up -d nginx core`

Note: don't forget to point your A record to the IP address of your VPS
## Setup Postgres Docker<a name="docker"></a>

1. copy `env.example` to `.env`
2. Fill up this part, note the part with the prefix `MEETSY` will be used by our backend. The former is for postgres default
```
POSTGRES_VERSION=alpine
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=5432
MEETSY_POSTGRES_DB=
MEETSY_POSTGRES_USER=
MEETSY_POSTGRES_PASSWORD=
```
3. Run `docker-compose up -d postgres`
4. Adjust `./app/.env` using `MEETSY_*` db details