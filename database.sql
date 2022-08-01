CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE nft_generator;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name, user_email, user_password) VALUES ('Takis', 'takis@gmail.com', 'takis');

CREATE TABLE users_projects(
    project_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    id uuid NOT NULL,
    project_title TEXT NOT NULL,
    date_created DATE NOT NULL
);

CREATE TABLE assets(
    asset_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id uuid NOT NULL,
    asset_type TEXT NOT NULL,
    image_name TEXT NOT NULL,
    image_file TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL
);

INSERT INTO users_projects (id, project_title, date_created) VALUES ('7bf256c8-02ea-4f0d-8381-4558351cf8f2','testing title', '2022/03/11');

-- psql -U postgres 
-- \c nft_generator
-- \dt 