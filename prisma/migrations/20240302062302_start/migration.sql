-- CreateTable
CREATE TABLE "catergories" (
    "catergoryid" SERIAL NOT NULL,
    "catergorycreator" TEXT NOT NULL,
    "catergoryname" TEXT NOT NULL,

    CONSTRAINT "catergories_pkey" PRIMARY KEY ("catergoryid")
);

-- CreateTable
CREATE TABLE "todolists" (
    "todolistid" SERIAL NOT NULL,
    "todolistname" TEXT NOT NULL,
    "catergory" INTEGER NOT NULL,

    CONSTRAINT "todolists_pkey" PRIMARY KEY ("todolistid")
);

-- CreateTable
CREATE TABLE "todolistenitem" (
    "itemid" SERIAL NOT NULL,
    "itemtext" TEXT NOT NULL,
    "itemdone" BOOLEAN NOT NULL,
    "itemtodolist" INTEGER NOT NULL,

    CONSTRAINT "todolistenitem_pkey" PRIMARY KEY ("itemid")
);

-- AddForeignKey
ALTER TABLE "todolists" ADD CONSTRAINT "todolists_catergory_fkey" FOREIGN KEY ("catergory") REFERENCES "catergories"("catergoryid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todolistenitem" ADD CONSTRAINT "todolistenitem_itemtodolist_fkey" FOREIGN KEY ("itemtodolist") REFERENCES "todolists"("todolistid") ON DELETE RESTRICT ON UPDATE CASCADE;
