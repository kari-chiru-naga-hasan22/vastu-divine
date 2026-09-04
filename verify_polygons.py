import os
import re

issues = []
checked = 0
for root, dirs, files in os.walk('D:/builds'):
    # Skip node_modules or .git if any
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith(('.html', '.js')):
            fpath = os.path.join(root, file)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            for m in re.finditer(r'<polygon\s+[^>]*>', content):
                checked += 1
                tag = m.group(0)
                if 'points="points=' in tag or "points='points=" in tag:
                    issues.append((fpath, tag, 'Duplicate points attribute'))
                pts_matches = re.findall(r'points=[\'"]([^\'"]*)[\'"]', tag)
                if not pts_matches:
                    issues.append((fpath, tag, 'Missing or unquoted points attribute'))
                else:
                    for pt_val in pts_matches:
                        if '${' in pt_val:
                            # Dynamic template string
                            continue
                        if 'NaN' in pt_val or 'undefined' in pt_val or 'null' in pt_val:
                            issues.append((fpath, tag, 'Points contains NaN/undefined/null'))
                        if 'points=' in pt_val:
                            issues.append((fpath, tag, 'Points value contains literal points='))

print(f"Total polygons checked: {checked}")
print(f"Total polygon issues found: {len(issues)}")
for path, tag, err in issues:
    print(f"{path}: {err} -> {tag[:100]}")

if len(issues) == 0:
    print("ALL SVG POLYGONS ARE 100% VALID!")
