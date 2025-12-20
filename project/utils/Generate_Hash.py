import hashlib

def generate_hash(password: str, algorithm: str) -> str:
    password_bytes = password.encode("utf-8")

    if algorithm == "md5":
        return hashlib.md5(password_bytes).hexdigest()
    elif algorithm == "sha1":
        return hashlib.sha1(password_bytes).hexdigest()
    elif algorithm == "sha256":
        return hashlib.sha256(password_bytes).hexdigest()
    else:
        raise ValueError("Unsupported algorithm")
