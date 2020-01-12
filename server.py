from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

def get_emotion(text):
    
    authenticator = IAMAuthenticator('YhhKS3QwimiLpt-d1WGsXQh2l0OaOiPGe15JXdPhvvTl')
    tone_analyzer = ToneAnalyzerV3(
        version='2017-09-21',
        authenticator=authenticator
    )   
    tone_analyzer.set_service_url('https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/ca94d54e-1098-4957-b878-56061dc67816')
    tone_analysis = tone_analyzer.tone(
        {'text': text},
        content_type='application/json'
    ).get_result()
    if len(tone_analysis['document_tone']['tones']) == 0: 
        tones = ""
    else:
        tones = tone_analysis['document_tone']['tones'][0]['tone_name']
    #print(tones)
    return tones

class CORSRequestHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        # try:
        #print(urlparse(self.path))
        query = urlparse(self.path).query
        text_decoded = parse_qs(query)
        # self.wfile.write(get_sentiment(text_decoded))
        if 'text' in text_decoded:
            text_array = text_decoded['text']
            #print(text_array)
            if len(text_array) == 1:
                text_str = text_array[0]
                response = get_emotion(text_str)
                self.wfile.write(str.encode(response))
            else:
                self.wfile.write(b'{"error": "text param must be exacly 1 element not an array"}')
        else:
            self.wfile.write(b'{"error": "is text param not specified in get request"}')
    def end_headers (self):
        self.send_header('Access-Control-Allow-Origin', 'https://www.messenger.com')
        SimpleHTTPRequestHandler.end_headers(self)


httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)
httpd.serve_forever()