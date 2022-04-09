FROM python:3.10

LABEL maintainer="Robert Tirtasentana <robert@sharkware.org>"

RUN pip install --user pipenv

COPY Pipfile ./Pipfile
COPY Pipfile.lock ./Pipfile.lock
RUN python -m pipenv install --system --deploy --ignore-pipfile

COPY ./app /app
WORKDIR /app/

COPY ./infrastructure/app/start.sh ./start.sh
RUN chmod +x ./start.sh

ENV PYTHONPATH=/app

EXPOSE 8000

# Run the start script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Gunicorn with Uvicorn
CMD ["./start.sh"]