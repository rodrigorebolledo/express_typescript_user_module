CREATE TABLE `role` (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE `user` (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	pass BINARY(60) NOT NULL,
	role_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES `role`(id)
);

INSERT INTO `role` (name) VALUES ("admin");
INSERT INTO `role` (name) VALUES ("member");
