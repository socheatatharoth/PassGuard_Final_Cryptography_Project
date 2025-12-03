COMMON_PASSWORDS = [
    "123456", "password", "123456789", "12345678", "12345",
    "qwerty", "abc123", "111111", "123123", "password1"
]

def is_common_password(password):
    return password.lower() in COMMON_PASSWORDS
