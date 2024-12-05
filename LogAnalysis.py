import re
from datetime import datetime

# Read the log file
with open("log.txt", "r") as file:
    lines = file.readlines()

# Define a pattern to extract fields
pattern = r"^(.*?) - (.*?) - \"(.*?)\" (.*?) -"

# Parse and format the log lines
formatted_lines = []
header = ["Timestamp", "IP Address", "Request", "Status Code"]
formatted_lines.append(f"{header[0]:<25} {header[1]:<15} {header[2]:<150} {header[3]:<10}")

for line in lines:
    match = re.match(pattern, line.strip())
    if match:
        timestamp, ip_address, request, status_code = match.groups()
        formatted_lines.append(
            f"{timestamp:<25} {ip_address:<15} {request:<150} {status_code:<10}"
        )

# Write the formatted log to a new file
with open("formatted_log.txt", "w") as file:
    file.write("\n".join(formatted_lines))

with open("formatted_log.txt", "r") as file:
    contents=file.read()

# print(contents)

def networkAddress(log_file="formatted_log.txt", output_file="network_address.txt"):
    filtered_entries = []
    
    x=input("Enter the first octet of your company Network Address: \n")
    
    # Open and read the formatted log file
    with open(log_file, "r") as file:
        lines = file.readlines()
     
    # Skip the header and iterate over each line
    for line in lines[1:]:  # Skip header
        # Split the line into columns based on consistent spacing
        parts = re.split(r"\s{2,}", line.strip())
        if len(parts) > 1:
            ip_address = parts[1]  # Second column is IP Address
            if not ip_address.startswith(x):  # Filter out local IPs
                filtered_entries.append(line.strip())
    
    # Write the filtered results to a new file
    with open(output_file, "w") as file:
        file.write("Filtered Entries:\n")
        file.write("\n".join(filtered_entries))
    
    print(f"Filtered results have been written to {output_file}")
    
def filter_outside_work_hours(log_file="formatted_log.txt", output_file="outside_work_hours.txt"):
    filtered_entries=[]
    
    st=input("Enter start time (hh:mm:ss)(24-hour format): ")
    et=input("Enter end time (hh:mm:ss)(24-hour format): ")
    
    
    # Define work hours
    start_time=datetime.strptime(st,"%H:%M:%S").time()
    end_time=datetime.strptime(et,"%H:%M:%S").time()
    
    # Read the formatted log file
    with open(log_file, "r") as file:
        lines=file.readlines()
        
    # Skip the header and process each line
    for line in lines[1:]:  # Skip header
        # Split the line into columns based on consistent spacing
        parts=re.split(r"\s{2,}", line.strip())
        if len(parts)>0:
            # Extract the timestamp and convert to datetime object
            timestamp_str = parts[0] # First column is timestamp
            try:
                timestamp = datetime.strptime(timestamp_str.split(",")[0], "%Y-%m-%d %H:%M:%S")
                log_time = timestamp.time()  # Extract time
                # Check if the time is outside work hours
                if log_time < start_time or log_time > end_time:
                    filtered_entries.append(line.strip())
            except ValueError:
                # Handle lines that do not conform to the expected timestamp format
                continue
    # Write the filtered entries to a new file       
    with open(output_file,"w") as file:
        file.write("Entries outside work hours:\n")
        file.write("\n".join(filtered_entries))
        
    print(f"Filtered results have been written to {output_file}")
    return output_file

def status_code_not_200(log_file="formatted_log.txt", output_file="status_code.txt"):
    # List to store filtered entries
    filtered_entries = []
    
    # Read the formatted log file
    with open(log_file, "r") as file:
        lines=file.readlines()
        
    # Skip the header and process each line
    for line in lines[1:]:  # Skip header row
        # Split the line into columns based on consistent spacing
        parts=re.split(r"\s{2,}", line.strip())
        if len(parts) > 3: # Ensure there are enough columns for status code
            status_code=parts[-1]  # Last column is status code
            if status_code != "200":   # Check if status code is not 200
                filtered_entries.append(line.strip())
        
    # Write the filtered entries to a new file
    with open(output_file,"w") as file:
        file.write("Entries with status code not 200:\n")
        file.write("\n".join(filtered_entries))
        
    print(f"Filtered results have been written to {output_file}")
    
    
def filter_post_requests(log_file="formatted_log.txt", output_file="requests.txt"):
    # List to store filtered entries
    filtered_entries = []
    
    r=input("Enter request method to filter by (e.g., POST, GET, PUT, DELETE): ")
    
    # Read the formatted log file
    with open(log_file, "r") as file:
        lines=file.readlines()
        
    # Skip the header and process each line
    for line in lines[1:]:  # Skip header row
        # Split the line into columns based on consistent spacing
        parts=re.split(r"\s{2,}", line.strip())
        if len(parts)>2: # Ensure there are enough columns for request type
            request_method=parts[2].split()[0]  # Extract the request method (e.g., "POST" from "POST /File1.txt")
            if request_method == r.upper(): # Check if the request is a POST request
                filtered_entries.append(line.strip())
        
    # Write the filtered entries to a new file
    with open(output_file,"w") as file:
        file.write("Entries with {r} request method:\n")
        file.write("\n".join(filtered_entries))
        
    print(f"Filtered results have been written to {output_file}")
   
   
  
n=int(input(f"Enter the filter you want to select: \n1: Network Address\n2: Work Hours\n3: Status Code\n4: Request method\n"))
  
# Call the function
if n == 1:
    networkAddress()
elif n == 2:
    filter_outside_work_hours()
elif n == 3:
    status_code_not_200()
elif n == 4:
    filter_post_requests()
else:
    print("Invalid Selection!!")