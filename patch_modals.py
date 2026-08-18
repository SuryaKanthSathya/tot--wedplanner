import os
import glob
import re

def patch_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # We need to replace modalBackdrop and quoteBackdrop styles
    # We want to add display: 'flex', alignItems: 'center', justifyContent: 'center'
    # And we want to change modalSheet and quoteModalSheet to have width, maxWidth, borderRadius
    
    # 1. modalBackdrop
    content = re.sub(
        r'(modalBackdrop:\s*\{[^}]*?justifyContent:\s*)[\'"]flex-end[\'"]',
        r"\1'center',\n    alignItems: 'center',\n    display: 'flex'",
        content
    )
    # also if it lacked justifyContent entirely, we might need a more robust regex, but looking at my grep, they all look identical.
    
    # Let's just do a string replacement for the exact blocks since they are copy-pasted.
    
    # Instead of fragile regex, let's just find and replace the standard style blocks.
    # Actually, regex is fine if we target the specific lines.
    
    # Fix modalBackdrop
    content = re.sub(
        r'justifyContent:\s*[\'"]flex-end[\'"]',
        r"justifyContent: 'center',\n    alignItems: 'center',\n    display: 'flex'",
        content
    )

    # Fix modalSheet
    content = re.sub(
        r'borderTopLeftRadius:\s*\d+,',
        r"borderRadius: 20,\n    width: '90%',\n    maxWidth: 450,",
        content
    )
    content = re.sub(
        r'borderTopRightRadius:\s*\d+,',
        r"",
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

files = glob.glob('/Users/suryakanth/tot--wedplanner/src/components/*.tsx')
for file in files:
    patch_file(file)
print("Patching complete.")
