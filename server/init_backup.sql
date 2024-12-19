--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: collection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collection (
    collection_uid integer NOT NULL,
    collection_title character varying(50),
    collection_description character varying(255),
    collection_picture_url character varying(255),
    collection_picture_alt character varying(255),
    collection_deletionflag boolean
);


ALTER TABLE public.collection OWNER TO postgres;

--
-- Name: collection_collection_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collection_collection_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collection_collection_uid_seq OWNER TO postgres;

--
-- Name: collection_collection_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collection_collection_uid_seq OWNED BY public.collection.collection_uid;


--
-- Name: collection_element; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collection_element (
    collection_element_uid integer NOT NULL,
    collection_uid integer,
    collection_element_title character varying(50) NOT NULL,
    collection_element_description character varying(2000),
    collection_element_email character varying(255),
    collection_element_recommandation character varying(255),
    collection_element_cooking character varying(255)
);


ALTER TABLE public.collection_element OWNER TO postgres;

--
-- Name: collection_element_collection_element_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collection_element_collection_element_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collection_element_collection_element_uid_seq OWNER TO postgres;

--
-- Name: collection_element_collection_element_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collection_element_collection_element_uid_seq OWNED BY public.collection_element.collection_element_uid;


--
-- Name: collection_element_informations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collection_element_informations (
    collection_element_information_uid integer NOT NULL,
    collection_uid integer,
    collection_element_information_text character varying(255) NOT NULL
);


ALTER TABLE public.collection_element_informations OWNER TO postgres;

--
-- Name: collection_element_informatio_collection_element_informatio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collection_element_informatio_collection_element_informatio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collection_element_informatio_collection_element_informatio_seq OWNER TO postgres;

--
-- Name: collection_element_informatio_collection_element_informatio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collection_element_informatio_collection_element_informatio_seq OWNED BY public.collection_element_informations.collection_element_information_uid;


--
-- Name: collection_element_pictures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collection_element_pictures (
    collection_element_picture_uid integer NOT NULL,
    collection_uid integer,
    collection_element_picture_url character varying(50) NOT NULL,
    collection_element_picture_alt character varying(50) NOT NULL,
    collection_element_pictures_deletionflag boolean
);


ALTER TABLE public.collection_element_pictures OWNER TO postgres;

--
-- Name: collection_element_pictures_collection_element_pictures_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collection_element_pictures_collection_element_pictures_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collection_element_pictures_collection_element_pictures_uid_seq OWNER TO postgres;

--
-- Name: collection_element_pictures_collection_element_pictures_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collection_element_pictures_collection_element_pictures_uid_seq OWNED BY public.collection_element_pictures.collection_element_picture_uid;


--
-- Name: newsletter_contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_contact (
    contactuid integer NOT NULL,
    email character varying(255)
);


ALTER TABLE public.newsletter_contact OWNER TO postgres;

--
-- Name: newsletter_contact_contactuid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newsletter_contact_contactuid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newsletter_contact_contactuid_seq OWNER TO postgres;

--
-- Name: newsletter_contact_contactuid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newsletter_contact_contactuid_seq OWNED BY public.newsletter_contact.contactuid;


--
-- Name: user_account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_account (
    user_uid integer NOT NULL,
    user_email character varying(255),
    user_password character varying(255),
    user_firstname character varying(255),
    user_lastname character varying(255),
    admin_status boolean
);


ALTER TABLE public.user_account OWNER TO postgres;

--
-- Name: user_account_user_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_account_user_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_account_user_uid_seq OWNER TO postgres;

--
-- Name: user_account_user_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_account_user_uid_seq OWNED BY public.user_account.user_uid;


--
-- Name: collection collection_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection ALTER COLUMN collection_uid SET DEFAULT nextval('public.collection_collection_uid_seq'::regclass);


--
-- Name: collection_element collection_element_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element ALTER COLUMN collection_element_uid SET DEFAULT nextval('public.collection_element_collection_element_uid_seq'::regclass);


--
-- Name: collection_element_informations collection_element_information_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_informations ALTER COLUMN collection_element_information_uid SET DEFAULT nextval('public.collection_element_informatio_collection_element_informatio_seq'::regclass);


--
-- Name: collection_element_pictures collection_element_picture_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_pictures ALTER COLUMN collection_element_picture_uid SET DEFAULT nextval('public.collection_element_pictures_collection_element_pictures_uid_seq'::regclass);


--
-- Name: newsletter_contact contactuid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_contact ALTER COLUMN contactuid SET DEFAULT nextval('public.newsletter_contact_contactuid_seq'::regclass);


