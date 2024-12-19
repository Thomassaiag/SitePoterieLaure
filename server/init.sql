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
    collection_element_picture_url character varying(200) NOT NULL,
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
-- Name: portrait; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.portrait (
    portrait_uid integer NOT NULL,
    portrait_picture_url character varying(50) NOT NULL,
    portrait_picture_alt character varying(50) NOT NULL,
    portrait_description character varying(5000)
);


ALTER TABLE public.portrait OWNER TO postgres;

--
-- Name: portrait_portrait_uid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.portrait_portrait_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.portrait_portrait_uid_seq OWNER TO postgres;

--
-- Name: portrait_portrait_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.portrait_portrait_uid_seq OWNED BY public.portrait.portrait_uid;


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
-- Name: portrait portrait_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portrait ALTER COLUMN portrait_uid SET DEFAULT nextval('public.portrait_portrait_uid_seq'::regclass);


--
-- Name: user_account user_uid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_account ALTER COLUMN user_uid SET DEFAULT nextval('public.user_account_user_uid_seq'::regclass);


--
-- Data for Name: collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection (collection_uid, collection_title, collection_description, collection_picture_url, collection_picture_alt, collection_deletionflag) FROM stdin;
1	Terremoto	Description Terremoto	/images/Static_images/Collections/terremoto.jpg	Image terremoto	f
2	Lucie	Description Lucie	/images/Static_images/Collections/lucie.jpg	Image Lucie	f
3	Terracota	Description Terracota	/images/Static_images/Collections/terracota.jpg	Image terracota	f
4	Porcelaine	Description Porcelaine	/images/Static_images/Collections/porcelaine.jpg	Image Porcelaine	f
5	Collection 4	Description Collection 4	/images/Static_images/Collections/collection4.jpg	Image Collection 4	f
\.


--
-- Data for Name: collection_element; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element (collection_element_uid, collection_uid, collection_element_title, collection_element_description, collection_element_email, collection_element_recommandation, collection_element_cooking) FROM stdin;
5	5	Collection 4	Description Collection 4	Email transparent	Il est recommandé de ne pas passer au lave vaisselle.	Grande Cuisson
3	2	Lucie	Lucie, c'est pas marqué dans les livres	Email Lucie Transparent	Il est recommandé de ne pas passer Lucie au Lave Vaisselle	Monocuisson Lucie 2000°C
2	1	Terremoto	Description Terremoto	Email pas Transparent	Il est recommandé de ne pas passer au lave vaisselle. (terremoto)	Monocuisson 2000°C
4	4	Porcelaine\n	Description Porcelaine	Email transparent	Il est recommandé de ne pas passer au lave vaisselle.	Moyenne Cuisson
1	3	Terracotta	Terracotta signifie littéralement "terre cuite" en italien, mais ce terme est aussi utilisé pour désigner une palette de couleur chaude qui varie du orange à la brique.\\nCette collection est la première à avoir été créée. Elle a été pensée autour de la faïence couleur terracotta orangée. C'est ensuite rajoutée une variation plus rouge, et de la chamotte. La chamotte est de la terre cuite réduite en grain, ajouté à la terre. Elle permet d'ajouter de la texture. Chaque objet est donc déclin‚ en 4 variations : orange lisse, orange chamotté, rouge lisse et rouge chamotté.\\nCette collection allie à la fois la rusticité de la terre cuite non émaillée et la modernité des formes. Elle a été pensée pour être àla fois intemporelle et accompagner tous intérieurs aussi bien lumineux que portés sur des couleurs intenses comme le noir.\\nLa faïence restant poreuse après cuisson chaque vase est émaillé à l'intérieur par un émail transparent pour garantir l'étanchéité de la terre.\\nAfin de limiter les coûts énergétiques et environnementaux, cette collection est cuite en monocuisson (une seule cuisson au lieu de deux)	Email transparent test	Il est recommandé de ne pas passer au lave vaisselle	Monocuisson 1050°C
\.


--
-- Data for Name: collection_element_informations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element_informations (collection_element_information_uid, collection_uid, collection_element_information_text) FROM stdin;
47	1	Test Terremoto
49	1	dsvfdvfvf
6	2	Faïence Lucie chamottée
2	3	Faïence terracotta chamottée
5	2	Faïence Lucie test
1	3	Faïence terracotta lisse
4	3	Faïence rouge chamotté
3	3	Faïence rouge
41	2	Faïence étrange
9	\N	Information 111
10	\N	Information 222
11	\N	Information 333
18	\N	Information 3
24	\N	ezfrezfr
25	\N	ezfrrezf
26	\N	ezfrrezf
27	\N	ezfrrezf
28	\N	ezfrrezf
29	\N	ezfrrezf
30	\N	ezfrrezf
31	\N	ezfrrezf
32	\N	ezfrrezf
21	\N	efrerfefe
22	\N	efrezfr
23	\N	refrefr
34	\N	erfezfrezfefr
\.


