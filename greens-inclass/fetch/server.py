from flask import Flask, render_template, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route("/kitchen")
def kitchen_ops():
    kitchen  = {
	  "eggs": '100 eggs',
	  "onions": '1',
	  "garlic": 1,
      "ginger": 1
	}
    return jsonify(kitchen)

app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)