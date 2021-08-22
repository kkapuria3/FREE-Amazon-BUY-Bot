from flask import Flask

from amazoncaptcha import AmazonCaptcha

app = Flask(__name__)

@app.route("/url/<token>/<link_jpg>" , methods = [ 'POST'])
def link( token, link_jpg):
    print (link_jpg)
    print (token)
    link_url = 'https://images-na.ssl-images-amazon.com/captcha/',token ,'/' , link_jpg
    link_url = ''.join(link_url)
    full_jpg = link_url , link_jpg
    full_jpg = ''.join(full_jpg)
    captcha = AmazonCaptcha.fromlink(full_jpg)
    solution = captcha.solve()
    print(solution) 
    return solution

@app.route("/" , methods = [ 'GET'])
def ready():

    print("Server is ready !")
    return "Amazon-RefreshNoBot v2.0 | Amazon Captcha Sever is running !"
                   
