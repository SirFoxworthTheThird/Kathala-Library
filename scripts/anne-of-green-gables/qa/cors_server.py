from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
class H(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin','*')
        super().end_headers()
ThreadingHTTPServer(('127.0.0.1',8765),H).serve_forever()
