CREATE SCHEMA `scheduler` DEFAULT CHARACTER SET utf8;

CREATE TABLE scheduler.users (
    id INT AUTO_INCREMENT PRIMARY KEY,			-- 유저 id
    name VARCHAR(32) NULL,			-- 이름
    github_id VARCHAR(32) NOT NULL				-- 깃헙 아이디
)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;
