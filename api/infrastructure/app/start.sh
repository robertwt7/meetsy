#!/bin/bash
gunicorn core.asgi:application -k uvicorn.workers.UvicornWorker