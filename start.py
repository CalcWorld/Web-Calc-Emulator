# Use to create local host
import http.server
import socketserver
import webbrowser

IP = '127.0.0.1'
PORT = 10848

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({".js": "application/javascript",})

httpd = socketserver.TCPServer((IP, PORT), Handler)
webbrowser.open(f'http://{IP}:{PORT}')
httpd.serve_forever()
