import math
import sys
import webbrowser

def triangle_area():
    base = float(input('What is the base? '))
    height = float(input('What is the height? '))
    return (base * height) / 2

def pit():
    n1 = float(input('What is the first cathet? '))
    n2 = float(input('What is the second cathet? '))
    hipo = math.sqrt(n1**2 + n2**2)
    return f'The hypotenuse of this triangle is {hipo}'

def prime():
    n = int(input("Write a number: "))
    if n < 2:
        return f"{n} is not a prime number. Try again."
    if n == 2:
        return f"{n} is a prime number."
        
    if n % 2 == 0:
        return f"{n} is not a prime number."
    
    x = 3
    while x <= math.sqrt(n):
        if n % x == 0:
            return f"{n} is not a prime number."
        x += 2
    
    return f"{n} is a prime number."

def circle_area():
    radius = float(input('What is the radius? '))
    return math.pi * (radius ** 2)

def calculator(n1, n2, op):
    if op == "+":
        return n1 + n2
    elif op == "-":
        return n1 - n2
    elif op == "*":
        return n1 * n2
    elif op == "/":
        return n1 / n2
    elif op == "**":
        return n1 ** n2
    elif op == "sqrt":
        return math.sqrt(n1)
    else:
        return 'Invalid operation.'

def esg():
    a = float(input('a: '))
    b = float(input('b: '))
    c = float(input('c: '))
    delta = (b**2) - (4*a*c)
    if delta < 0:
        return 'Your equation doesn\'t have real solutions.'
    elif delta == 0:
        x = (-b + math.sqrt(delta)) / (2 * a)
        return f'The equation has only one solution: x = {x}'
    else:
        x1 = (-b + math.sqrt(delta)) / (2 * a)
        x2 = (-b - math.sqrt(delta)) / (2 * a)
        return f'The solutions are x1 = {x1} and x2 = {x2}'

def sin_value():
    angle = float(input('Enter the angle in degrees: '))
    return math.sin(math.radians(angle))

def cos_value():
    angle = float(input('Enter the angle in degrees: '))
    return math.cos(math.radians(angle))

def tan_value():
    angle = float(input('Enter the angle in degrees: '))
    return math.tan(math.radians(angle))

def celsius_fah():
    celsius = float(input('Write a temperature in Celsius: '))
    fahr = (celsius * 1.8) + 32
    return f'{celsius}°C in Fahrenheit is {fahr}°F'

def fah_celsius():
    fahr = float(input('Write a temperature in Fahrenheit: '))
    celsius = (fahr - 32) / 1.8
    return f'{fahr}°F in Celsius is {celsius}°C'

def celsius_kelvin():
    celsius = float(input('Write a temperature in Celsius: '))
    kelvin = celsius + 273.15
    return f'{celsius}°C in Kelvin is {kelvin} K'

def kelvin_celsius():
    kelvin = float(input('Write a temperature in Kelvin: '))
    celsius = kelvin - 273.15
    return f'{kelvin} K in Celsius is {celsius}°C'

options = {
    'calculator': calculator,
    'triangle area': triangle_area,
    'circle area': circle_area,
    'prime number': prime,
    'sin': sin_value,
    'cos': cos_value,
    'tan': tan_value,
    'second degree equation': esg,
    'celsius to fahrenheit': celsius_fah,
    'fahrenheit to celsius': fah_celsius,
    'celsius to kelvin': celsius_kelvin,
    'kelvin to celsius': kelvin_celsius,
    'hypotenuse': pit
}

def main():
    args = sys.argv

    while True:
        user_input = input('What do you want to do today? ').lower()

        if user_input not in options:
            print('Invalid option. Try again.')
            continue

        if user_input == 'calculator':
            n1 = float(input('Write one number: '))
            op = input('Choose an operation: ')

            if op == "sqrt":
                result = calculator(n1, None, op)
            else:
                n2 = float(input('Write another number: '))
                result = calculator(n1, n2, op)

            print("Result:", result)
        else:
            print(options[user_input]())

        p = input('Do you want to continue? (yes/no): ').lower()
        if p != 'yes':
            print('You finished your session!')
            break

        
        if user_input == 'prime number':
            p1 = input('Do you want a slide to understand better about prime numbers? (yes/no): ')
            if p1.lower() == 'yes':
                url = 'https://www.canva.com/design/DAGN8k2HU6s/N0-BSoZnXVZIxEUWa1CrPA/edit?utm_content=DAGN8k2HU6s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
                webbrowser.open(url)

if __name__ == "__main__":
    main()
