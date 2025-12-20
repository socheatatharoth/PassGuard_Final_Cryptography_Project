import hashlib
import os

# ================= PATH SETUP =================
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DICT_DIR = os.path.join(BASE_DIR, "dictionaries")

FILES = {
    "plaintext": os.path.join(DICT_DIR, "leaked_passwords.txt"),
    "md5": os.path.join(DICT_DIR, "MD5_Leak.txt"),
    "sha1": os.path.join(DICT_DIR, "Sha1_Leak.txt"),
    "sha256": os.path.join(DICT_DIR, "Sha256_Leak.txt"),
}

# ================= SAFE FILE LOADER =================
def load_file(path):
    data = set()
    if not os.path.exists(path):
        return data

    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            clean = line.strip().lower()
            if clean:
                data.add(clean)
    return data


PLAINTEXT_SET = load_file(FILES["plaintext"])
MD5_SET = load_file(FILES["md5"])
SHA1_SET = load_file(FILES["sha1"])
SHA256_SET = load_file(FILES["sha256"])


# ================= HASH GENERATOR =================
def generate_hash(password: str, algo: str) -> str:
    password = password.encode("utf-8")

    if algo == "md5":
        return hashlib.md5(password).hexdigest()
    if algo == "sha1":
        return hashlib.sha1(password).hexdigest()
    if algo == "sha256":
        return hashlib.sha256(password).hexdigest()

    raise ValueError("Unsupported algorithm")


# ================= MAIN CHECK FUNCTION =================
def dictionary_breach_check(value: str, mode: str, algo: str = None):
    value = value.strip().lower()

    if not value:
        return False, "Empty input"

    # -------- PLAINTEXT MODE --------
    if mode == "plaintext":

        if value in PLAINTEXT_SET:
            return True, "Password found in leaked plaintext database"

        for algo_name, hash_set in [
            ("md5", MD5_SET),
            ("sha1", SHA1_SET),
            ("sha256", SHA256_SET),
        ]:
            if generate_hash(value, algo_name) in hash_set:
                return True, f"Password leaked via {algo_name.upper()} hash"

        return False, "Password not found in leak databases"

    # -------- HASH MODE --------
    if mode == "hash":

        if algo == "md5" and value in MD5_SET:
            return True, "MD5 hash found in leaked database"

        if algo == "sha1" and value in SHA1_SET:
            return True, "SHA1 hash found in leaked database"

        if algo == "sha256" and value in SHA256_SET:
            return True, "SHA256 hash found in leaked database"

        return False, f"{algo.upper()} hash not found in leak databases"

    return False, "Invalid mode"
