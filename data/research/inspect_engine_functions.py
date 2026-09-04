import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('js/vastu-engine.js', 'r', encoding='utf-8') as f:
    text = f.read()

def print_fn(fn_name, max_lines=50):
    start = text.find('function ' + fn_name)
    if start == -1:
        print('Not found:', fn_name)
        return
    chunk = text[start:start+3000]
    lines = chunk.split('\n')[:max_lines]
    print(f'=== {fn_name} ===')
    print('\n'.join(lines))
    print('\n' + '-'*60)

print_fn('calculateMainDoorVastu', 45)
print_fn('calculateFacing', 45)
print_fn('calculateToiletVastu', 55)
