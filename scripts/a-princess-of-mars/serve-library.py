from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

class CorsHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

ThreadingHTTPServer(("127.0.0.1", 4174), CorsHandler).serve_forever()
