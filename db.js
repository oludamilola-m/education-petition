const spicedPg = require("spiced-pg");
require("dotenv").config();

let dbUrl;

if (process.env.NODE_ENV == "test") {
    dbUrl = process.env.TEST_DB_URL;
} else {
    dbUrl = process.env.DB_URL;
}
const db = spicedPg(process.env.DATABASE_URL || dbUrl);

module.exports.addSignatory = (signature, user, signedAt) => {
    return db.query(
        `INSERT INTO signatories (signature, user_id, signed_at ) 
    VALUES ($1,$2,$3)
        RETURNING * `,
        [signature, user.id, signedAt]
    );
};

module.exports.getSignatory = (id) => {
    return db.query(`SELECT * FROM signatories WHERE id = $1`, [id]);
};

module.exports.getSignature = (user_id) => {
    return db.query(`SELECT signature FROM signatories WHERE user_id = $1`, [
        user_id,
    ]);
};

module.exports.getAllSignature = () => {
    return db.query(`SELECT * FROM signatories`);
};

module.exports.getTotalSigners = () => {
    return db.query(`SELECT COUNT(*) FROM signatories`);
};

module.exports.createUser = (firstName, lastName, email, password) => {
    return db.query(
        `INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [firstName, lastName, email, password]
    );
};

module.exports.findUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

// profile
module.exports.createProfile = (age, city, url, user) => {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
    VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [age || null, city || null, url || null, user.id]
    );
};

module.exports.getSigners = () => {
    return db.query(
        `SELECT signatories.id, signatories.user_id, first_name, last_name, city, age FROM signatories
    JOIN users
    ON users.id = signatories.user_id
    LEFT JOIN user_profiles
    ON user_profiles.user_id  =  signatories.user_id 
`
    );
};

module.exports.findSignersByCity = (city) => {
    return db.query(
        `SELECT * FROM signatories
        JOIN user_profiles
        ON signatories.user_id = user_profiles.user_id
        JOIN users
        ON signatories.user_id = users.id
        WHERE LOWER(user_profiles.city) = LOWER($1)`,
        [city]
    );
};

module.exports.getUserProfile = (id) => {
    return db.query(
        `SELECT *  FROM users
            LEFT JOIN user_profiles
            ON users.id = user_profiles.user_id
            WHERE users.id = $1`,
        [id]
    );
};

module.exports.updateUser = (firstName, lastName, email, id) => {
    return db.query(
        `UPDATE users
        SET first_name = $1, last_name = $2, email = $3
        WHERE id = $4
        RETURNING *`,
        [firstName, lastName, email, id]
    );
};

module.exports.updateUserWithPassword = (
    firstName,
    lastName,
    email,
    password,
    id
) => {
    return db.query(
        `update users 
        SET first_name = $1, last_name = $2, email = $3, password = $4
        WHERE id = $5
        RETURNING *`,
        [firstName, lastName, email, password, id]
    );
};

module.exports.updateProfile = (age, city, url, user_id) => {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $1, city = $2, url = $3
        RETURNING *`,
        [age, city, url, user_id]
    );
};

module.exports.deleteSignature = (userId) => {
    return db.query(`DELETE FROM signatories WHERE user_id = $1`, [userId]);
};

module.exports.deleteUser = (userId) => {
    return db.query(`DELETE FROM users WHERE id= $1`, [userId]);
};
