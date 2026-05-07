import requests
import sys

def upload_file(file_path):
    try:
        with open(file_path, 'rb') as f:
            response = requests.post('https://file.io', files={'file': f})
            if response.status_code == 200:
                print(response.json()['link'])
            else:
                print(f"Error: {response.status_code}")
                print(response.text)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        upload_file(sys.argv[1])
    else:
        print("Usage: python upload.py <file_path>")
