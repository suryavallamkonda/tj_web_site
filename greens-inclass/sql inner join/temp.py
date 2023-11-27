import sqlite3 as sql

connection = sql.connect('nfl.db')

with open('one.sql') as f:
    connection.executescript(f.read())