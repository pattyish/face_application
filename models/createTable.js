import pool from "../db/dbConnection";

const tablesCreated = pool.query(
  ` 
    DROP TABLE IF EXISTS users;
        CREATE TABLE users(
        user_id BIGSERIAL PRIMARY KEY,
        firstName VARCHAR(50) NOT null,
        lastName VARCHAR(50) NOT null,
        email VARCHAR(150) NOT null,
        imageId INT
    );
    `
);
export { tablesCreated as default };
