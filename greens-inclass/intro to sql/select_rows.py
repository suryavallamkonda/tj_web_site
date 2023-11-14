import sqlite3 as sql

connection = sql.connect('database.db')

connection.row_factory = sql.Row

data = connection.execute("SELECT * FROM characters").fetchall()
connection.close()

# print(data)
k = data[0].keys()
for d in data:
    print({k[i]:d[i] for i in range(len(d))})