--
-- Data for Name: collection_element_pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collection_element_pictures (collection_element_picture_uid, collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_pictures_deletionflag) FROM stdin;
12	3	/images/Static_images/Collections/terracotta12.jpg	Image Terracotta 12	f
11	3	/images/Static_images/Collections/terracotta11.jpg	Image Terracotta 11	f
10	3	/images/Static_images/Collections/terracotta10.jpg	Image Terracotta 10	t
13	4	/images/Static_images/Collections/poterie3.jpeg	Image poterie3.jpeg	f
14	4	/images/Static_images/Collections/poterie4.jpeg	Image poterie4.jpeg	f
15	3	/images/Static_images/Collections/poterie3.jpeg	Image poterie3.jpeg	t
16	5	/images/Static_images/Collections/poterie3.jpeg	Image poterie3.jpeg	f
17	1	/images/Static_images/Collections/poterie4.jpeg	Image poterie4.jpeg	t
2	3	/images/Static_images/Collections/terracotta2.jpg	Image Terracotta 2	f
3	3	/images/Static_images/Collections/terracotta3.jpg	Image Terracotta 3	f
4	3	/images/Static_images/Collections/terracotta4.jpg	Image Terracotta 4	f
5	3	/images/Static_images/Collections/terracotta5.jpg	Image Terracotta 5	f
6	3	/images/Static_images/Collections/terracotta6.jpg	Image Terracotta 6	f
7	3	/images/Static_images/Collections/terracotta7.jpg	Image Terracotta 7	f
8	3	/images/Static_images/Collections/terracotta8.jpg	Image Terracotta 8	f
9	3	/images/Static_images/Collections/terracotta9.jpg	Image Terracotta 9	f
1	3	/images/Static_images/Collections/terracotta1.jpg	Image Terracotta 1	f
19	1	/images/lucie.jpg	Image lucie.jpg	f
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
-- Data for Name: portrait; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.portrait (portrait_uid, portrait_picture_url, portrait_picture_alt, portrait_description) FROM stdin;
2	/images/Collections/lucie.jpg	Portrait Picture	Au cœur de l'histoire de l'entreprise LV Céramique se trouve une passion pour la créativité, \r\n    la simplicité, l'élégance, et un engagement profond envers la préservation de notre précieux environnement.\r\n    C'est l'histoire inspirante de Laure Videau, une femme qui a réinventé sa vie à travers une reconversion \r\n    audacieuse pour créer un univers où l'art de la céramique prend vie.\r\n\r\n    Laure Videau, artiste dans l'âme, a suivi le chemin de la céramique après avoir effectué une reconversion \r\n    remarquable. Lassée de la monotonie du monde corporatif, elle a trouvé sa véritable passion dans la création \r\n    de pièces céramiques uniques, où la simplicité et l'élégance sont les maîtres mots. C'est ainsi qu'est née LV Céramique, \r\n    un véritable hymne à la beauté épurée et à la créativité infinie.\r\n\r\n    La philosophie de Laure se traduit dans chacune de ses créations, où la simplicité transcende le quotidien \r\n    pour devenir une véritable œuvre d'art. Chaque pièce, façonnée à la main avec une minutie et une précision \r\n    inégalées, reflète l'esthétique épurée de Laure. Ses céramiques, qu'il s'agisse de bols, vases, ou objets de \r\n    décoration, incarnent une élégance naturelle qui s'intègre harmonieusement dans tous les espaces de vie.\\n\r\n    Mais LV Céramique ne se contente pas d'être une ode à la beauté et à l'élégance, c'est également un acte d'amour \r\n    envers notre planète. Laure Videau est profondément engagée dans la préservation de l'environnement. \r\n    Chaque pièce est créée avec une attention particulière à l'utilisation de matériaux durables et écologiques, \r\n    et les processus de production sont soigneusement conçus pour minimiser leur impact sur la planète.\r\n\r\n    Laure Videau incarne le parfait équilibre entre l'artiste et l'écologiste. Son travail dans le domaine de la \r\n    céramique est un hommage à la simplicité, à l'élégance, et à la nature. Avec LV Céramique, elle nous offre des \r\n    pièces uniques qui illuminent nos vies tout en contribuant à préserver la beauté naturelle de notre monde.\r\n    Rejoignez Laure Videau dans son voyage artistique et environnemental chez LV Céramique, où la simplicité \r\n    rencontre l'élégance, et où l'art devient un acte de préservation de notre planète.\r\n\r\n    Découvrez une collection exceptionnelle de céramiques, chaque pièce étant une invitation à vivre une vie plus \r\n    belle, plus simple et plus respectueuse de notre environnement.
\.


