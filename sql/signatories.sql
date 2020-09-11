DROP TABLE IF EXISTS signatories;

CREATE TABLE signatories(
    id SERIAL primary key,
    signature TEXT NOT NULL CHECK (signature != ''),
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id)  ON DELETE CASCADE,
    signed_at timestamp
);
