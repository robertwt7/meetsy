FROM nginx:alpine

LABEL maintainer="Robert T <robert@sharkware.org>"

COPY ./app/static /app/static


EXPOSE 80 81 443

CMD ["nginx", "-g", "daemon off;"]