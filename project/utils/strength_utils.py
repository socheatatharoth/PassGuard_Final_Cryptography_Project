import math,re

def check_strength(password:str)->str:
    L=len(password)
    num=bool(re.search(r"\d",password))
    sym=bool(re.search(r"[!@#$%^&*(),.?\":{}|<>]",password))

    if L<=8: return "Weak"
    if 9<=L<=12: return "Medium" if(num and sym)else "Weak"
    if L>12: return "Strong" if(num and sym)else "Weak"
    return "Weak"

def entropy(password:str)->float:
    pool=0
    if re.search(r"[a-z]",password): pool+=26
    if re.search(r"[A-Z]",password): pool+=26
    if re.search(r"[0-9]",password): pool+=10
    if re.search(r"[!@#$%^&*(),.?\":{}|<>]",password): pool+=32
    return 0 if pool==0 else round(len(password)*math.log2(pool),2)

def crack_time(ent:float)->str:
    sec=(2**ent)/1_000_000_000
    for label,value in [
        ("Less than a minute",60),
        ("Minutes",3600),
        ("Hours",86400),
        ("Days",604800),
        ("Weeks",2592000),
        ("Months",31536000),
        ("Years",315360000)
    ]:
        if sec<value:return label
    return "Centuries+"

def analyze_password(pw:str)->dict:
    s=check_strength(pw)
    e=entropy(pw)
    c=crack_time(e)
    num=bool(re.search(r"\d",pw))
    sym=bool(re.search(r"[!@#$%^&*(),.?\":{}|<>]",pw))

    reason=f"It is {s.lower()} because length is {len(pw)}, "\
           f"{'contains' if num else 'does not contain'} number, "\
           f"and {'contains' if sym else 'does not contain'} symbol."

    sug=[]
    if s=="Weak":sug=["Use more than 8 characters","Add numbers + special symbols"]
    elif s=="Medium":sug=["Increase length beyond 12","Mix upper/lower case"]

    return{
        "password":pw,
        "strength":s,
        "reasonText":reason,
        "entropy":f"{e} bits",
        "crackTime":c,
        "suggestions":sug
    }