--
-- Name: user_account user_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account ALTER COLUMN user_uid SET DEFAULT nextval('public.user_account_user_uid_seq'::regclass);


--
-- Data for Name: collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection (collection_uid, collection_title, collection_description, collection_picture_url, collection_picture_alt, collection_deletionflag) FROM stdin;
1	Terremoto	Description Terremoto	/images/Collections/terremoto.jpg	Image terremoto	f
2	Lucie	Description Lucie	/images/Collections/lucie.jpg	Image Lucie	f
3	Terracota	Description Terracota	/images/Collections/terracota.jpg	Image terracota	f
4	Porcelaine	Description Porcelaine	/images/Collections/porcelaine.jpg	Image Porcelaine	f
5	Collection 4	Description Collection 4	/images/Collections/collection4.jpg	Image Collection 4	f
68	collectionTest6	collectionTest6	/images/Collections/poterie4.jpeg	Image collectionTest6	t
67	collectionTest5	collectionTest5	/images/Collections/poterie4.jpeg	Image collectionTest5	t
69	collectionTest4	collectionTest4	/images/Collections/poterie3.jpeg	Image collectionTest4	f
\.


--
-- Data for Name: collection_element; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element (collection_element_uid, collection_uid, collection_element_title, collection_element_description, collection_element_email, collection_element_recommandation, collection_element_cooking) FROM stdin;
5	5	Collection 4	Description Collection 4	Email transparent	Il est recommandé de ne pas passer au lave vaisselle.	Grande Cuisson
3	2	Lucie	Lucie, c'est pas marqué dans les livres	Email Lucie Transparent	Il est recommandé de ne pas passer Lucie au Lave Vaisselle	Monocuisson Lucie 2000°C
2	1	Terremoto	Description Terremoto	Email pas Transparent	Il est recommandé de ne pas passer au lave vaisselle. (terremoto)	Monocuisson 2000°C
4	4	Porcelaine\n	Description Porcelaine	Email transparent	Il est recommandé de ne pas passer au lave vaisselle.	Moyenne Cuisson
10	69	collectionTest4	Description Test 4	email test	recommandation	cuisson
8	67	collectionTest5	Description Test 5	email	Recommandations	Cuisson
9	68	collectionTest6	Description Test 6	email 11	Recommandations 33	Cuisson 22
1	3	Terracotta	Terracotta signifie littéralement "terre cuite" en italien, mais ce terme est aussi utilisé pour désigner une palette de couleur chaude qui varie du orange à la brique.\\nCette collection est la première à avoir été créée. Elle a été pensée autour de la faïence couleur terracotta orangée. C'est ensuite rajoutée une variation plus rouge, et de la chamotte. La chamotte est de la terre cuite réduite en grain, ajouté à la terre. Elle permet d'ajouter de la texture. Chaque objet est donc déclin‚ en 4 variations : orange lisse, orange chamotté, rouge lisse et rouge chamotté.\\nCette collection allie à la fois la rusticité de la terre cuite non émaillée et la modernité des formes. Elle a été pensée pour être àla fois intemporelle et accompagner tous intérieurs aussi bien lumineux que portés sur des couleurs intenses comme le noir.\\nLa faïence restant poreuse après cuisson chaque vase est émaillé à l'intérieur par un émail transparent pour garantir l'étanchéité de la terre.\\nAfin de limiter les coûts énergétiques et environnementaux, cette collection est cuite en monocuisson (une seule cuisson au lieu de deux)	Email transparent test	Il est recommandé de ne pas passer au lave vaisselle	Monocuisson 1050°C
\.


--
-- Data for Name: collection_element_informations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element_informations (collection_element_information_uid, collection_uid, collection_element_information_text) FROM stdin;
18	69	Information 3
6	2	Faïence Lucie chamottée
7	1	Faïence Terremoto
2	3	Faïence terracotta chamottée
5	2	Faïence Lucie test
1	3	Faïence terracotta lisse
4	3	Faïence rouge chamotté
3	3	Faïence rouge
9	68	Information 111
10	68	Information 222
11	68	Information 333
\.


