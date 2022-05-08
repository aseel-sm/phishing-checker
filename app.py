




# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

import pickle
import requests
from bs4 import BeautifulSoup
# Define a flask app
app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict',methods=['GET','POST'])
def predict():
    if request.method == "POST":
        url = request.get_json()
        print(url)
        data=[url]
        loaded_model = pickle.load(open('phishing.pkl', 'rb'))
        op = loaded_model.predict(data)
        print(op[0])
        result={}
        result['op']=op[0]
        if(op[0]=="bad"):
            links_with_text = []
            # req = requests.get(url)       
            # soup = BeautifulSoup(req.text,"html.parser")
            # for line in soup.find_all('a'):
            #     href = line.get('href')
            #     print(href)
            #     links_with_text.append(href)
           
            result['links']=links_with_text
            
        return result
    return None



if __name__ == '__main__':
   app.run()