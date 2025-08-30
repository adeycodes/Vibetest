# scanner/scan_app.py
import os
import sys
import json
import subprocess
import re

def scan_code(base_path):
    results = {
        "bugs_found": 0,
        "security_issues": 0,
        "performance_score": 100,
        "issues": []
    }

    # Find Python/JS files
    for root, _, files in os.walk(base_path):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Look for common issues
                if file.endswith('.py'):
                    if "eval(" in content:
                        results["issues"].append(f"Unsafe eval() in {file}")
                        results["security_issues"] += 1
                    if "print(" in content and "debug" in content.lower():
                        results["issues"].append(f"Debug print in {file}")
                        results["bugs_found"] += 1

                elif file.endswith('.js') or file.endswith('.jsx'):
                    if "innerHTML" in content:
                        results["issues"].append(f"Potential XSS in {file}")
                        results["security_issues"] += 1

                # Check for large files (performance)
                if os.path.getsize(filepath) > 500_000:
                    results["issues"].append(f"Large file: {file}")
                    results["performance_score"] -= 10

            except Exception as e:
                results["issues"].append(f"Error reading {file}: {str(e)}")

    results["performance_score"] = max(30, results["performance_score"])
    return results

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python scan_app.py <path>"}))
        sys.exit(1)

    path = sys.argv[1]
    result = scan_code(path)
    print(json.dumps(result, indent=2))