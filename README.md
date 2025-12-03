# PassGuard_Final_Cryptography_Project
1. Description
	PassGuard is a web-based application designed to help users evaluate and enhance the security of their passwords while learning essential cryptographic concepts. The system analyzes password strength, calculates entropy, estimates cracking time, detects common dictionary patterns, and generates cryptographic hashes such as MD5, SHA-1, and SHA-256 based on user input.
The application is developed using Python (Flask) for a lightweight, maintainable backend, and a responsive HTML, CSS, and JavaScript frontend to deliver real-time feedback and an easy-to-use interface. PassGuard aims to improve user awareness of secure password practices and demonstrate how hashing functions operate in practical scenarios.

2. Project Structure
<br>
PassGuard_Final_Cryptography_Project/<br>
password-app/<br>
├─ app.py                 # Flask app<br>
├─ requirements.txt<br>
├─ static/<br>
│  ├─ css/<br>
│  │  └─ style.css<br>
│  ├─ js/<br>
│  │  └─ main.js<br>
│  └─ libs/<br>
│     └─ crypto-js.min.js<br>
├─ templates/<br>
│  └─ index.html<br>
├─ data/<br>
│  └─ dictionary.json<br>
├─ README.md<br>
└─ tests/<br>
   └─ test_entropy.py<br>

