import os
import glob
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # The broken style looks like:
    #   mainContentCard: {
    #     marginTop: -28,
    #     backgroundColor: '#FAF7F2',
    #     borderRadius: 20,
    #     width: '90%',
    #     maxWidth: 450,
    #     
    #     paddingHorizontal: 16,
    
    pattern = re.compile(
        r"(mainContentCard:\s*\{\s*marginTop:\s*-28,\s*backgroundColor:\s*['\"]#FAF7F2['\"],\s*)borderRadius:\s*20,\s*width:\s*['\"]90%['\"],\s*maxWidth:\s*450,\s*"
    )
    
    def repl(m):
        return m.group(1) + "borderTopLeftRadius: 24,\n    borderTopRightRadius: 24,\n    width: '100%',\n    maxWidth: 800,\n    alignSelf: 'center',\n"

    new_content = pattern.sub(repl, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {os.path.basename(filepath)}")

files = glob.glob('/Users/suryakanth/tot--wedplanner/src/components/*.tsx')
for file in files:
    fix_file(file)

print("Done")
