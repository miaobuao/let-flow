#!/usr/bin/env python
import psycopg2
import redis

r = redis.StrictRedis(host='localhost')
r.set("test", 1212, ex=10)
print("✨ Redis is ready ✨")

conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="postgres",
)
conn.close()
print("✨ Postgres is ready ✨")
