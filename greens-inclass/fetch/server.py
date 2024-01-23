from flask import Flask, render_template, jsonify
import sqlite3 as sql
app = Flask(__name__)

def get_db_connection():
    conn = sql.connect('database.db')
    conn.row_factory = sql.Row
    return conn


@app.route('/')
def hello_world():
    return render_template('hello.html')

@app.route('/votes')
def votes():
    return render_template('votes.html')

@app.route("/kitchen")
def kitchen_ops():
    kitchen  = {
	  "eggs": '100 eggs',
	  "onions": '1',
	  "garlic": 1,
      "ginger": 1
	}
    return jsonify(kitchen)


@app.route("/upvote")
def upvote():
    conn = get_db_connection()
    data = conn.execute("SELECT upvotes FROM votes").fetchall()
    print(data)
    conn.close()
    return jsonify(data)
    

@app.route("/downvote")
def downvote():
    conn = get_db_connection()
    data = conn.execute("SELECT downvotes FROM votes").fetchall()
    conn.close()
    return jsonify(data)


app.debug = True
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)