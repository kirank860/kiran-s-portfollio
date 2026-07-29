import sys
from rembg import remove
from PIL import Image
import numpy as np

def process_image(input_path, output_path):
    print(f"Processing {input_path}...")
    # Load original image
    img = Image.open(input_path)
    
    # Remove background
    out = remove(img)
    
    # Convert to numpy array to find bounding box of alpha channel
    np_img = np.array(out)
    alpha = np_img[:, :, 3]
    
    # Find bounding box
    rows = np.any(alpha, axis=1)
    cols = np.any(alpha, axis=0)
    
    if not np.any(rows) or not np.any(cols):
        print("Empty image after background removal.")
        return
        
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    # The bounding box of the person is from ymin to ymax
    height = ymax - ymin
    
    # We want to remove the shoulders. Usually, the head and neck are in the top 55-65% of the body bounding box in a portrait.
    # Let's crop the bottom 40% of the person's bounding box.
    crop_ymax = ymin + int(height * 0.6) 
    
    # Crop the image to just the head area
    # We add some padding around the head
    pad = 20
    final_ymin = max(0, ymin - pad)
    final_ymax = min(out.height, crop_ymax)
    final_xmin = max(0, xmin - pad)
    final_xmax = min(out.width, xmax + pad)
    
    head_img = out.crop((final_xmin, final_ymin, final_xmax, final_ymax))
    
    # Save the result
    head_img.save(output_path)
    print(f"Saved head cutout to {output_path}")

if __name__ == "__main__":
    process_image('public/kiran.jpeg', 'public/kiran_head.png')
