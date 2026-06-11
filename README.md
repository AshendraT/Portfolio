# Personal Portfolio | Ashendra Thavaratnam

Welcome to my personal portfolio repository. This website showcases my journey as a Software Engineer, Full-Stack Developer, AI/ML enthusiast, and Creative Photographer. 

The live site is built with a sleek, dark glassmorphic design, subtle micro-animations, and responsive layouts.

---

## 🚀 Key Features

*   **Premium Dark Glassmorphism**: Interactive background grid overlay, neon radial glowing mouse tracker, and smooth hover effects.
*   **Curated Projects Showcase**:
    *   **Adaptive Memory Trainer**: My final year research project using Flutter, Flask, MongoDB, TensorFlow, and BLE to assist dyslexic children by dynamically adjusting task difficulty using real-time heart rate variability (HRV) stress prediction from an ESP32 + MAX30102 sensor.
    *   **Hotel Wedding Reservation System**: Enterprise-grade hotel wedding booking platform utilizing the MERN stack.
    *   **Appointment Management System**: High-security dental clinic specialist scheduling hub.
    *   **TasteMaster Sharing Portal**: Social culinary sharing app utilizing Spring Boot and MongoDB.
    *   **Intelli-Task Assistant**: Voice-first task planner built natively in Kotlin with Whisper API parsing.
*   **Case Details Modal Overlay**: Interactive, animated slide-out drawer containing key overview summaries, core challenges solved, and metric ratings.
*   **Web3Forms Contact Integration**: Fully functional contact form forwarding messages to my email without any server backend.
*   **Photography Masonry Grid**: stark lighting compositions, monochrome palettes, and minimalist captures.

---

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 Spec, Javascript (ES6+)
*   **Design Tokens**: Custom CSS Custom Properties (Variables), Google Fonts (*Plus Jakarta Sans, Inter, Space Mono*)
*   **Integrations**: Web3Forms API, Bluetooth Low Energy (BLE) hardware triggers, TensorFlow ML models

---

## 💻 Running Locally

Since this is a lightweight static site built with pure frontend engineering, you do not need a complex local server:

1.  Clone this repository:
    ```bash
    git clone https://github.com/AshendraT/Portfolio.git
    ```
2.  Open the folder and double-click `index.html` to run it directly in your browser.
3.  *(Optional)* For the best experience, run it using a local HTTP server such as VS Code's **Live Server** extension or:
    ```bash
    npx http-server
    ```

---

## 📧 Configuring the Contact Form

The contact form is pre-wired to use **Web3Forms** for handling incoming mail submissions asynchronously.

To receive messages sent through the contact form:
1.  Go to [Web3Forms](https://web3forms.com/) and register your email to get a free **Access Key**.
2.  Open `index.html`.
3.  Locate the hidden input inside the `<form id="contact-form">` (around line 1085) and replace the value with your key:
    ```html
    <input type="hidden" name="access_key" value="YOUR_ACTUAL_ACCESS_KEY_HERE" />
    ```
4.  Commit and push the changes.

---

## 📄 License

Copyright &copy; 2026 Ashendra Thavaratnam. All Rights Reserved. Crafted with pure minimal engineering.
