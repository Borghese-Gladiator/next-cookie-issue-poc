# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY pyproject.toml poetry.lock /app/
RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install --no-dev

COPY ./src /app/src

CMD ["uvicorn", "fastapi_project.main:app", "--host", "0.0.0.0", "--port", "80"]
