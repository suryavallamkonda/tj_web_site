import sqlite3 as sql

connection = sql.connect('database.db')

with(open('temp.sql')) as f:
    connection.executescript(f.read())