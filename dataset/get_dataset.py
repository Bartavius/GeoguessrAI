import os
import random
import time
import requests  # Using requests instead of urllib for easier handling
from time import sleep
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv("../web/.env.local")  # Path to your .env.local file
api_key = os.getenv("REACT_APP_GOOGLE_MAPS_API_KEY")

# Function to generate coordinates within the grid's specific bounds
def generate_coords_within_grid(grid):
    lat_min, lon_min = grid["bottom_right"]
    lat_max, lon_max = grid["top_left"]

    # Generate coordinates within the specific grid's bounds
    lat = random.uniform(lat_min, lat_max)
    lon = random.uniform(lon_min, lon_max)
    return lat, lon

# Function to get metadata of the generated coordinates
def get_metadata(coords):
    metadata_URL = f"https://maps.googleapis.com/maps/api/streetview/metadata?key={api_key}&location={coords[0]},{coords[1]}"
    metadata = requests.get(metadata_URL).json()  # Using requests to get the metadata
    return metadata["status"] == "OK"

# Function to generate the grid structure
def generate_grids(top_left, bottom_right):
    # Create a 10x7 grid
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
                "coords": []
            }
    return grids

# Function to create the directory if it doesn't exist
def create_directory(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

# Function to save the image based on coordinates
def save_image(coords, grid_name):
    # Create the grid folder if it doesn't exist
    grid_folder = os.path.join("../", f"grid-{grid_name}")
    create_directory(grid_folder)

    # Prepare the file name using the coordinates
    lat, lon = coords
    image_name = f"{lat},{lon}.jpg"
    image_path = os.path.join(grid_folder, image_name)

    # Check if the image already exists, if it does, don't overwrite
    if not os.path.exists(image_path):
        streetview_URL = f"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={lat},{lon}&key={api_key}"
        img_data = requests.get(streetview_URL).content
        with open(image_path, "wb") as img_file:
            img_file.write(img_data)
        print(f"Saved image: {image_path}")
    else:
        print(f"Image already exists: {image_path}")

# Function to count how many images have been downloaded
def count_downloaded_images(base_dir="../grid-"):
    image_count = 0
    if os.path.exists(base_dir):
        for folder in os.listdir(base_dir):
            folder_path = os.path.join(base_dir, folder)
            if os.path.isdir(folder_path) and folder.startswith("grid"):
                for file in os.listdir(folder_path):
                    if file.endswith(".jpg"):
                        image_count += 1
    return image_count

# Main function to execute the entire process
def main():
    top_left = (49.049081, -125.450687)
    bottom_right = (24.455005, -67.343249)

    # Generate grid coordinates
    grid_coords = generate_grids(top_left, bottom_right)

    limit_per_grid = 200
    recorded_locations = set()

    # Iterate through all grid cells
    for grid_name, grid_info in grid_coords.items():
        valid_coords_count = 0
        invalid_coords_count = 0

        while valid_coords_count < limit_per_grid:
            generated_coords = generate_coords_within_grid(grid_info)

            # Skip if coordinates already recorded
            if generated_coords in recorded_locations:
                continue

            # Check metadata for validity
            if get_metadata(generated_coords):
                valid_coords_count += 1
                recorded_locations.add(generated_coords)
                save_image(generated_coords, grid_name)
                print(f"Successfully saved image at {generated_coords}")
            else:
                invalid_coords_count += 1

            # If 5000 invalid coordinates have been reached, skip the grid
            if invalid_coords_count > 5000:
                print(f"Skipping grid {grid_name}, too many invalid coordinates.")
                break

            # Sleep for a second to avoid hitting the API limit
            sleep(1)

        print(f"Finished grid {grid_name} with {valid_coords_count} images.")

if __name__ == "__main__":
    main()
