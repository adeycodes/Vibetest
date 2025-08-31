# # scanner/scan_app.py
# import os
# import sys
# import json
# import subprocess
# import re

# def scan_code(base_path):
#     results = {
#         "bugs_found": 0,
#         "security_issues": 0,
#         "performance_score": 100,
#         "issues": []
#     }

#     # Find Python/JS files
#     for root, _, files in os.walk(base_path):
#         for file in files:
#             filepath = os.path.join(root, file)
#             try:
#                 with open(filepath, 'r', encoding='utf-8') as f:
#                     content = f.read()

#                 # Look for common issues
#                 if file.endswith('.py'):
#                     if "eval(" in content:
#                         results["issues"].append(f"Unsafe eval() in {file}")
#                         results["security_issues"] += 1
#                     if "print(" in content and "debug" in content.lower():
#                         results["issues"].append(f"Debug print in {file}")
#                         results["bugs_found"] += 1

#                 elif file.endswith('.js') or file.endswith('.jsx'):
#                     if "innerHTML" in content:
#                         results["issues"].append(f"Potential XSS in {file}")
#                         results["security_issues"] += 1

#                 # Check for large files (performance)
#                 if os.path.getsize(filepath) > 500_000:
#                     results["issues"].append(f"Large file: {file}")
#                     results["performance_score"] -= 10

#             except Exception as e:
#                 results["issues"].append(f"Error reading {file}: {str(e)}")

#     results["performance_score"] = max(30, results["performance_score"])
#     return results

# if __name__ == "__main__":
#     if len(sys.argv) != 2:
#         print(json.dumps({"error": "Usage: python scan_app.py <path>"}))
#         sys.exit(1)

#     path = sys.argv[1]
#     result = scan_code(path)
#     print(json.dumps(result, indent=2))




# scanner/scan_app.py
import os
import sys
import json
import re

def scan_code(base_path):
    results = {
        "bugs_found": 0,
        "security_issues": 0,
        "performance_score": 100,
        "issues": []
    }

    # Patterns to detect problematic content
    error_patterns = [
        r"error",       # "Error occurred"
        r"exception",   # "ValueError", "Exception"
        r"failed",      # "Login failed"
        r"traceback",   # Python stack trace
        r"fatal",       # "Fatal error"
        r"segmentation fault",  # Crash-level issues
        r"undefined",   # JS: variable undefined
        r"not found",   # File not found
        r"permission denied"
    ]

    MAX_FILE_SIZE = 500_000  # 500KB

    for root, _, files in os.walk(base_path):
        for file in files:
            filepath = os.path.join(root, file)
            rel_path = os.path.relpath(filepath, base_path)

            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()

                # === 1. Check for dangerous code patterns ===
                if file.endswith('.py'):
                    if "eval(" in content:
                        issue_msg = f"Unsafe eval() in {rel_path}"
                        results["issues"].append(issue_msg)
                        results["security_issues"] += 1

                    if "print(" in content and "debug" in content.lower():
                        issue_msg = f"Debug print in {rel_path}"
                        results["issues"].append(issue_msg)
                        results["bugs_found"] += 1

                elif file.endswith(('.js', '.jsx')):
                    if "innerHTML" in content:
                        issue_msg = f"Potential XSS (innerHTML) in {rel_path}"
                        results["issues"].append(issue_msg)
                        results["security_issues"] += 1

                # === 2. Check for error-like messages in content ===
                lines = content.splitlines()
                for i, line in enumerate(lines):
                    for pattern in error_patterns:
                        if re.search(pattern, line, re.IGNORECASE):
                            context = line.strip()
                            issue_msg = f"Possible error on line {i+1} in {rel_path}: {context}"
                            results["issues"].append(issue_msg)
                            results["bugs_found"] += 1
                            break  # Avoid duplicate issues for same line

                # === 3. Performance: Large file check ===
                file_size = os.path.getsize(filepath)
                if file_size > MAX_FILE_SIZE:
                    issue_msg = f"Large file: {rel_path} ({file_size} bytes)"
                    results["issues"].append(issue_msg)
                    results["performance_score"] -= 10

            except Exception as e:
                issue_msg = f"Error reading {rel_path}: {str(e)}"
                results["issues"].append(issue_msg)

    # === 4. Final performance score clamp ===
    results["performance_score"] = max(30, results["performance_score"])

    # === 5. Calculate overall health ===
    total_issues = len(results["issues"])
    if total_issues == 0:
        results["code_health"] = "good"
    else:
        results["code_health"] = "not good"

    # Optional: Add summary
    results["summary"] = {
        "total_issues_found": total_issues,
        "verdict": results["code_health"]
    }

    return results


# === Main Execution ===
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Usage: python scan_app.py <path>"}))
        sys.exit(1)

    path = sys.argv[1]

    if not os.path.exists(path):
        print(json.dumps({"error": "Path does not exist"}))
        sys.exit(1)

    result = scan_code(path)
    print(json.dumps(result, indent=2))