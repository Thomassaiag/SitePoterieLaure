CREATE DATABASE siteWebLaure;

CREATE TABLE collection (
    collection_uid SERIAL,
    collection_name VARCHAR(50),
    PRIMARY KEY (collection_uid)
);

CREATE TABLE product (
    product_uid SERIAL NOT NULL,
    collection_uid int,
    product_name VARCHAR(50) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_uid),
    CONSTRAINT fk_collection
        FOREIGN KEY (collection_uid)
            REFERENCES collection(collection_uid)
            ON DELETE SET NULL
);


INSERT INTO collection (collection_name)
VALUES
('Terremoto'),
('Lucie'),
('Terracota'),
('Porcelaine'),
('Collection 4');


ALTER TABLE collection
ADD collection_picture_alt VARCHAR(255);


INSERT INTO collection(description)
VALUES
('Description Terremoto'),
('Description Lucie'),
('Description Terracota'),
('Description Porcelaine'),
('Description Collection 4');

UPDATE collection
SET collection_picture_alt = CASE
                    WHEN collection_title = 'Terremoto' THEN 'Image terremoto'
                    WHEN collection_title = 'Lucie' THEN 'Image Lucie'
                    WHEN collection_title = 'Terracota' THEN 'Image Terracota'
                    WHEN collection_title = 'Porcelaine' THEN 'Image Porcelaine'
                    WHEN collection_title = 'Collection 4' THEN 'Image Collection 4'
                    ELSE collection_picture_alt
                 END
WHERE collection_title IN ('Terremoto', 'Lucie', 'Terracota', 'Porcelaine', 'Collection 4');


ALTER TABLE collection
RENAME COLUMN collection_picture TO collection_picture_url;