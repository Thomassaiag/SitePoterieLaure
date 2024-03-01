CREATE DATABASE siteWebLaure;

CREATE TABLE collection (
    collection_uid SERIAL,
    collection_name VARCHAR(50),
    PRIMARY KEY (collection_uid)
);

CREATE TABLE collection_element_informationTechnique (
    collection_element_information_uid SERIAL NOT NULL,
    collection_uid int,
    collection_element_information_text VARCHAR(255) NOT NULL,
    PRIMARY KEY (collection_element_information_uid),
    CONSTRAINT fk_collection
        FOREIGN KEY (collection_uid)
            REFERENCES collection(collection_uid)
            ON DELETE SET NULL
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


INSERT INTO collection (collection_title, collection_description, collection_picture_url, collection_picture_alt)
VALUES
('Terremoto', 'Description Terremoto', '/images/Collections/terremoto.jpg', 'Image terremoto'),
('Lucie', 'Description Lucie', '/images/Collections/lucie.jpg', 'Image Lucie'),
('Terracota', 'Description Terracota', '/images/Collections/terracota.jpg', 'Image terracota'),
('Porcelaine', 'Description Porcelaine', '/images/Collections/orcelaine.jpg', 'Image Porcelaine'),
('Collection 4', 'Description Collection 4', '/images/Collections/Collection4.jpg', 'Image Collection 4');

