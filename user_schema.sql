CREATE TABLE `kit_crm_db`.`user` ( `ID` INT(11) NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `phone` VARCHAR(45) NOT NULL , `comment` TEXT NOT NULL , `active` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`ID`)) ENGINE = InnoDB;

INSERT INTO `user` (`ID`, `first_name`, `last_name`, `email`, `phone`, `comment`, `active`) VALUES (NULL, 'Alexey', 'F', 'lex@mail.com', '+380999999999', 'hey', 'active'), (NULL, 'Alex', 'P', 'alex@mail.com', '+380990990909', 'hui', 'active')
