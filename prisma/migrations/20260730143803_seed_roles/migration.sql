INSERT INTO `Role` (`id`, `name`) VALUES (1, 'User'), (2, 'Admin')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
