FROM python:3.10

LABEL maintainer="Robert Tirtasentana <robert@sharkware.org>"

RUN pip install --user pipenv

COPY Pipfile ./Pipfile
COPY Pipfile.lock ./Pipfile.lock
RUN python -m pipenv install --system --deploy --ignore-pipfile

COPY ./app /app
WORKDIR /app/

ENV PYTHONPATH=/app

EXPOSE 8080

# Run the start script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Gunicorn with Uvicorn
CMD ["gunicorn", "core.asgi:application", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8080"]
