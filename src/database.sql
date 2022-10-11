create table usuario (
id int unique,
id_usuario_cademi int unique,
nome varchar(255),
email text,
celular varchar(50),
login_auto text,
gratis boolean,
criado_em date,
ultimo_acesso_em date
)

create table produto (
id serial,
id_produto_cademi int unique,
nome varchar(255),
ordem int,
oferta_url text,
vitrine_id int,
vitrine_ordem int,
vitrine_nome text
)

create table usuario_produtos (
id serial primary key,
id_usuario_cademi int REFERENCES usuario(id_usuario_cademi),
id_produto_cademi int REFERENCES produto(id_produto_cademi),
duracao varchar(255),
duracao_tipo varchar(255),
comecou_em date,
encerra_em date,
ultimo_acesso_em date,
porcentagem_aulas varchar(5),
aulas_assistidas int,
aulas_completas int,
encerrado boolean
)


create table aulas (
id serial unique primary key,
id_aula_cademi int unique,
id_produto_cademi int references produto(id_produto_cademi),
nome text,
ordem int,
secao_id int unique,
secao_tipo text ,
secao_ordem int ,
secao_nome text 
)

create table aulas_usuario(
id serial primary key ,
id_aula_cademi int references aulas(id_aula_cademi),
id_usuario_cademi int references usuario(id_usuario_cademi),
id_produto_cademi int references produto(id_produto_cademi),
acesso_em date
)
