-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "emailAddress", "firstname", "hashedPassword", "id", "lastname", "updatedAt") SELECT "createdAt", "emailAddress", "firstname", "hashedPassword", "id", "lastname", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
