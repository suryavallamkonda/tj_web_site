import sqlite3 as sql
from flask import Flask, render_template

app = Flask(__name__)

def get_db_connection():
    conn = sql.connect('database.db')
    conn.row_factory = sql.Row
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters').fetchall()
    conn.close()
    names = [c['c_name'] for c in data]
    return render_template('characters.html', characters=names)

@app.route('/<name>')
def hero(name):
    conn = get_db_connection()
    data = conn.execute('SELECT * FROM characters WHERE c_name=?', (name,)).fetchall()[0]
    conn.close()
    k = data.keys()
    stats = {k[i][2:]: data[i] for i in range(1, len(data))}
    return render_template('hero.html', stats=stats)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)