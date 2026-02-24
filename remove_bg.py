from PIL import Image
import os
import sys

def remove_white_background(input_path, output_path, tolerance=30):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # item is (R, G, B, A)
            r, g, b, a = item
            # Check if pixel is close to white (255, 255, 255)
            if r > 255 - tolerance and g > 255 - tolerance and b > 255 - tolerance:
                # Replace with transparent
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} -> {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    public_dir = os.path.join("frontend", "public")
    files_to_process = [
        ("logo.png", "logo.png"),
        ("logo-icon.png", "logo-icon.png"),
        ("logo.jpg", "logo.png"),
        ("logo-icon.jpg", "logo-icon.png")
    ]
    
    for in_name, out_name in files_to_process:
        in_path = os.path.join(public_dir, in_name)
        out_path = os.path.join(public_dir, out_name)
        if os.path.exists(in_path):
            remove_white_background(in_path, out_path, tolerance=30)
