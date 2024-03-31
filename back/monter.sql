create TABLE monter(
id SERIAL PRIMARY KEY,
name VARCHAR(255)
);


create TABLE home(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
region VARCHAR(255),
numberOfEntrance VARCHAR(255),
numbOfFloors VARCHAR(255),
apartmentsCount VARCHAR(255),
monter_id INTEGER,
FOREIGN KEY (monter_id) REFERENCES monter (id)
);


create TABLE entrance(
id SERIAL PRIMARY KEY,
number VARCHAR(255),
home_id INTEGER,
FOREIGN KEY (home_id) REFERENCES monter (id)
);

create TABLE visit(
id SERIAL PRIMARY KEY,
date VARCHAR(255),
shieldsOk VARCHAR(255),
shieldsNew VARCHAR(255),
shieldsReNew VARCHAR(255),
mirrorOk VARCHAR(255),
mirrorNew VARCHAR(255),
mirrorReNew VARCHAR(255),
stand VARCHAR(255),
a4 VARCHAR(255),
entrance_id INTEGER,
FOREIGN KEY (entrance_id) REFERENCES entrance (id)
);