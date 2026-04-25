import os
import sys

def patch_adk():
    try:
        import google.adk.models.google_llm as adk_llm
        file_path = adk_llm.__file__
        print(f"Patching {file_path}...")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = content.replace("return 'v1alpha'", "return 'v1beta'")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print("Successfully patched google-adk to v1beta!")
    except Exception as e:
        print(f"Failed to patch google-adk: {e}")

if __name__ == "__main__":
    patch_adk()
