import requests

# Replace with your Render.com server URL
SERVER_URL = "https://score-mate.onrender.com/healthz"


def keep_server_alive():
    try:
        response = requests.get(SERVER_URL)
        print(f"Pinged server: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to reach server: {e}")


keep_server_alive()
