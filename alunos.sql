-- Database: novo

DROP DATABASE IF EXISTS novo;

CREATE DATABASE novo
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
-- Table: public.alunos
DROP SEQUENCE IF EXISTS public.alunos_id_seq;

CREATE SEQUENCE IF NOT EXISTS public.alunos_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;


DROP TABLE IF EXISTS public.alunos;

CREATE TABLE IF NOT EXISTS public.alunos
(
    id integer NOT NULL DEFAULT nextval('alunos_id_seq'::regclass),
    nome text COLLATE pg_catalog."default" NOT NULL,
    matricula text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT alunos_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.alunos
    OWNER to postgres;	
	
INSERT INTO public.alunos (nome, matricula) VALUES 
('Ana Silva', '20230001'),
('Bruno Costa', '20230002'),
('Camila Oliveira', '20230003'),
('Daniel Souza', '20230004'),
('Eduarda Lima', '20230005'),
('Felipe Rocha', '20230006'),
('Giovana Martins', '20230007'),
('Henrique Almeida', '20230008'),
('Isabela Fernandes', '20230009'),
('João Pedro Ramos', '20230010');	
