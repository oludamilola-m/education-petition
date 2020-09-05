const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

module.exports.addSignatory = (firstName, lastName, signature, signedAt) => {
    return db.query(
        `INSERT INTO signatories (first_name,last_name,signature, signed_at ) 
    VALUES ($1,$2,$3, $4)
        RETURNING * `,
        [firstName, lastName, signature, signedAt]
    );
};

module.exports.getSignatory = (id) => {
    return db.query(`SELECT * FROM signatories WHERE id = $1`, [id]);
};

module.exports.getSignature = (id) => {
    return db.query(`SELECT signature FROM signatories WHERE id = $1`, [id]);
};

module.exports.getAllSignature = () => {
    return db.query(`SELECT first_name,last_name FROM signatories`);
};

module.exports.getNumbersOfRows = () => {
    return db.query(`SELECT COUNT(*) FROM signatories`);
};
