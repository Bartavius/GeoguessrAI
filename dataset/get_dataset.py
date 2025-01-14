# 49.049081, -125.450687

# 24.455005, -67.343249

import random
from urllib import request

api_key = "EMPTY_API_KEY_FOR_NOW"

# TODO: Implement a way to generate grids based on the top left and bottom right coordinates
def generate_grids(top_left, bottom_right):
    # only a maximum of x coords can be generated in each grid
    return {}

def generate_coords(top_left, bottom_right):
    lat = random.uniform(top_left[1], bottom_right[1])
    lon = random.uniform(top_left[0], bottom_right[0])
    return lat, lon

async def get_metadata(coords):
    global api_key
    metadata_URL = f"https://maps.googleapis.com/maps/api/streetview/metadata?key={api_key}&location={coords[0]},{coords[1]}"
    metadata = await request.get(metadata_URL)
    return metadata["status"] != "OK"
    

def main():

    top_left =  (49.049081, -125.450687)
    bottom_right = (24.455005, -67.343249)
    
    recorded_locations = []
    grid_coords = generate_grids(top_left, bottom_right)

    global api_key

    limit_per_grid = 200
    for grid in grid_coords:

        valid_coords_count = 0

        for i in range(limit_per_grid):
            
            count = invalid_coords_count = 0
            while valid_coords_count < limit_per_grid:
                generated_coords = generate_coords()

                # if the location does not exist after generating 5000 coords then it's likely an invalid grid altogether (just ocean space) OR that there's no more coverage
                if invalid_coords_count > 5000:
                    # TODO: skip this grid and break
                    break


                # if the location does exist, add it to the valid coords count
                if get_metadata(generated_coords):
                    valid_coords_count += 1
                    invalid_coords_count = 0
                else:
                    invalid_coords_count += 1
            

            streetview_URL = f"https://maps.googleapis.com/maps/api/streetview?size=600x300&location={generated_coords[0]},{generated_coords[1]}&key={api_key}"
            recorded_locations.append(generated_coords)
            grid_coords[grid].append(generated_coords)
            # TODO: make the request to google api
            # TODO: save the image in united_states / {grid} / returned_image.jpg

            # also just to note, make sure no images are being replaced. Data do be expensive
    
    

        


if __name__ == "__main__":
    main()