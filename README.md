# PassGuard_Final_Cryptography_Project
1. Description
	PassGuard is a web-based application designed to help users evaluate and enhance the security of their passwords while learning essential cryptographic concepts. The system analyzes password strength, calculates entropy, estimates cracking time, detects common dictionary patterns, and generates cryptographic hashes such as MD5, SHA-1, and SHA-256 based on user input.
The application is developed using Python (Flask) for a lightweight, maintainable backend, and a responsive HTML, CSS, and JavaScript frontend to deliver real-time feedback and an easy-to-use interface. PassGuard aims to improve user awareness of secure password practices and demonstrate how hashing functions operate in practical scenarios.

2. Project Structure

PassGuard_Final_Cryptography_Project/
password-app/
├─ app.py                 # Flask app
├─ requirements.txt
├─ static/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  └─ main.js
│  └─ libs/
│     └─ crypto-js.min.js
├─ templates/
│  └─ index.html
├─ data/
│  └─ dictionary.json
├─ README.md
└─ tests/
   └─ test_entropy.py

