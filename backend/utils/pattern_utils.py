import re

def check_strength(password):
    """
    Simple password strength meter:
    Weak, Medium, Strong
    """
    if len(password) < 6:
        return "Weak"
    score = 0
    if re.search(r"[a-z]", password): score += 1
    if re.search(r"[A-Z]", password): score += 1
    if re.search(r"[0-9]", password): score += 1
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]", password): score += 1

    if score <= 1:
        return "Weak"
    elif score == 2 or score == 3:
        return "Medium"
    else:
        return "Strong"
