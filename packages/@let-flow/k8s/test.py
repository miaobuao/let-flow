#!/usr/bin/env python
from pymongo import MongoClient
import psycopg2
import redis
import json
import meo
import os

config = meo.load_json(os.path.join(
    meo.utils.script_path(__file__), "config.json"))

r = redis.StrictRedis(**config['redis'])
r.set("test", 1212, ex=10)
print("✨ Redis is ready ✨")

conn = psycopg2.connect(
    **config['postgresql']
)
conn.close()
print("✨ Postgres is ready ✨")

client = MongoClient(**config['mongodb'], serverSelectionTimeoutMS=2000)
db_version = client.server_info()
print("✨ MongoDB is ready ✨")
