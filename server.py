from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

def get_sentiment(text):
    print(text)
    try:
        return text # b'getting sentement'
    except:
        return b'{"error": "cant get sentement"}'

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        # try:
        print(urlparse(self.path))
        query = urlparse(self.path).query
        text_decoded = parse_qs(query)
        # self.wfile.write(get_sentiment(text_decoded))
        if 'text' in text_decoded:
            text_array = text_decoded['text']
            print(text_array)
            if len(text_array) == 1:
                text_str = text_array[0]
                response = get_sentiment(text_str)
                self.wfile.write(str.encode(response))
            else:
                self.wfile.write(b'{"error": "text param must be exacly 1 element not an array"}')
        else:
            self.wfile.write(b'{"error": "is text param not specified in get request"}')


httpd = HTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
httpd.serve_forever()