--
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_account (user_uid, user_email, user_password, user_firstname, user_lastname, admin_status) FROM stdin;
19	test18@test.com	$2b$10$1EE7eBSgJD7aWxmCUesT0.eTKpEYZO6NhIp/0EqP9qKb3fGHNxBYK	Thomas	Saiag	f
18	nora3@nora.com	$2b$10$x8frCNNEvJ2alfcWXQVeYeC58i6SEevB.iFGDX3Y61SWlxtXG0L5W	Nora	Nora	f
20	superadminadmin@admin.com	$2b$10$G4DEM7RDnyoW/3mb9Ijg.uoDZsq8T65W5Fl5lTlqlVStJZ4FAEr6S	Laure	Videau	t
21	t@t.com	$2b$10$4l.wpXx..nE26lp0i9X35eWxrDRIry5sZPgqFjzgYXbRQ67SEkP5y	Tom	Sa	f
22	ttttttt@tttttt.com	$2b$10$2r/uXT91LJmBJlgDeMG.heqXvw2CtMhD7LaqnEB4rc7YYdoeYwV7m	ttttt	ttttt	f
23	erferfefrezrf@fezrf.com	$2b$10$PGOcQfySVW.W8BtYba6S7eYHUUwXhwk569F9dUatzq68oh/EGWsw6	erfefefezf	ezfefrerfezr	f
24	erferfefrezrfzedzdezd@fezrf.com	$2b$10$qmHahZBTgZVVxrLFR3JqXeTqZlEzUXnAaqQyhjIzniQlt6xOZMTei	erfefefezfzdezd	ezfefrerfezrzedzde	f
25	erferfefrezrfzederfezfezzdezd@fezrf.com	$2b$10$IDLbHkibQUyi5tQ4TUqkTOeXD2LTaWD1CteNO0qIzLO51sSs7cFpS	erfefefezfzdezderfezfr	ezfefrerfezrzedzdeerfefrefr	f
26	erferfefrezrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$.Dfuq6vDKpOwtzmEfA./wePED8cfEr4E/x/0GkXvguS9JXrI9py0S	erfefefezefrezfrezfrfzdezderfezfr	ezfefreezrfezrfezfrrfezrzedzdeerfefrefr	f
27	erferfefrezrerfezfrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$3gw13MM3DM2xott8gRB/M.NUHAQKYS7uayt9jM0HK9/KZUwvWR8Di	erfefefezefrerferfezrfezfrezfrfzdezderfezfr	ezfefreezrfezfrezfrefezrfezfrrfezrzedzdeerfefrefr	f
28	erferfefrezrerfeerfezfrzfrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$Pf5M.UTqrl/DjP/CTNthWOhEGiYC.ZRQCg3wk8zopgkhui04hFg2G	erfefefezefrerferfezrfezfrezfrfzdezderfezfr	ezfefreezrfezfrezfrefezrfezfrrfezrzedzdeerfefrefr	f
29	erferfefrerfezfrezrerfeerfezfrzfrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$.W7e3zydxqQ/jDkgTPfmV.vh63Dce7lnJJxwSrjW1aSgeByB74Tpq	erfefefezefrerferfezrfezfrezfrfzdezderfezfr	ezfefreezrfezfrezfrefezrfezfrrfezrzedzdeerfefrefr	f
30	erferfefrerfertrtrgzfreezfrezfrzrerfeerfezfrzfrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$tzQJdIg0n07qGrXTioT11./nINmk6/46mw3aJ/Kh5mik1L9OImPDm	erfefefezefrerferfezrfezfrezfrfzdezderfezfr	ezfefreezrfezfrezfrefezrfezfrrfezrzedzdeerfefrefr	f
31	erferfefrerfertrtrgerfezrfzfreezfrezfrzrerfeerfezfrzfrerfezfrezffzederfezfezzdezd@fezrf.com	$2b$10$HULn20ngbI7yRLiySUafzuFpm813get.e3D1kfxcfgba09WVSCgPG	erfefefezefrerferfezrfezfrezfrfzdezderfezfr	ezfefreezrfezfrezfrefezrfezfrrfezrzedzdeerfefrefr	f
32	zede@ger.com	$2b$10$Khtx34/4KfF6Amny0BGARe6rBMxaHq.eNCemvGdIEezzcfbX/u7M2	refezfr	ezrfe	f
33	zedererezfefefe@ger.com	$2b$10$zL2DaThuAweM7JtGZbqUsu0wbm6g7dIQ5rk/aDYDjyjGSnZKKCFWq	refezfr	ezrfe	f
34	zederfezfererezfefefe@ger.com	$2b$10$VT8A6FDO12f1ulfs2Xr7d.EAQhOaaY1zaS2hRnsrPiJZdoryCDk9C	refezfr	ezrfe	f
35	zederfeezrferfzfererezfefefe@ger.com	$2b$10$Uwq5MdJkKedvPltbv7MrLumYkCkzMh2m5f7yHcOVrsM19Q5/0WNNm	refezfr	ezrfe	f
36	erfezfrfre@eferff.com	$2b$10$i8Uh1FeMVHy2yjTxtfSdNO.wQ0umAKZdiq.2bND0nhr23beqkg1je	erfezfrrezf	ezfrefrefrez	f
37	erefezfefrfezfrfre@eferff.com	$2b$10$ymamk/y4.v9LrKbjpse6Uu.OycUGXTcsE2di15G2859h97J1wsLCG	erfezfrrezf	ezfrefrefrez	f
38	erefezfefrfezezfrezfrfrfre@eferff.com	$2b$10$Df5elnpmH1ss8WRLRHCLberS.xIWqsprVDuoT8e2yHZsbBHMu6h.q	erfezfrrezf	ezfrefrefrez	f
39	erefezfefrfezezftrregtrezfrfrfre@eferff.com	$2b$10$tBwftJ0W9W5.BSzvWe16iuI5snHt5gRTrwUclUig4Q.tDf8St8q3u	erfezfrrezf	ezfrefrefrez	f
40	erefezfefrfezezsqdcdscftrregtrezfrfrfre@eferff.com	$2b$10$LAJ7Acml0j4vu2L0LKviIe6jV4hfjPm5G15KTqsJ4tt8BxiEjAqba	erfezfrrezf	ezfrefrefrez	f
41	erefezfefrfededezdzezsqdcdscftrregtrezfrfrfre@eferff.com	$2b$10$wOQDEVvFzV3jat98QD1.RO4W55UQPbKc49.URBIR2ie1ZAbST7u/6	erfezfrrezf	ezfrefrefrez	f
42	erefezfefrfeddcdsfcdsfcdedezdzezsqdcdscftrregtrezfrfrfre@eferff.com	$2b$10$HOllt9FtiOd2Kc1W0E1Dv.qzbS2M0qd07ZRW1eVz6wHOciU.tkEWi	erfezfrrezf	ezfrefrefrez	f
43	erferff@egreger.com	$2b$10$HGW9E0CwORrVMtSeq/xf2uL/.MdEJz4Irq3A9aQAE.fc996JRKJVe	erfefr	efrezfrezf	f
44	eefrefrefrferff@egreger.com	$2b$10$26fy1vX4rw8.OIiAy5xIc.R8WwPGApRI.nEkdfqfW.TPXsRZxy6RW	erfefr	efrezfrezf	f
45	eefrefrefrferfezferff@egreger.com	$2b$10$MmmDUIP6c/ruRwJPZwddhe3T.tsOGqpEUX4I3NQaX3tIkTvqFhBbu	erfefr	efrezfrezf	f
\.


--
-- Name: collection_collection_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_collection_uid_seq', 72, true);


--
-- Name: collection_element_collection_element_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_collection_element_uid_seq', 20, true);


--
-- Name: collection_element_informatio_collection_element_informatio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_informatio_collection_element_informatio_seq', 49, true);


--
-- Name: collection_element_pictures_collection_element_pictures_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_element_pictures_collection_element_pictures_uid_seq', 19, true);


--
-- Name: newsletter_contact_contactuid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newsletter_contact_contactuid_seq', 20, true);


--
-- Name: portrait_portrait_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.portrait_portrait_uid_seq', 2, true);


--
-- Name: user_account_user_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_account_user_uid_seq', 45, true);


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
-- Name: portrait portrait_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.portrait
    ADD CONSTRAINT portrait_pkey PRIMARY KEY (portrait_uid);


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

