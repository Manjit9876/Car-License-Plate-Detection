# 🇮🇳 License Plate Recognition + VAHAN Vehicle Info 🔍
# This is for ACADEMIC PURPOSE ONLY 
This project uses **Deep Learning**, **OpenCV**, and **EasyOCR** to detect Indian vehicle license plates from uploaded images. Once recognized, the system queries the **VAHAN API (API Setu)** to fetch real-time vehicle information — all built with a simple **Flask web interface**.

---

## 🚀 Features

- 🎯 License Plate Detection using EasyOCR + OpenCV
- 🔍 OCR-based character recognition from plate region
- 📡 Integration with VAHAN API (via API Setu) to get vehicle details
- 🖼️ Image upload via clean HTML + Flask frontend
- 🔐 Secrets managed using `.env` file (API token hidden)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/Car-License-Plate-Detection.git
cd Car-License-Plate-Detection
```
2. Create a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies:

pip install -r requirements.txt

⚙️ How to Run :

1. python app.py
2. http://127.0.0.1:5000/ #open the link in your browser

🔑 Setup API Token :
API_TOKEN=your_actual_api_token_here

📁 Project Structure
Car-License-Plate-Detection/
├── app.py
├── api_lookup.py
├── requirements.txt
├── .env               # (not tracked in GitHub)
├── .gitignore
├── static/
│   └── uploads/       # uploaded image files
├── templates/
│   └── index.html  
