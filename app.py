from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from backend.utils.strength_utils import analyze_password  # updated function

app = Flask(
    __name__,
    template_folder="backend/templates",  # HTML files here
    static_folder="backend/static"        # CSS/JS files here
)
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/password_checker")
def password_checker():
    return render_template("password_checker.html")

@app.route("/check_password", methods=["POST"])
def check_password():
    data = request.get_json()
    password = data.get("password", "")
    
    # Use analyze_password for full analytics
    result = analyze_password(password)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
