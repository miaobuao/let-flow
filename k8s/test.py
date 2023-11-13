import redis

r = redis.StrictRedis(host='localhost')
r.set("hh", 1212)
