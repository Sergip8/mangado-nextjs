CREATE TABLE manga_main_info(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    score DECIMAL(2, 1), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE manga_details(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    year VARCHAR(4) NOT NULL,
    description TEXT NOT NULL,
    alt_titles VARCHAR(255),
    other_titles VARCHAR(255)
)

('accion')
('aventura')
('comedia')
('drama')
('recuentos de la vida')
('ecchi')
('fantasia')
('magia')
('sobrenatural')
('horror')
('misterio')
('psicologico')
('romance')
('ciencia ficcion')
('thriller')
('deporte')
('girls love')
('boys love')
('harem')
('mecha')
('supervivencia')
('reencarnacion')
('gore')
('apocaliptico')
('tragedia')
('vida escolar')
('historia')
('militar')
('policiaco')
('crimen')
('superpoderes')
('vampiros')
('artes marciales')
('samurai')
('genero bender')
('realidad virtual')
('ciberpunk')
('musica')
('parodia')
('animacion')
('demonios')
('familia')
('extranjero')
('niños')
('realidad')
('telenovela')
('guerra')
('oeste')
('traps')
