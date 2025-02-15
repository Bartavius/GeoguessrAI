import os
import shutil
import time

def generate_grids(top_left, bottom_right):
    top_left_lat, top_left_lon = top_left
    bottom_right_lat, bottom_right_lon = bottom_right

    lat_diff = top_left_lat - bottom_right_lat
    lon_diff = top_left_lon - bottom_right_lon

    lat_diff_per_grid = abs(lat_diff / 7)
    lon_diff_per_grid = abs(lon_diff / 10)

    return_grid = {}
    for i in range(7):
        for j in range(10):
            return_grid[f"{i}-{j}"] = {
                "top_left_corner": (top_left_lat - lat_diff_per_grid * i, top_left_lon + lon_diff_per_grid * j),
                "bottom_right_corner": (top_left_lat - lat_diff_per_grid * (i + 1), top_left_lon + lon_diff_per_grid * (j + 1)),
                "coords": []
            }

    for i in range(7):
        for j in range(10):
            print(f"grid {i}-{j}: ")
            print("  top left    : ", return_grid[f"{i}-{j}"]["top_left_corner"])
            print("  bottom right: ", return_grid[f"{i}-{j}"]["bottom_right_corner"])
    
    return return_grid

def move_images_to_their_grid(base_dir="./"):
    top_left = (49.049081, -125.450687)
    bottom_right = (24.455005, -67.343249)
    grid = generate_grids(top_left, bottom_right)

    grid_0_0_folder = os.path.join(base_dir, "grid-0-0")
    total_files_moved = 0   
    for i in range(7):
        for j in range(10):
            grid_name = f"grid-{i}-{j}"
            grid_num = f"{i}-{j}"

            for file in os.listdir(grid_0_0_folder):
                coords = file.removesuffix(".jpg").split(",")
                lat = float(coords[0])
                long = float(coords[1])
                between_lat =  grid[grid_num]["bottom_right_corner"][0] <= lat < grid[grid_num]["top_left_corner"][0]
                between_long =  grid[grid_num]["top_left_corner"][1] <= long < grid[grid_num]["bottom_right_corner"][1]
                if between_lat and between_long:
                    grid[grid_num]["coords"].append((lat, long))
                    file_path = os.path.join(grid_0_0_folder, file)
                    new_path = os.path.join(base_dir, grid_name, file)
                    shutil.move(file_path, new_path)
                    total_files_moved += 1
    
    print(f"grid alaska: ")
    print("  top left    : ", grid["alaska"]["top_left_corner"])
    print("  bottom right: ", grid["alaska"]["bottom_right_corner"])
    print("        coords: ", grid["alaska"]["coords"])
    print(f"grid hawaii: ")
    print("  top left    : ", grid["hawaii"]["top_left_corner"])
    print("  bottom right: ", grid["hawaii"]["bottom_right_corner"])
    print("        coords: ", grid["hawaii"]["coords"])
    for i in range(7):
        for j in range(10):
            print(f"grid {i}-{j}: ")
            print("  top left    : ", grid[f"{i}-{j}"]["top_left_corner"])
            print("  bottom right: ", grid[f"{i}-{j}"]["bottom_right_corner"])
            print("        coords: ", grid[f"{i}-{j}"]["coords"])
    print("========================")
    print(f"Total files moved: {total_files_moved}")

                
# Function to move all images from directories that start with "grid" into "grid-0-0"
def move_images_to_grid_0_0(base_dir="./"):
    grid_0_0_folder = os.path.join(base_dir, "grid-0-0")
    
    # Iterate over all folders in the base directory
    total_files_moved = 0
    for folder_name in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder_name)
        if os.path.isdir(folder_path) and folder_name.startswith("grid"):
            # Iterate over all files in the folder
            for file in os.listdir(folder_path):
                file_path = os.path.join(folder_path, file)
                if file.endswith(".jpg") and os.path.isfile(file_path):  # Check if it's a .jpg image
                    # Move the image to "grid-0-0"
                    new_path = os.path.join(grid_0_0_folder, file)
                    shutil.move(file_path, new_path)
                    total_files_moved += 1
    
    print(f"Total files moved: {total_files_moved}")

if __name__ == "__main__":
    top_left = (49.049081, -125.450687)
    bottom_right = (24.455005, -67.343249)
    generate_grids(top_left, bottom_right)
    # move_images_to_grid_0_0()
    # move_images_to_their_grid()
