FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY ./app.py ./app.py

COPY ./static ./static

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
