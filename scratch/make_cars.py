import os
import re

src_dir = '/Users/suryakanth/tot--wedplanner/src/components'
list_file = os.path.join(src_dir, 'CarsListingPage.tsx')
detail_file = os.path.join(src_dir, 'CarsDetailPage.tsx')

with open(os.path.join(src_dir, 'PhotographyListingPage.tsx'), 'r') as f:
    photo_list = f.read()

with open(os.path.join(src_dir, 'StudioDetailPage.tsx'), 'r') as f:
    photo_detail = f.read()

# Replace in Listing Page
cars_list = photo_list
cars_list = cars_list.replace("PhotographyListingPage", "CarsListingPage")
cars_list = cars_list.replace("PhotographyStudio", "CarItem")
cars_list = cars_list.replace("STUDIOS_DATA", "CARS_DATA")
cars_list = cars_list.replace("StudioDetailPage", "CarsDetailPage")
cars_list = cars_list.replace("Photography", "Cars")
cars_list = cars_list.replace("photography", "cars")
cars_list = cars_list.replace("Studio", "Car")
cars_list = cars_list.replace("studio", "car")
cars_list = cars_list.replace("savedCarIds", "savedCarIds") # already matched

# Remove the inline interface and export const from the file
cars_list = re.sub(r'export interface CarItem \{.*?\}\n', '', cars_list, flags=re.DOTALL)
cars_list = re.sub(r'export const CARS_DATA: CarItem\[\] = \[.*?\];\n', '', cars_list, flags=re.DOTALL)
# Import them instead
cars_list = cars_list.replace("import { CarsDetailPage } from './CarsDetailPage';", "import { CarsDetailPage } from './CarsDetailPage';\nimport { CarItem, CARS_DATA } from '../constants/CarsData';")


# Replace in Detail Page
cars_detail = photo_detail
cars_detail = cars_detail.replace("StudioDetailPage", "CarsDetailPage")
cars_detail = cars_detail.replace("PhotographyStudio", "CarItem")
cars_detail = cars_detail.replace("Photography", "Cars")
cars_detail = cars_detail.replace("photography", "cars")
cars_detail = cars_detail.replace("Studio", "Car")
cars_detail = cars_detail.replace("studio", "car")

# Fix import path
cars_detail = cars_detail.replace("import { CarItem } from './CarsListingPage';", "import { CarItem } from '../constants/CarsData';")

with open(list_file, 'w') as f:
    f.write(cars_list)

with open(detail_file, 'w') as f:
    f.write(cars_detail)

print("Cars files generated.")
