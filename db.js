const spicedPg = require("spiced-pg");
require("dotenv").config();

let dbUrl;

if (process.env.NODE_ENV == "test") {
    dbUrl = process.env.TEST_DB_URL;
} else {
    dbUrl = process.env.DB_URL;
}
const db = process.env.DATABASE_URL || spicedPg(dbUrl);

module.exports.addSignatory = (signature, user, signedAt) => {
    return db.query(
        `INSERT INTO signatories (signature, first_name, last_name, user_id, signed_at ) 
    VALUES ($1,$2,$3,$4,$5)
        RETURNING * `,
        [signature, user.first_name, user.last_name, user.id, signedAt]
    );
};

module.exports.getSignatory = (id) => {
    return db.query(`SELECT * FROM signatories WHERE id = $1`, [id]);
};

module.exports.getSignature = (user_id) => {
    // console.log("the user id", user_id);
    return db.query(`SELECT signature FROM signatories WHERE user_id = $1`, [
        user_id,
    ]);
};

module.exports.getAllSignature = () => {
    return db.query(`SELECT first_name,last_name FROM signatories`);
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
        `SELECT * FROM signatories
    JOIN users
    ON users.id = signatories.user_id
    JOIN user_profiles
    ON user_profiles.user_id  =  users.id 
`
    );
};

module.exports.findSignersByCity = (city) => {
    return db.query(
        `SELECT * FROM signatories
        JOIN user_profiles
        ON signatories.user_id = user_profiles.user_id 
        WHERE LOWER(user_profiles.city) = LOWER($1)`,
        [city]
    );
};

module.exports.getUserProfile = () => {
    return db.query(
        `SELECT user_id,first_name, last_name, email, age, city, url  FROM users
            JOIN user_profiles
            ON users.id = user_profiles.user_id;`
    );
};

// module.exports.updateUserProfile = (firstName, lastName, age, city) => {
//     return db.query(
//         `INSERT INTO users (first_name, last_name, email)
//         VALUES (firstName, lastName, age, city)
//         ON CONFLICT (name)
//         DO UPDATE SET age = 43, oscars = 1;`
//     );
// };

// module.exports.deleteSignature = () => {
//     return db.query(`DELETE signature FROM signatories`);
// };
