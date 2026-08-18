import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Match borderRadius: 20, width: '90%', maxWidth: 450,
    # Replace with borderTopLeftRadius: 24, borderTopRightRadius: 24, width: '100%', maxWidth: 800, alignSelf: 'center',
    
    # We only want to replace it for mainCard or mainContentCard or similar layout cards in DetailPages
    # Let's just find `borderRadius: 20,\n    width: '90%',\n    maxWidth: 450,` inside styles for these cards.
    
    # A safer regex: Look for `backgroundColor: '#FAF7F2'` followed by the broken radius
    pattern = re.compile(
        r"(backgroundColor:\s*['\"]#FAF7F2['\"],\s*)borderRadius:\s*20,\s*width:\s*['\"]90%['\"],\s*maxWidth:\s*450,\s*"
    )
    
    def repl(m):
        return m.group(1) + "borderTopLeftRadius: 24,\n    borderTopRightRadius: 24,\n    width: '100%',\n    maxWidth: 800,\n    alignSelf: 'center',\n"

    new_content = pattern.sub(repl, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {os.path.basename(filepath)}")

files = glob.glob('/Users/suryakanth/tot--wedplanner/src/components/*DetailPage.tsx')
for file in files:
    fix_file(file)

print("Done")
