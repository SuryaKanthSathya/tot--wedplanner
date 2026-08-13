import os
import re

src_dir = '/Users/suryakanth/tot--wedplanner/src/components'
ent_list_file = os.path.join(src_dir, 'EntertainmentListingPage.tsx')
ent_detail_file = os.path.join(src_dir, 'EntertainmentDetailPage.tsx')

# 1. Extract ENTERTAINMENT_DATA and EntertainmentItem from EntertainmentListingPage.tsx
with open(ent_list_file, 'r') as f:
    ent_list_content = f.read()

# Try to extract EntertainmentItem interface/type (actually it's in EntertainmentDetailPage.tsx originally, but let's grab it)
with open(ent_detail_file, 'r') as f:
    ent_detail_content = f.read()

data_match = re.search(r'(export const ENTERTAINMENT_DATA: EntertainmentItem\[\] = \[.*?\];)', ent_list_content, re.DOTALL)
type_match = re.search(r'(export interface EntertainmentItem \{.*?\})', ent_detail_content, re.DOTALL)

data_code = data_match.group(1) if data_match else ""
type_code = type_match.group(1) if type_match else ""

os.makedirs('/Users/suryakanth/tot--wedplanner/src/constants', exist_ok=True)
with open('/Users/suryakanth/tot--wedplanner/src/constants/EntertainmentData.ts', 'w') as f:
    f.write(type_code + "\n\n" + data_code)

# 2. Read Photography files
with open(os.path.join(src_dir, 'PhotographyListingPage.tsx'), 'r') as f:
    photo_list = f.read()
with open(os.path.join(src_dir, 'StudioDetailPage.tsx'), 'r') as f:
    photo_detail = f.read()

# 3. Process Listing Page
# Replace strings
ent_list = photo_list
ent_list = ent_list.replace("PhotographyListingPage", "EntertainmentListingPage")
ent_list = ent_list.replace("Photography", "Entertainment")
ent_list = ent_list.replace("photography", "entertainment")
ent_list = ent_list.replace("Studio", "Artist")
ent_list = ent_list.replace("studio", "artist")
ent_list = ent_list.replace("STUDIOS_DATA", "ENTERTAINMENT_DATA")

# Remove PhotographyStudio and STUDIOS_DATA definitions and import them instead
ent_list = re.sub(r'export interface EntertainmentArtist \{.*?\}\n', '', ent_list, flags=re.DOTALL)
ent_list = re.sub(r'export const ENTERTAINMENT_DATA: EntertainmentArtist\[\] = \[.*?\];\n', '', ent_list, flags=re.DOTALL)
ent_list = re.sub(r"import \{ StudioDetailPage \} from './StudioDetailPage';", "import { EntertainmentDetailPage } from './EntertainmentDetailPage';\nimport { EntertainmentItem as EntertainmentArtist, ENTERTAINMENT_DATA } from '../constants/EntertainmentData';", ent_list)

# Adjust tier badge colors for Entertainment tiers
ent_list = ent_list.replace("artist.tier === 'Premium'", "artist.tier === 'Premium' || artist.tier === 'Luxury'")
ent_list = ent_list.replace("artist.tier === 'Essential'", "artist.tier === 'Essential' || artist.tier === 'Popular'")


# 4. Process Detail Page
ent_detail = photo_detail
ent_detail = ent_detail.replace("StudioDetailPage", "EntertainmentDetailPage")
ent_detail = ent_detail.replace("PhotographyStudio", "EntertainmentArtist")
ent_detail = ent_detail.replace("Studio", "Artist")
ent_detail = ent_detail.replace("studio", "artist")
ent_detail = ent_detail.replace("Photography", "Entertainment")
ent_detail = ent_detail.replace("photography", "entertainment")
ent_detail = ent_detail.replace("from './EntertainmentListingPage'", "from '../constants/EntertainmentData'")

# Fix import
ent_detail = ent_detail.replace("import { EntertainmentArtist } from '../constants/EntertainmentData';", "import { EntertainmentItem as EntertainmentArtist } from '../constants/EntertainmentData';")


# Write new files
with open(ent_list_file, 'w') as f:
    f.write(ent_list)

with open(ent_detail_file, 'w') as f:
    f.write(ent_detail)

print("Replacement complete.")
