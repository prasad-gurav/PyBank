import random
import string

def generate_random_number():
    return random.randint(10**10, (10**11)-1)

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string
