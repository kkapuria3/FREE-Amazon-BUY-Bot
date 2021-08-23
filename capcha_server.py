import logging
import time
from flask import Flask
from amazoncaptcha import AmazonCaptcha

''' 
------------------------------------------------------------------------
                LOGGING - Initite logging for the Bot
------------------------------------------------------------------------
'''
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(name)s] [%(levelname)s] [%(message)s]')
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
    return "Amazon-RefreshNoBot v2.0 | Amazon Captcha Sever is running !"
                   
