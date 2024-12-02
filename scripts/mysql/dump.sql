-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema bm-security
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bm-security` DEFAULT CHARACTER SET utf8 ;
USE `bm-security` ;

-- -----------------------------------------------------
-- Table `bm-security`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bm-security`.`users` (
  `user_id` CHAR(36) NOT NULL,
  `user_name` VARCHAR(100) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(200) NOT NULL,
  `user_phone` CHAR(20) NULL,
  `user_createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
