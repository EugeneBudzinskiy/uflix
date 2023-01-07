FROM python:3.9

WORKDIR /code
COPY requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt

COPY backend /code/backend
COPY uflix /code/uflix
COPY manage.py /code/manage.py

EXPOSE 8000

CMD bash -c "python /code/manage.py makemigrations && \
             python /code/manage.py migrate && \
             python /code/manage.py runserver 0.0.0.0:8000"
