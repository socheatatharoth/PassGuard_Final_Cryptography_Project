from flask import Flask, render_template, request, jsonify
from utils import dictionary_utils, hash_utils, entropy_utils, pattern_utils

app = Flask(__name__, static_folder="static", template_folder="templates")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/password_checker')
def password_checker():
    return render_template('password_checker.html')



@app.route('/check_password', methods=['POST'])
def check_password():
    password = request.json.get('password', '')

    # Strength
    strength = pattern_utils.check_strength(password)

    # Entropy
    entropy = entropy_utils.calculate_entropy(password)
    crack_time = entropy_utils.estimate_crack_time(entropy)

    # Dictionary / common passwords
    is_common = dictionary_utils.is_common_password(password)

    return jsonify({
        "strength": strength,
        "entropy": entropy,
        "crack_time": crack_time,
        "is_common": is_common
    })


@app.route('/generate_hash', methods=['POST'])
def generate_hash():
    password = request.json.get('password', '')
    algorithm = request.json.get('algorithm', 'sha256')
    hash_value = hash_utils.hash_password(password, algorithm)
    return jsonify({"hash": hash_value})


if __name__ == '__main__':
    app.run(debug=True)
