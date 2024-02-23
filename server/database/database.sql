CREATE DATABASE siteWebLaure;

CREATE TABLE collection (
    collection_uid SERIAL,
    collection_name VARCHAR(50),
    PRIMARY KEY (collection_uid)
);

CREATE TABLE collection_element (
    collection_element_uid SERIAL NOT NULL,
    collection_uid int,
    collection_element_name VARCHAR(50) NOT NULL,
    collection_element_picture_url VARCHAR(50) NOT NULL,
    collection_element_picture_alt VARCHAR(50) NOT NULL,
    collection_element_description VARCHAR(255) NOT NULL,
    collection_element_information VARCHAR(255) NOT NULL,
    PRIMARY KEY (collection_element_uid),
    CONSTRAINT fk_collection
        FOREIGN KEY (collection_uid)
            REFERENCES collection(collection_uid)
            ON DELETE SET NULL
);


INSERT INTO collection_element (collection_uid, collection_element_name, collection_element_picture_url, collection_element_picture_alt, collection_element_description, collection_element_information)
VALUES
(1,
'Terracotta',
'/images/Collection terracotta/terracotta1.jpg',
'Image collection Terracota',
'Terracotta signifie littéralement “terre cuite” en italien, mais ce terme est aussi utilisée pour désigner une palette de couleur chaude qui varie du orange à la brique. 

Cette collection est la première a avoir été créée. Elle a été pensée autour de la faïence couleur terracotta orangée. C''est ensuite rajoutée une variation plus rouge, et de la chamotte. La chamotte est de la terre cuite réduite en grain, ajouté à la terre. Elle permet d''ajouter de la texture.
Chaque objet est donc décliné en 4 variations : orange lisse, orange chamotté, rouge lisse et  rouge chamotté. 

Cette collection allie à la fois la rusticité de la terre cuite non émaillée et la modernité des formes. Elle a été pensée pensée pour être à la fois intemporelle et accompagner tout intérieurs aussi bien lumineux que portés sur des couleurs intenses comme le noir.

La faïence restant poreuse après cuisson chaque vase est émaillé à l''intérieur par un émail transparent pour garantir l''étanchéité de la terre.

Afin de limiter les coûts énergétique est environnemental cette collection est cuite en monocuisson (une seule cuisson au lieu de deux). 
',
'Faïence terracotta lisse
Faïence terracotta chamottée
Faïence rouge 
Faïence rouge chamottée


Email transparent


Monocuisson 1050°C


Il est recommandé de ne pas passer au lave vaisselle.'
);


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


ALTER TABLE collection_element
ALTER COLUMN  collection_element_information TYPE varchar(2000);

collection_element_description, collection_element_information)


UPDATE collection_element
SET collection_element_picture_url = '/images/Collection terracotta/terracotta1.jpg';
