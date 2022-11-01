CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,			-- 유저 id
    name VARCHAR(32) NULL,			-- 이름
    github_id VARCHAR(32) NOT NULL,				-- 깃헙 아이디
);