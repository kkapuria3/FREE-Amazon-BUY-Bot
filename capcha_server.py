import logging
import time
from flask import Flask
from amazoncaptcha import AmazonCaptcha

''' 
------------------------------------------------------------------------
                LOGGING - Initite logging for the Bot
------------------------------------------------------------------------
'''
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(name)s] [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)


app = Flask(__name__)

@app.route("/url/<token>/<link_jpg>" , methods = [ 'POST'])
def link( token, link_jpg):
    logger.info(f"Captcha JPEG File: {link_jpg}") 
    logger.info(f"Captcha Token: {token}") 
    link_url = 'https://images-na.ssl-images-amazon.com/captcha/',token ,'/' , link_jpg
    link_url = ''.join(link_url)
    full_jpg = link_url , link_jpg
    full_jpg = ''.join(full_jpg)
    captcha = AmazonCaptcha.fromlink(full_jpg)
    solution = captcha.solve()
    logger.info(f"Solution : {solution}")  
    return solution

@app.route("/" , methods = [ 'GET'])
def ready():

    logger.info(f"Server is listening ..") 
    return "<img src='https://raw.githubusercontent.com/kkapuria3/Best-Amazon-Bot/dev-v2.0/resources/new_logo1.gif'>\n<br>\n<h2>STATUS: Amazon Captcha Sever is running !</h1><br>\n <h3>If you hear a sound when you refresh and your terminal looks like below. <br><br> <img src='https://raw.githubusercontent.com/kkapuria3/Best-Amazon-Bot/dev-v2.0/resources/python_shell1.gif'><br><br>You are all set !! You can close this tab. \n"
                   
