DROP TABLE IF EXISTS signatories;

CREATE TABLE signatories(
    id SERIAL primary key,
    first_name VARCHAR(255) NOT NULL CHECK (first_name != ''),
    last_name VARCHAR(255) NOT NULL CHECK (last_name != ''),
    signature TEXT NOT NULL CHECK (signature != ''),
    signed_at timestamp
)
