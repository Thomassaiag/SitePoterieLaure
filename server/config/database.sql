CREATE DATABASE siteWebLaure;

CREATE TABLE collection (
    collection_uid SERIAL,
    ollection_uid INTEGER NOT NULL,
    collection_title VARCHAR(50),
    collection_description VARCHAR(50),
    collection_picture_url VARCHAR(50),
    collection_picture_alt VARCHAR(50),
    collection_deletionflag BOOLEAN,
    collection_email VARCHAR(50),
    collection_recommandation VARCHAR(50),
    collection_cooking VARCHAR(50),
    PRIMARY KEY (collection_uid)
);


CREATE TABLE collection_element_pictures (
    collection_element_picture_uid SERIAL PRIMARY KEY,
    collection_uid INTEGER NOT NULL,
    collection_element_picture_url VARCHAR(50) NOT NULL,
    collection_element_picture_alt VARCHAR(50) NOT NULL,
    ollection_element_picture_alt BOOLEAN NOT NULL,
    PRIMARY KEY (collection_element_picture_uid)
    CONSTRAINT fk_collection FOREIGN KEY (collection_uid) REFERENCES collections(collection_uid) ON DELETE CASCADE
);

CREATE TABLE collection_element_informations (
    collection_element_informations_uid SERIAL PRIMARY KEY,
    collection_uid INTEGER NOT NULL,
    collection_element_informations_text VARCHAR(50) NOT NULL,
    PRIMARY KEY (collection_element_informations_uid)
    CONSTRAINT fk_collection FOREIGN KEY (collection_uid) REFERENCES collections(collection_uid) ON DELETE CASCADE
);


CREATE TABLE user_account (
    user_uid SERIAL NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(50) NOT NULL,
    collection_element_information_text VARCHAR(2000) NOT NULL,
    PRIMARY KEY (user_uid)
);


CREATE TABLE newsletter_contact (
    contactuid SERIAL NOT NULL,
    contact_firstname VARCHAR(50) NOT NULL,
    contact_lastname VARCHAR(50) NOT NULL,
    PRIMARY KEY (contactuid)
);

CREATE TABLE portrait (
    portrait_uid SERIAL NOT NULL,
    portrait_picture_url VARCHAR(50) NOT NULL,
    portrait_picture_alt VARCHAR(50) NOT NULL,
    PRIMARY KEY (portrait_uid)
);



INSERT INTO collection_element_informationTechnique (collection_uid, collection_element_information_text)
VALUES
(1,'Faïence terracotta lisse'),
(1,'Faïence terracotta chamottée'),
(1,'Faïence rouge'),
(1,'Faïence rouge chamottée');

ALTER TABLE collection
ADD collection_picture_alt VARCHAR(255);


INSERT INTO collection(description)
VALUES
('Description Terremoto'),
('Description Lucie'),
('Description Terracota'),
('Description Porcelaine'),
('Description Collection 4');

UPDATE collection_element
SET collection_element_description = CASE
                    WHEN collection_element_uid = 1 THEN 'collection_element_uid'
                 END
WHERE collection_title IN ('Terremoto', 'Lucie', 'Terracota', 'Porcelaine', 'Collection 4');


ALTER TABLE collection_element_pictures
RENAME COLUMN collection_element_pictures_UID TO collection_element_picture_UID;

collection_element_description, collection_element_information)


UPDATE collection_element_
SET collection_element_picture_url = '/images/Collection terracotta/terracotta1.jpg';


INSERT INTO user_account (user_email, user_password)
VALUES
('test@test.com', '1234')



INSERT INTO newsletter_contact email
VALUES(
    
)

CREATE TABLE newsletter_contact(
    contactuid SERIAL PRIMARY KEY,
    email VARCHAR(255)
);



ALTER TABLE user_account
ADD COLUMN user_firstName VARCHAR (255),
ADD COLUMN user_lastName VARCHAR (255);