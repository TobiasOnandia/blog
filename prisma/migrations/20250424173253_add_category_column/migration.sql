-- First add the column as nullable
ALTER TABLE "Post" ADD COLUMN "category" TEXT;

-- Update existing rows with a default category
UPDATE "Post" SET "category" = 'Uncategorized' WHERE "category" IS NULL;

-- Now make the column NOT NULL
ALTER TABLE "Post" ALTER COLUMN "category" SET NOT NULL;
