from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse

from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()


app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root():
    return RedirectResponse(url="/static/index.html")


instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)
