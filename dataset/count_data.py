import os

def count_files_in_grid_folders(base_dir="./"):
    # Initialize the file count
    file_count = 0
    
    # Check if the base directory exists
    if os.path.exists(base_dir):
        print(f"Scanning base directory: {base_dir}")  # Debug print
        # Iterate over all folders in the base directory
        for folder in os.listdir(base_dir):
            folder_path = os.path.join(base_dir, folder)
            
            # Check if it is a directory and its name starts with 'grid'
            if os.path.isdir(folder_path):
                print(f"Found directory: {folder_path}")  # Debug print
                
                if folder.startswith("grid"):
                    print(f"Counting files in: {folder_path}")  # Debug print
                    # Count all files in this grid folder
                    for file in os.listdir(folder_path):
                        file_path = os.path.join(folder_path, file)
                        if os.path.isfile(file_path):  # Ensure it's a file, not a subfolder
                            print(f"Found file: {file_path}")  # Debug print
                            file_count += 1
    else:
        print(f"Base directory not found: {base_dir}")
    
    return file_count

total = 0

grid_folder = os.path.join("./", f"grid-alaska")
length = len(os.listdir(grid_folder))
total += length
print(f"alaska", length)

grid_folder = os.path.join("./", f"grid-hawaii")
length = len(os.listdir(grid_folder))
total += length
print(f"hawaii", length)

# Example usage
for i in range(7):
    for j in range(10):
        grid_folder = os.path.join("./", f"grid-{i}-{j}")
        length = len(os.listdir(grid_folder))
        total += length
        print(f"{i}-{j}", length)

print("Total: ", total)

# 0-0 498
# 0-1 230
# 0-2 81
# 0-3 68
# 0-4 393
# 0-5 453
# 0-6 88
# 0-7 91
# 0-8 150
# 0-9 365
# 1-0 379
# 1-1 164
# 1-2 142
# 1-3 91
# 1-4 374
# 1-5 741
# 1-6 906
# 1-7 900
# 1-8 901
# 1-9 676
# 2-0 395
# 2-1 52
# 2-2 232
# 2-3 454
# 2-4 421
# 2-5 816
# 2-6 1217
# 2-7 1175
# 2-8 1442
# 2-9 414
# 3-0 484
# 3-1 211
# 3-2 165
# 3-3 202
# 3-4 548
# 3-5 724
# 3-6 1093
# 3-7 1174
# 3-8 649
# 3-9 0
# 4-0 16
# 4-1 621
# 4-2 407
# 4-3 209
# 4-4 711
# 4-5 679
# 4-6 1042
# 4-7 1178
# 4-8 97
# 4-9 0
# 5-0 0
# 5-1 4
# 5-2 50
# 5-3 64
# 5-4 539
# 5-5 629
# 5-6 467
# 5-7 621
# 5-8 0
# 5-9 0
# 6-0 0
# 6-1 2
# 6-2 30
# 6-3 53
# 6-4 211
# 6-5 0
# 6-6 0
# 6-7 437
# 6-8 1
# 6-9 0
