from flask import Flask, render_template, request
import requests # third party - not flask
import json

app = Flask(__name__)

@app.route('/ion_api')
def ion_requests():

    remote_url = "https://ion.tjhsst.edu/api/schedule?format=json"
    r = requests.get(remote_url)    
    print(r.text)
    
    j = json.loads(r.text)
    print(j['results'][0]['date'])

    return render_template('ion_api.html', schedule=j)


@app.route('/tj_weather')
def tjweather_requests():
    urls = ["https://api.weather.gov/points/38.8186,-77.1689", 
            "https://api.weather.gov/points/43.0346,-87.9272"]
    
    temps = []

    for url in urls:
        req = requests.get(url)
        url_json = json.loads(req.text)

        forecast_url = url_json['properties']['forecast']
        temp_request = requests.get(forecast_url)
        temp_json = json.loads(temp_request.text)
        temp = temp_json['properties']['periods'][0]['temperature']
        temps.append(temp)

    return render_template('tj_weather.html', temps=temps)


@app.route('/boss_level')
def boss_level():
    form_lat = request.args.get('latitude')
    form_long = request.args.get('longitude')

    url = f"https://api.weather.gov/points/{form_lat},{form_long}"
    req = requests.get(url)
    url_json = json.loads(req.text)
    
    if 'title' in url_json.keys():
        temp = 'not available'
    else:
        forecast_url = url_json['properties']['forecast']
        temp_request = requests.get(forecast_url)
        temp_json = json.loads(temp_request.text)
        temp = temp_json['properties']['periods'][0]['temperature']
    
    return render_template('boss_level.html', lat=form_lat, long=form_long, temp=temp)





app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)