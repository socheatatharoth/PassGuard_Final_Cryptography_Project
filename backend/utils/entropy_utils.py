import math

def calculate_entropy(password):
    """
    Calculates approximate entropy of a password.
    """
    if not password:
        return 0

    pool_size = 0
    if any(c.islower() for c in password):
        pool_size += 26
    if any(c.isupper() for c in password):
        pool_size += 26
    if any(c.isdigit() for c in password):
        pool_size += 10
    if any(not c.isalnum() for c in password):
        pool_size += 32  # common symbols

    entropy = len(password) * math.log2(pool_size) if pool_size > 0 else 0
    return round(entropy, 2)


def estimate_crack_time(entropy):
    """
    Estimate time to crack a password based on entropy.
    """
    guesses_per_second = 1e10  # 10 billion guesses/sec
    seconds = 2 ** entropy / guesses_per_second

    # Convert to readable format
    if seconds < 60:
        return f"{seconds:.2f} seconds"
    minutes = seconds / 60
    if minutes < 60:
        return f"{minutes:.2f} minutes"
    hours = minutes / 60
    if hours < 24:
        return f"{hours:.2f} hours"
    days = hours / 24
    if days < 365:
        return f"{days:.2f} days"
    years = days / 365
    return f"{years:.2f} years"
