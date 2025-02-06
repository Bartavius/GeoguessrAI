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

# Example usage
print(f"Total files in 'grid' folders: {count_files_in_grid_folders()}")
