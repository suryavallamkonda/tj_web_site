import sqlite3 as sql

connection = sql.connect('database.db')

with open('reset_db.sql') as f:
    connection.executescript(f.read())