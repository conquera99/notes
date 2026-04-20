ALTER TABLE `notes`
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

CREATE INDEX `notes_user_id_deleted_at_idx`
    ON `notes`(`user_id`, `deleted_at`);