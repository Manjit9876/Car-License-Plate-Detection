import requests

def get_vehicle_info(plate_number):
    url = "https://apisetu.gov.in/vahan/vehicleinfo"  # Sample endpoint
    headers = {
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'Content-Type': 'application/json'
    }
    payload = {
        "registration_number": plate_number
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to fetch data"}
