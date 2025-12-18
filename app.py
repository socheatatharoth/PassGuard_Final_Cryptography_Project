from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# ================== IMPORT UTILITIES ==================
from backend.utils.strength_utils import analyze_password
from backend.utils.Generate_Hash import generate_hash
from backend.utils.dictionary_utils import dictionary_breach_check

# ================== APP CONFIG ==================
app = Flask(
    __name__,
    template_folder="backend/templates",
    static_folder="backend/static"
)
CORS(app)

# ================== PAGE ROUTES ==================
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/About_Us")
def about_us():
    return render_template("About_Us.html")

@app.route("/Service")
def service():
    return render_template("Service.html")

@app.route("/FaQs")
def faqs():
    return render_template("FaQs.html")

@app.route("/password_checker")
def password_checker():
    return render_template("password_checker.html")

@app.route("/dictionary_check")
def dictionary_check_page():
    return render_template("dictionary_check.html")

@app.route("/Generate_Hash")
def hash_generator():
    return render_template("Generate_Hash.html")

# ================== API ROUTES ==================
@app.route("/check_password", methods=["POST"])
def check_password():
    data = request.get_json()
    password = data.get("password", "")
    return jsonify(analyze_password(password))

@app.route("/generate_hash", methods=["POST"])
def generate_hash_api():
    data = request.get_json()
    password = data.get("password", "")
    algo = data.get("algo", "").lower()

    if not password or not algo:
        return jsonify({"error": "Password and algorithm required"}), 400

    try:
        return jsonify({
            "algorithm": algo.upper(),
            "hash": generate_hash(password, algo)
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@app.route("/check_dictionary", methods=["POST"])
def check_dictionary():
    data = request.get_json()
    breached, message = dictionary_breach_check(
        value=data.get("value", ""),
        mode=data.get("mode", "").lower(),
        algo=data.get("algo")
    )
    return jsonify({
        "breached": breached,
        "message": message
    })

# ================== RUN APP ==================
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True,
        ssl_context=("cert.pem", "key.pem")
    )