--
-- Data for Name: collection_element_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element_pictures (collection_element_picture_uid, collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_pictures_deletionflag) FROM stdin;
12	3	/images/Collection_terracotta/terracotta12.jpg	Image Terracotta 12	f
11	3	/images/Collection_terracotta/terracotta11.jpg	Image Terracotta 11	f
10	3	/images/Collection_terracotta/terracotta10.jpg	Image Terracotta 10	t
13	4	/images/Collections/poterie3.jpeg	Image poterie3.jpeg	f
14	4	/images/Collections/poterie4.jpeg	Image poterie4.jpeg	f
15	3	/images/Collections/poterie3.jpeg	Image poterie3.jpeg	t
16	5	/images/Collections/poterie3.jpeg	Image poterie3.jpeg	f
17	1	/images/Collections/poterie4.jpeg	Image poterie4.jpeg	t
2	3	/images/Collection_terracotta/terracotta2.jpg	Image Terracotta 2	f
3	3	/images/Collection_terracotta/terracotta3.jpg	Image Terracotta 3	f
4	3	/images/Collection_terracotta/terracotta4.jpg	Image Terracotta 4	f
5	3	/images/Collection_terracotta/terracotta5.jpg	Image Terracotta 5	f
6	3	/images/Collection_terracotta/terracotta6.jpg	Image Terracotta 6	f
7	3	/images/Collection_terracotta/terracotta7.jpg	Image Terracotta 7	f
8	3	/images/Collection_terracotta/terracotta8.jpg	Image Terracotta 8	f
9	3	/images/Collection_terracotta/terracotta9.jpg	Image Terracotta 9	f
1	3	/images/Collection_terracotta/terracotta1.jpg	Image Terracotta 1	f
\.


--
-- Data for Name: newsletter_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter_contact (contactuid, email) FROM stdin;
1	thomas.saiag@gmail.com
5	test@test.com
6	dfvdfv@vdfvfdv.com
7	ercezr@erce.de
8	drce@cr.fr
9	drce2@cr.fr
10	drce2@cr.frr
11	drce2@cr.frrr
12	drce2@cr.frrrr
13	drce2@cr.frrrr4
14	marjo@marjo.com
15	tim@tom.com
16	\N
17	test
18	t@t.com
19	marh@erfe.fcom
20	erfref@erferf.cil
\.


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_account (user_uid, user_email, user_password, user_firstname, user_lastname, admin_status) FROM stdin;
19	test18@test.com	$2b$10$1EE7eBSgJD7aWxmCUesT0.eTKpEYZO6NhIp/0EqP9qKb3fGHNxBYK	Thomas	Saiag	f
18	nora3@nora.com	$2b$10$x8frCNNEvJ2alfcWXQVeYeC58i6SEevB.iFGDX3Y61SWlxtXG0L5W	Nora	Nora	f
20	superadminadmin@admin.com	$2b$10$G4DEM7RDnyoW/3mb9Ijg.uoDZsq8T65W5Fl5lTlqlVStJZ4FAEr6S	Laure	Videau	t
21	t@t.com	$2b$10$4l.wpXx..nE26lp0i9X35eWxrDRIry5sZPgqFjzgYXbRQ67SEkP5y	Tom	Sa	f
\.


--
-- Name: collection_collection_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_collection_uid_seq', 69, true);


--
-- Name: collection_element_collection_element_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_collection_element_uid_seq', 10, true);


--
-- Name: collection_element_informatio_collection_element_informatio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_informatio_collection_element_informatio_seq', 20, true);


--
-- Name: collection_element_pictures_collection_element_pictures_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_pictures_collection_element_pictures_uid_seq', 17, true);


--
-- Name: newsletter_contact_contactuid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_contact_contactuid_seq', 20, true);


--
-- Name: user_account_user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_account_user_uid_seq', 21, true);


--
-- Name: collection_element_informations collection_element_informationtechnique_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_informations
    ADD CONSTRAINT collection_element_informationtechnique_pkey PRIMARY KEY (collection_element_information_uid);


--
-- Name: collection_element_pictures collection_element_pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_pictures
    ADD CONSTRAINT collection_element_pictures_pkey PRIMARY KEY (collection_element_picture_uid);


--
-- Name: collection_element collection_element_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element
    ADD CONSTRAINT collection_element_pkey PRIMARY KEY (collection_element_uid);


--
-- Name: collection collection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection
    ADD CONSTRAINT collection_pkey PRIMARY KEY (collection_uid);


--
-- Name: newsletter_contact newsletter_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_contact
    ADD CONSTRAINT newsletter_contact_pkey PRIMARY KEY (contactuid);


--
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (user_uid);


--
-- Name: collection_element fk_collection; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element
    ADD CONSTRAINT fk_collection FOREIGN KEY (collection_uid) REFERENCES public.collection(collection_uid) ON DELETE SET NULL;


--
-- Name: collection_element_pictures fk_collection; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_pictures
    ADD CONSTRAINT fk_collection FOREIGN KEY (collection_uid) REFERENCES public.collection(collection_uid) ON DELETE SET NULL;


--
-- Name: collection_element_informations fk_collection; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collection_element_informations
    ADD CONSTRAINT fk_collection FOREIGN KEY (collection_uid) REFERENCES public.collection(collection_uid) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

