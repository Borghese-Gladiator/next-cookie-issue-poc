from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import RedirectResponse


#===================
#  CONSTANTS
#===================
OAUTH_URL = "https://jsonplaceholder.typicode.com/users/1"

#===================
#  MAIN
#===================
app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/api/verify_cookie")
async def callback(request: Request):
    try:
        cookie_authorization: str = request.cookies.get("token")
        print(cookie_authorization)
        return {"message": "success"}
    except Exception as e:
        raise HTTPException(
            status_code=403, detail="Invalid authentication"
        )
    """
    try:
        response = RedirectResponse(url="http://localhost:3000")
        token
        response.set_cookie(
            key="access_token", value="BLAH", httponly=True
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    """