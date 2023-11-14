import sqlite3 as sql

connection = sql.connect('database.db')

with(open('bulk_insert.sql')) as f:
    connection.executescript(f.read())