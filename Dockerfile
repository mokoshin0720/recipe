FROM python:3

ENV PYTHONUNBUFFERED 1

WORKDIR /development/minimalist

ADD requirements.txt /development/minimalist

RUN pip install -r requirements.txt

ADD . /development/minimalistdocker