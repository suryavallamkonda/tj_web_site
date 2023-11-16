import sqlite3 as sql

connection = sql.connect('database.db')
cur = connection.cursor()

data1 = cur.execute("SELECT * FROM characters").fetchall()
data2 = cur.execute("SELECT c_name from characters").fetchall()
data3 = cur.execute("SELECT c_name from characters WHERE c_attack > 2").fetchall()
connection.close()

print(data1)
print(data2)
print(data3)