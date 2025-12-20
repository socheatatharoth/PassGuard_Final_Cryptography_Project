# PassGuard_Final_Cryptography_Project
1. Description
	PassGuard is a web application designed to help users understand the importance of strong passwords. It is not only intended for general users but also aims to assist developers in testing passwords and encryption methods during project development. The application offers three main features. First, the Password Strength Checker allows users to input a password and see its strength, along with entropy and recommendations for improvement. Passwords are classified as weak if they are less than or equal to 8 characters, even if they include numbers, special characters, or a mix of uppercase and lowercase letters; medium if they are 8 up to 12 characters long and include uppercase and lowercase letters, numbers, and special characters; and strong if they are 12 or more characters long and include all character types. Second, the Hash Generator enables users to convert passwords from plaintext into MD5, SHA-1, or SHA-256 hashes, providing hands-on experience with password encryption. Third, the Dictionary Checking feature allows users to verify whether their password, in plaintext or hashed algorithm, has been leaked or breached on the internet or not. PassGuard aims to educate users about password security, demonstrate the critical role of cryptography in today’s technology, and highlight how outdated algorithms are replaced by modern, more secure methods. We hope that every user who uses PassGuard will enjoy the experience and gain valuable knowledge, and as the owner, I welcome feedback to help improve and develop a better version of the application in the future.

2. Project Structure
<br>
PASSGUARD_FINAL/<br>
│
├── .gitignore                # Git configuration to ignore sensitive or unnecessary files<br>
├── app.py                    # Main application entry point<br>
├── cert.pem                # SSL certificate for HTTPS<br>
├── key.pem                 # SSL key for HTTPS<br>
├── README.md                # Project documentation<br>
│
├── backend/<br>
│   ├── dictionaries/<br>         # Leaked password hash lists
│   │   ├── leaked_passwords.txt<br>
│   │   ├── MD5_Leak.txt<br>
│   │   ├── Sha1_Leak.txt<br>
│   │   └── Sha256_Leak.txt<br>
│   │
│   ├── static/<br>               # Static frontend assets
│   │   ├── css/<br>
│   │   │   ├── About_Us.css<br>
│   │   │   ├── dictionary_check.css<br>
│   │   │   ├── FaQs.css<br>
│   │   │   ├── Generate_Hash.css<br>
│   │   │   ├── password_check.css<br>
│   │   │   ├── service.css<br>
│   │   │   └── style.css<br>
│   │   ├── images/<br>           
│   │   └── Js/<br>
│   │       ├── About_Us.js<br>
│   │       ├── check_hash.js<br>
│   │       ├── check_password.js<br>
│   │       ├── dictionary_check.js<br>
│   │       ├── FaQs.js<br>
│   │       ├── index.js<br>
│   │       └── service.js<br>
│   │
│   ├── templates/<br>            # HTML templates for web pages
│   │   ├── About_Us.html<br>
│   │   ├── dictionary_check.html<br>
│   │   ├── FaQs.html<br>
│   │   ├── Generate_Hash.html<br>
│   │   ├── index.html<br>
│   │   ├── password_checker.html<br>
│   │   └── Service.html<br>
│   │
│   └── utils/<br>                # Python utility scripts
│       ├── __init__.py<br>
│       ├── dictionary_utils.py<br>
│       ├── Generate_Hash.py<br>
│       ├── strength_utils.py<br>
│       └── __pycache__/<br>      # Compiled Python cache files

3. Step how to run

Step 1: Clone the Repository open your terminal or command prompt. Run the following command to clone the project to your local machine:

git clone https://github.com/socheatatharoth/PassGuard_Final_Cryptography_Project.git

Step 2: Navigate to the Project Directory: After cloning, move into the project folder: cd PassGuard_Cryptography_Final_Project

Step 3: Install Required Python Packages: Make sure you have Python and pip installed.
Install the necessary packages using pip: pip install flask flask-cors

Step 4: Configure app.py for Local Use: Open app.py in a code editor. Locate the section that runs the app, and make sure it looks like this:

# ================== RUN APP ==================
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
        ssl_context=("cert.pem", "key.pem")
    )


Note: This setup uses SSL certificates (cert.pem and key.pem) for HTTPS. Make sure these files exist in your project directory.

Step 5: Run the Application: Start the Flask application by running:python app.py

After running, open your browser and go to: https://127.0.0.1:5000 . You should see the application running locally.

Step6: You can use everything in our website


4. Take Notes:
