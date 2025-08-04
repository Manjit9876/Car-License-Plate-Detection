const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const outputPanel = document.getElementById('outputPanel');
const outputText = document.getElementById('outputText');

function showFileName() {
  const fileInput = document.getElementById('imageInput');
  const display = document.getElementById('fileNameDisplay');
  if (fileInput.files.length > 0) {
    display.textContent = fileInput.files[0].name;
  } else {
    display.textContent = "No file chosen";
  }
}

function upload() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return alert("Please select an image.");
  const formData = new FormData();
  formData.append("image", file);
  showOutputPanel();
  sendToServer(formData);
}

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.style.display = 'block';
      video.srcObject = stream;
    })
    .catch(err => alert("Webcam error: " + err));
}

function capture() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'none';

  canvas.toBlob(blob => {
    const formData = new FormData();
    formData.append("image", blob, "webcam.jpg");

    // Display captured image inside output panel
    const capturedImage = document.getElementById('capturedImage');
    capturedImage.src = URL.createObjectURL(blob);
    capturedImage.style.display = 'block';

    showOutputPanel();
    sendToServer(formData);
  }, 'image/jpeg');
}

function showOutputPanel() {
  outputPanel.style.display = 'block';
  outputText.innerHTML = "🔍 Processing...";
}

function sendToServer(formData) {
  fetch("/analyze", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      outputText.innerHTML = "❌ " + data.error;
    } else {
      outputText.innerHTML = `
        <strong>Plate Number:</strong> ${data.plate_number}<br>
        <strong>Owner:</strong> ${data.vehicle_info.owner}<br>
        <strong>Model:</strong> ${data.vehicle_info.model}<br>
        <strong>Fuel:</strong> ${data.vehicle_info.fuel}<br>
        <strong>Registration Date:</strong> ${data.vehicle_info.registration_date}
      `;
    }
  })
  .catch(err => {
    outputText.innerHTML = "❌ Error: " + err.message;
  });
}
