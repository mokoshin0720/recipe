FROM python:3

ENV PYTHONUNBUFFERED 1
ENV export PYTHONDONTWRITEBYTECODE 1

WORKDIR /development/recipe

ADD requirements.txt /development/recipe

RUN pip install -r requirements.txt