DROP TABLE IF EXISTS url;
DROP TABLE IF EXISTS request;

CREATE TABLE url (
  id serial PRIMARY KEY,
  random_url_string text,
  ts timestamp DEFAULT NOW()
  /*username text REFERENCES user(username) ON DELETE CASCADE*/
);

CREATE TABLE request (
  id serial PRIMARY KEY,
  no_sql_id text,
  url_id integer REFERENCES url(id) ON DELETE CASCADE,
  method text,
  path text,
  host text, 
  ts timestamp DEFAULT NOW()
);