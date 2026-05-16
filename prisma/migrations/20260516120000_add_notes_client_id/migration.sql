ALTER TABLE `notes`
    ADD COLUMN `client_id` VARCHAR(191) NULL;

UPDATE `notes`
SET `client_id` = CONCAT('legacy-', `id`)
WHERE `client_id` IS NULL;

ALTER TABLE `notes`
    MODIFY `client_id` VARCHAR(191) NOT NULL;

CREATE UNIQUE INDEX `notes_user_id_client_id_key`
    ON `notes`(`user_id`, `client_id`);
