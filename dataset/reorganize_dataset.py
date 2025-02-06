import os
import shutil
import re

# Load environment variables
from dotenv import load_dotenv
load_dotenv("../web/.env.local")
api_key = os.getenv("REACT_APP_GOOGLE_MAPS_API_KEY")

# Function to generate grids (same logic as before)
def generate_grids(top_left, bottom_right):
    top_left_lat, top_left_lon = top_left
    bottom_right_lat, bottom_right_lon = bottom_right

    lat_diff = top_left_lat - bottom_right_lat
    lon_diff = top_left_lon - bottom_right_lon

    lat_diff_per_grid = lat_diff / 7
    lon_diff_per_grid = lon_diff / 10

    grids = {}
    for i in range(7):
        for j in range(10):
            grids[f"{i}-{j}"] = {
                "top_left": (top_left_lat - lat_diff_per_grid * i, top_left_lon + lon_diff_per_grid * j),
                "bottom_right": (bottom_right_lat - lat_diff_per_grid * i, bottom_right_lon + lon_diff_per_grid * j),
            }
    return grids

# Function to check if a coordinate belongs to a grid
def get_grid_for_coords(coords, grids):
    for grid_name, grid_info in grids.items():
        lat_min, lon_min = grid_info["bottom_right"]
        lat_max, lon_max = grid_info["top_left"]

        # Check if the coordinates fall within this grid's bounds
        if lat_min <= coords[0] <= lat_max and lon_min <= coords[1] <= lon_max:
            return grid_name
    return None  # If no grid is found (shouldn't happen)

# Function to move image to the correct grid folder
def move_image_to_grid(image_path, grid_name):
    # Create the grid folder if it doesn't exist
    grid_folder = os.path.join("./", f"grid-{grid_name}")  # Adjust path to be in the current folder
    if not os.path.exists(grid_folder):
        os.makedirs(grid_folder)

    # Move the image to the grid folder
    shutil.move(image_path, os.path.join(grid_folder, os.path.basename(image_path)))
    print(f"Moved {image_path} to {grid_folder}")

# Function to extract coordinates from the filename
def extract_coords_from_filename(filename):
    match = re.match(r"([+-]?\d+\.\d+),([+-]?\d+\.\d+)\.jpg", filename)
    if match:
        lat = float(match.group(1))
        lon = float(match.group(2))
        print(f"Extracted coords: {lat}, {lon}")  # Debug: Check if coords are extracted correctly
        return lat, lon
    print(f"Failed to extract coords from filename: {filename}")  # Debug: Print if extraction fails
    return None

# Function to reorganize images based on the grid boundaries
def reorganize_images(base_dir="./"):
    top_left = (49.049081, -125.450687)
    bottom_right = (24.455005, -67.343249)

    # Generate grids
    grids = generate_grids(top_left, bottom_right)

    # Iterate through all directories starting with 'grid' in the base directory
    total_files_moved = 0
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)
        if os.path.isdir(folder_path) and folder.startswith("grid"):
            # Iterate through all files in the folder
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)
                if file.endswith(".jpg"):
                    coords = extract_coords_from_filename(file)
                    if coords:
                        # Get the correct grid for these coordinates
                        correct_grid = get_grid_for_coords(coords, grids)
                        print(f"File {file} should go to grid: {correct_grid}")  # Debug: Print grid determination
                        if correct_grid and folder != f"grid-{correct_grid}":
                            # Move image to the correct folder
                            move_image_to_grid(file_path, correct_grid)
                            total_files_moved += 1
    print(f"Total files moved: {total_files_moved}")

if __name__ == "__main__":
    reorganize_images()
