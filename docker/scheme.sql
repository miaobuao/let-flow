create schema IF NOT EXISTS dev;
create sequence IF NOT EXISTS dev.global_id_sequence;

CREATE OR REPLACE FUNCTION dev.id_generator(OUT result bigint) AS $$
DECLARE
    our_epoch bigint := 1314220021721;
    seq_id bigint;
    now_millis bigint;
    -- the id of this DB shard, must be set for each
    -- schema shard you have - you could pass this as a parameter too
    shard_id int := 1;
BEGIN
    SELECT nextval('dev.global_id_sequence') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
END;
$$ LANGUAGE PLPGSQL;


drop table if EXISTS dev.users;

create table dev.users(
  id bigint primary key default dev.id_generator(),
  email varchar(255) not null unique,
  first varchar(50),
  last varchar(50)
);

INSERT INTO dev.users ( email, first, last)
VALUES (
  'exmaple@outlook.com',
  'firstName',
  'lastName'
);
