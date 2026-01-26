--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: POSTGRES_USER
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO "POSTGRES_USER";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: short_links; Type: TABLE; Schema: public; Owner: POSTGRES_USER
--

CREATE TABLE public.short_links (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    slug character varying(100) NOT NULL,
    domain character varying(100),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.short_links OWNER TO "POSTGRES_USER";

--
-- Name: short_links_id_seq; Type: SEQUENCE; Schema: public; Owner: POSTGRES_USER
--

CREATE SEQUENCE public.short_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.short_links_id_seq OWNER TO "POSTGRES_USER";

--
-- Name: short_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: POSTGRES_USER
--

ALTER SEQUENCE public.short_links_id_seq OWNED BY public.short_links.id;


--
-- Name: short_links id; Type: DEFAULT; Schema: public; Owner: POSTGRES_USER
--

ALTER TABLE ONLY public.short_links ALTER COLUMN id SET DEFAULT nextval('public.short_links_id_seq'::regclass);


--
-- Data for Name: short_links; Type: TABLE DATA; Schema: public; Owner: POSTGRES_USER
--

COPY public.short_links (id, uuid, slug, domain, "createdAt", "updatedAt") FROM stdin;
1	2cdd64d8-9b84-4de5-b97b-497b95cc3b01	project-alpha	melonoro.com	2025-11-05 10:31:06.484917+00	2025-11-05 10:31:06.484917+00
2	b12983b1-0d52-412e-bc83-40e4c1327f8a	my-test-link	melonoro.com	2025-11-05 10:31:06.484917+00	2025-11-05 10:31:06.484917+00
3	69e9fca4-4c3b-43ab-b03d-c2f51e203245	another-demo	melonoro.com	2025-11-05 10:31:06.484917+00	2025-11-05 10:31:06.484917+00
4	11111111-1111-1111-1111-111111111111	utc-test	melonoro.com	2025-11-05 10:32:21.611525+00	2025-11-05 10:32:21.611525+00
5	11111111-1111-1111-1111-111111111112	mm	melonoro.com	2025-11-08 05:23:12.694+00	2025-11-08 05:23:12.694+00
6	11111111-1111-1111-1111-111111111113	mm-7Qywe5Ps	melonoro.com	2025-11-08 05:23:58.362+00	2025-11-08 05:23:58.362+00
7	11111111-1111-1111-1111-111111111114	name-with-spaces	melonoro.com	2025-11-08 05:26:53.375+00	2025-11-08 05:26:53.375+00
8	11111111-1111-1111-1111-111111111115	name-with-spaces-2025-11-08-kjbkcqvo	melonoro.com	2025-11-08 05:35:37.924+00	2025-11-08 05:35:37.924+00
9	11111111-1111-1111-1111-111111111116	name-with-spaces-2025-11-08-kjbkcqvo-2025-11-08-y720tuk1	melonoro.com	2025-11-08 05:36:09.099+00	2025-11-08 05:36:09.099+00
10	11111111-1111-1111-1111-111111111117	name-with-spaces-2025-11-08-kjbkcqvo-2025-11-08-vskfpl8	melonoro.com	2025-11-08 05:36:54.036+00	2025-11-08 05:36:54.036+00
11	11111111-1111-1111-1111-111111111118	name-with-spaces-2025-11-08-kjbkcqvo-025-11-08-ouvlg5m	melonoro.com	2025-11-08 05:38:05.778+00	2025-11-08 05:38:05.778+00
12	11111111-1111-1111-1111-111111111119	name-with-spaces-2025-11-08-kjbkcqvo-25-11-08-kxgqm4	melonoro.com	2025-11-08 05:38:17.4+00	2025-11-08 05:38:17.4+00
13	11111111-1111-1111-1111-111111111129	name-with-spaces-2025-11-08-kjbkcqvo-25-11-08-chlg4nz		2025-11-08 05:39:19.302+00	2025-11-08 05:39:19.302+00
14	11111111-1111-1111-1111-111111111139	opa		2025-11-08 05:39:39.047+00	2025-11-08 05:39:39.047+00
15	11111111-1111-1111-1111-111111111149	opa-25-11-08-t9mo9rm		2025-11-08 05:39:43.895+00	2025-11-08 05:39:43.895+00
16	11111111-1111-1111-1111-111111111159	25-11-08		2025-11-08 05:40:00.181+00	2025-11-08 05:40:00.181+00
17	11111111-1111-1111-1111-111111111169	25-11-08-mvpzhn		2025-11-08 05:40:10.838+00	2025-11-08 05:40:10.838+00
18	11111111-1111-1111-1111-111111111189	25-11-08-6b9zsax	melonoro.com	2025-11-08 05:42:33.17+00	2025-11-08 05:42:33.17+00
19	b411bfc4-d607-4669-81a3-66c7557ce677	nazvanie-proekta-5-for-slots-test	melonoro.com	2025-11-08 12:11:42.249+00	2025-11-08 12:11:42.249+00
20	da09261f-a8d0-4d31-ae88-a6c504ba5e10	nazvanie-proekta-3	melonoro.com	2025-11-08 15:06:32.185+00	2025-11-08 15:06:32.185+00
21	c89c3a7e-ba58-4f38-9fbb-2c08c7d7802f	nazvanie-proekta-7	melonoro.com	2025-11-09 15:15:05.727+00	2025-11-09 15:15:05.727+00
22	72ae1044-e35f-4b67-858e-759cfc799329	nazvanie-proekta	melonoro.com	2025-11-11 11:43:52.333+00	2025-11-11 11:43:52.333+00
23	848c2184-acbd-4ad1-8af1-e3dc6ef11ff4	nazvanie-proekta-6	melonoro.com	2025-11-11 11:51:21.601+00	2025-11-11 11:51:21.601+00
\.


--
-- Name: short_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: POSTGRES_USER
--

SELECT pg_catalog.setval('public.short_links_id_seq', 23, true);


--
-- Name: short_links short_links_pkey; Type: CONSTRAINT; Schema: public; Owner: POSTGRES_USER
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT short_links_pkey PRIMARY KEY (id);


--
-- Name: short_links short_links_slug_key; Type: CONSTRAINT; Schema: public; Owner: POSTGRES_USER
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT short_links_slug_key UNIQUE (slug);


--
-- Name: short_links short_links_uuid_key; Type: CONSTRAINT; Schema: public; Owner: POSTGRES_USER
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT short_links_uuid_key UNIQUE (uuid);


--
-- Name: short_links set_updated_at; Type: TRIGGER; Schema: public; Owner: POSTGRES_USER
--

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.short_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: short_links update_short_links_updated_at; Type: TRIGGER; Schema: public; Owner: POSTGRES_USER
--

CREATE TRIGGER update_short_links_updated_at BEFORE UPDATE ON public.short_links FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- PostgreSQL database dump complete
--

