DROP TABLE IF EXISTS signatories;

CREATE TABLE signatories(
    id SERIAL primary key,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    signature TEXT NOT NULL,
    signed_at timestamp
)