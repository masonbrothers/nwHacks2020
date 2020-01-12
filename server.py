from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

import paralleldots
import operator

paralleldots.set_api_key("cJNuFaRhYXRPQPsh19ohGql5hpChB4TBUSt7Y2DRjOk")

def get_emotion(text):
    emotion_list = paralleldots.emotion(text)['emotion']
    max_emotion = max(emotion_list.items(), key=operator.itemgetter(1))[0]
    print(max_emotion)
    return max_emotion

# def get_sentiment(text):
#     print(text)
#     try:
#         return text # b'getting sentement'
#     except:
#         return b'{"error": "cant get sentement"}'

class CORSRequestHandler(SimpleHTTPRequestHandler):

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
                response = get_emotion(text_str)
                self.wfile.write(str.encode(response))
            else:
                self.wfile.write(b'{"error": "text param must be exacly 1 element not an array"}')
        else:
            self.wfile.write(b'{"error": "is text param not specified in get request"}')
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)


httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)
httpd.serve_forever()