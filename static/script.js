const video = document.getElementById('video');  // for live webcam
  const canvas = document.getElementById('canvas'); // to capture image
  const context = canvas.getContext('2d'); // for drawing on canvas

  function showFileName() {
    const fileInput = document.getElementById('imageInput'); // input file
    const display = document.getElementById('fileNameDisplay'); // where to show file name
    if (fileInput.files.length > 0) {
      display.textContent = fileInput.files[0].name; // show file name
    } else {
      display.textContent = "No file chosen"; // default message
    }
  }

  function upload() {
    const file = document.getElementById('imageInput').files[0]; // get the selected file 
    if (!file) return alert("Please select an image."); 
    const formData = new FormData();  // create FormData object
    formData.append("image", file); // append the file to it
    sendToServer(formData);  // send to server
  }

  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }) // request access to webcam
      .then(stream => {   // after access is allowed by user
        video.style.display = 'block';  // show video element 
        canvas.style.display = 'none';  // hide canvas until capture
        video.srcObject = stream;  // send the live webcam feed to video element 
      })
      .catch(err => alert("Webcam error: " + err));
  }

  function capture() {    // capture the current frame from webcam
    canvas.style.display = 'block';  // show canvas to display captured image
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // draw the video frame onto canvas
    canvas.toBlob(blob => { // create blob from canvas
      const formData = new FormData();  // create FormData object
      formData.append("image", blob, "webcam.jpg"); // append the blob to it
      sendToServer(formData); // send to server
    }, 'image/jpeg');
  }

  function sendToServer(formData) {
    document.getElementById("output").innerHTML = "🔍 Processing...";
    fetch("/analyze", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById("output").innerHTML = "❌ " + data.error;
      } else {
        document.getElementById("output").innerHTML = `
          <strong>Plate Number:</strong> ${data.plate_number}<br>
          <strong>Owner:</strong> ${data.vehicle_info.owner}<br>
          <strong>Model:</strong> ${data.vehicle_info.model}<br>
          <strong>Fuel:</strong> ${data.vehicle_info.fuel}<br>
          <strong>Registration Date:</strong> ${data.vehicle_info.registration_date}
        `;
      }
    })
    .catch(err => {
      document.getElementById("output").innerHTML = "❌ Error: " + err.message;
    });
  }