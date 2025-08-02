import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

def get_vehicle_info(plate_number):
    url = "https://apisetu.gov.in/vahan/vehicleinfo"  # Sample endpoint
    token = os.getenv("API_TOKEN")

    if not token:
        return {"error": "API token not found in environment variables"}

    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "registration_number": plate_number
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to fetch data, status code: {response.status_code}"}
