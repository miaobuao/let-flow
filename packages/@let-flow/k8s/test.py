#!/usr/bin/env python
import os
from pymongo import MongoClient
import psycopg2
import redis
import meo

config = meo.load_json(
    os.path.join(
        meo.utils.script_path(__file__),
        "config.json",
    )
)
service = config['service']


def pick(obj, *keys):
    return {k: obj[k] for k in keys if k in obj}


r = redis.StrictRedis(**pick(service['redis'], 'host', 'port'))
r.set("test", 1212, ex=10)
print("✨ Redis is ready ✨")

conn = psycopg2.connect(**config["postgresql"])
conn.close()
print("✨ Postgres is ready ✨")

client = MongoClient(**config["mongodb"], serverSelectionTimeoutMS=2000)
db_version = client.server_info()
print("✨ MongoDB is ready ✨")
