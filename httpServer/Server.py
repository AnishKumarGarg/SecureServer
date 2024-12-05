import http.server
import socketserver
import logging

# Define the port you want the server to listen on
PORT = 8000

# Set up logging to a file
logging.basicConfig(filename=r'D:\CyberSecurity\Confidential\log.txt', level=logging.INFO, 
                    format='%(asctime)s - %(message)s')

# Create a custom request handler to log requests
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Log to the terminal (default behavior)
        super().log_message(format, *args)
        if self.path=="/favicon.ico":
            return
        
        # Log the request to the log file
        logging.info(f"{self.client_address[0]} - {format % args}")

# Set up the HTTP server
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving on port {PORT}")
    # Keep the server running
    httpd.serve_forever()
    