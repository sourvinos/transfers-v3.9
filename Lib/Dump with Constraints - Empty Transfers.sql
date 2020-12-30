-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: islandcruises
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aspnetroleclaims`
--

DROP TABLE IF EXISTS `aspnetroleclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetroleclaims` (
  `id` int NOT NULL AUTO_INCREMENT,
  `RoleId` varchar(100) NOT NULL,
  `ClaimType` varchar(100) DEFAULT NULL,
  `ClaimValue` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetroleclaims`
--

LOCK TABLES `aspnetroleclaims` WRITE;
/*!40000 ALTER TABLE `aspnetroleclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetroleclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetroles`
--

DROP TABLE IF EXISTS `aspnetroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetroles` (
  `Id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedName` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `RoleNameIndex` (`NormalizedName`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetroles`
--

LOCK TABLES `aspnetroles` WRITE;
/*!40000 ALTER TABLE `aspnetroles` DISABLE KEYS */;
INSERT INTO `aspnetroles` VALUES ('23497d7f-804b-4245-9e7b-ac8db606d454','Admin','ADMIN','0ad0011a-055a-43ea-a909-a32ffc330095');
/*!40000 ALTER TABLE `aspnetroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserclaims`
--

DROP TABLE IF EXISTS `aspnetuserclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetuserclaims` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` varchar(100) NOT NULL,
  `ClaimType` varchar(100) DEFAULT NULL,
  `ClaimValue` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserclaims`
--

LOCK TABLES `aspnetuserclaims` WRITE;
/*!40000 ALTER TABLE `aspnetuserclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserroles`
--

DROP TABLE IF EXISTS `aspnetuserroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetuserroles` (
  `userid` varchar(100) NOT NULL,
  `roleid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserroles`
--

LOCK TABLES `aspnetuserroles` WRITE;
/*!40000 ALTER TABLE `aspnetuserroles` DISABLE KEYS */;
INSERT INTO `aspnetuserroles` VALUES ('e7e014fd-5608-4936-866e-ec11fc8c16da','23497d7f-804b-4245-9e7b-ac8db606d454');
/*!40000 ALTER TABLE `aspnetuserroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetusers`
--

DROP TABLE IF EXISTS `aspnetusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aspnetusers` (
  `Id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL,
  `Discriminator` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `DisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `IsAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  UNIQUE KEY `UserNameIndex` (`NormalizedUserName`(255)),
  KEY `EmailIndex` (`NormalizedEmail`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
/*!40000 ALTER TABLE `aspnetusers` DISABLE KEYS */;
INSERT INTO `aspnetusers` VALUES ('e7e014fd-5608-4936-866e-ec11fc8c16da','sourvinos','SOURVINOS','johnsourvinos@hotmail.com','JOHNSOURVINOS@HOTMAIL.COM',1,'AQAAAAEAACcQAAAAELXGBv1m87q7wktMt3mIipDcSslPgddCwvIXjLpX29qsk850g2fBs3REwvZQdG9uvA==','K3NF7V2GC5BR36KMKDQU5URBVIF34YXM','59b4ce40-12bc-470f-8373-7e8f1c34cb77',NULL,0,0,NULL,1,0,'AppUser','John',1);
/*!40000 ALTER TABLE `aspnetusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Profession` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Address` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Phones` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `PersonInCharge` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (5,'PACHIS TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΓΚΙΛΦΟΡΔ 7-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(8,'M.T.S. INCOMING S.A.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗΣ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΗΣ 58-ΚΕΡΚΥΡΑ','0661.24586','FAGOGENIS NIKOS','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(9,'FLORIDA HOLIDAYS','-','-','0662.61117','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(10,'ISLAND HOLIDAYS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΒΟΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(12,'ASPROKAVOS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΒΟΣ-ΛΕΥΚΙΜΜΗ','0662.61281','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(13,'NAOS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΒΟΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(19,'ΚΑΡΑΤΖΕΝΗΣ ΕΥΑΓΓΕΛΟΣ','ΕΚΔΟΤΗΡΙΟ ΕΙΣΙΤΗΡΙΩΝ','ΜΩΡΑΙΤΙΚΑ ΚΕΡΚΥΡΑ','2661076768','','vangeliskar@yahoo.gr',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(22,'LORD TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΛΕΥΚΙΜΜΗΣ 38 - ΚΕΡΚΥΡΑ','0661.91617','KALOUDIS VASILIS','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(24,'ΒΛΑΧΟΣ ΓΕΩΡΓΙΟΣ G+S','-','-','0661.75723','VLACHOS GEORGIOS','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(25,'STAR TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(30,'TRAVELWORLD','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 25','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(34,'C.T.S','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝ. ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ - ΑΛΥΚΕΣ ΠΟΤΑΜΟΥ','0661.48994','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(35,'TUI HELLAS','ΤΑΞΕΙΔΙΩΤΙΚΗ ΤΟΥΡΙΣΤΙΚΗ ','Λ.ΑΜΑΡΟΥΣΙΟΥ ΧΑΛΑΝΔΡΙΟΥ 80, 151 25 ΠΑΡ. ΑΜΑΡΟΥΣΙΟΥ','','ANGELA MAKRI','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(38,'KYANEA','-','-','','THODORIS','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(42,'BENITSES TRV','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(45,'HELLENIC ISLAND SERVISES','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΟΝΟΠΡΟΣΩΠΗ Ι.Κ.Ε','','ANNITA','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(48,'HELLAS TOURIST SERVICES S.A.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 58Α','2661034495','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(49,'IONIAN TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(54,'COSMOS CORFU A.E','-','-','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(58,'ΠΑΠΑΔΑΤΟΥ ΧΡΙΣΤΙΑΝΝΑ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΓ. ΓΟΡΔΙΟΣ - ΣΥΝ/ΔΕΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(59,'TRUST TRV','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΓΟΥΒΙΑ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(60,'STATUS','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(62,'CORFIOT HOLIDAYS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΠΕΡΟΥΛΑΔΕΣ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(67,'FOUXIA','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(70,'MAIANΔΡΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΑΝΤΙΣΤΑΣΕΩΣ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(72,'SUNSPOTS','ΤΟΥΡΙΣΤΙΚΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ','ΕΘΝ. ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 24','2661039707','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(73,'PANDIS TRAVEL KAVOS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΒΟΣ-ΛΕΥΚΙΜΜΗΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(77,'NEXT HOLIDAYS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΕΣΣΟΓΓΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(78,'KARDAKARIS NIKOLAOS','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(89,'DAFNIS FIRST TRAVEL Α.Ε.','ΤΟΥΡΙΣΤΙΚΗ & ΞΕΝΟΔΟΧΕΙΑΚΗ ΕΤΑΙΡΙΑ','2ο ΧΛΜ ΕΘΝ. ΠΕΛΕΚΑ - ΑΛΕΠΟΥ, ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(92,'TSOKAS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝ. ΑΝΤΙΣΤΑΣΕΩΣ 12 - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(93,'HELLENIC CORFU SERVICES','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 24','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(96,'GRECO SERVICES','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(99,'ΒΑΣΙΛΑΚΗΣ ΑΝΤ. ΦΙΛΙΠΠΟΣ','ΓΡΑΦΕΙΟ ΓΕΝ. ΤΟΥΡΙΣΜΟΥ-ΕΝΟΙΚ/ΣΕΙΣ ΑΥΤ.','ΡΟΔΑ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(103,'CORFU TOURIST SERVICES','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΝΑΥΣΙΚΑΣ 30-ΚΑΝΟΝΙ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(105,'CORFU PARADISE','-','-','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(109,'METAXA AIKATERINH','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(114,'CORFU SEA TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(116,'KOKKINOS TRAVEL','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΜΑΚΕΔΟΝΙΑΣ 3, 153 41-ΑΓΙΑ ΠΑΡΑΣΚΕΥΗ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(117,'EURO VOYAGES TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(120,'ΒΛΑΣΕΡΟΣ ΚΩΝ/ΝΟΣ-ΚΑPPA VITA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΛ.ΒΕΝΙΖΕΛΟΥ 32 Α-ΚΕΡΚΥΡΑ (ΥΠΟΚΑΤΑΣΤΗΜΑ)','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(121,'VRADI SOFIA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΝΤΑΡΑΤΣΟΥ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(123,'GIANOYLIS TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(124,'PIPILAS TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(125,'KRASAKIS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΧΑΡΑΒΗ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(127,'KANOYLAS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 13-14','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(128,'PATROS TRAVEL','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(129,'XELGKA MPOYTEP','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΔΑΣΙΑ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(130,'OPTIMUM INTERNATIONAL A.E.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΓ. ΙΩΑΝΝΗΣ - ΠΕΡΙΣΤΕΡΩΝ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(132,'ZORPIDIS','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(133,'MEETING POINT HELLAS AE','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΔΗΜΗΤΡΙΟΥ ΚΑΣΑΠΑΚΗ 7','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(134,'KARDAKARI PANAGIOTA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','RODA - KERKYRA','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(135,'MOYZENIDIS TRAVEL','ΓΡΑΦΕΙΟ ΤΑΞΙΔΙΩΝ','ΚΑΡΑΤΑΣΟΥ 7-ΘΕΣΣΑΛΟΝΙΚΗ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(136,'FOULVIA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΣΣΙΩΠΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(137,'IBIS EL GRECO','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΕΤΕΩΡΩΝ 10','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(138,'ΔΑΡΑΜΟΥΣΚΑΣ ΑΝΑΣΤΑΣΙΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΣΙΔΑΡΙ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(139,'SKORDILIS PANAGIWTHS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΕΣΟΓΓΗ-ΠΟΤΑΜΙ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(140,'CAPO DI CORFU','-','-','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(141,'CORFU CRUISES','-','-','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(142,'ΚΑΝΟΥΛΑΣ Ι.Κ.Ε','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗ ΠΑΛ/ΤΣΑΣ 11-13','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(143,'ΒΛΑΣΕΡΟΣ ΦΙΛΙΠΠΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΣΙΔΑΡΙ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(144,'ΜΠΟΤΣΗΣ ΤΑΣΣΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΕΣΟΓΓΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(145,'PATRAS TRAVEL CORFU','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝΙΚΗΣ ΑΝΤΙΣΤΑΣΕΩΣ 4-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(147,'GREEN VIEW TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','2ο ΧΛΜ ΕΘΝΙΚΗΣ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(148,'CORFU GOLDEN TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','IPSOS, 49083 KERKYRA','2661093622','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(149,'STORK TOURS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΓ.ΓΕΩΡΓΙΟΣ ΑΡΓΥΡΑΔΩΝ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(150,'ΓΡΑΜΜΕΝΟΣ ΣΤΕΦΑΝΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(151,'ΠΛΩΤΙΝ ΚΕΡΚΥΡΑΣ ΕΠΕ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝ.ΠΕΛΕΚΑ ΑΛΕΠΟΥ, ΚΕΡΚΥΡΑ','2661022000','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(152,'ARONDA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΔΑΣΣΙΑ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(153,'ANTHIS TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΟΝΤΟΚΑΛΙ-ΚΕΡΚΥΡΑ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(154,'LEOPARD TRAVEL','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΡΟΔΑ-ΣΦΑΚΕΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(155,'AKVILA TRAVEL!','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΓ. ΓΕΩΡΓΙΟΣ ΑΡΓΥΡΑΔΩΝ - ΚΕΡΚΥΡΑ ','2662051679','ΚΑΒΒΑΔΙΑΣ ΚΩΝ. ΠΡΟΚΟΠΙΟΣ','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(156,'ΚΑΨΟΚΑΒΑΔΗΣ & ΣΙΑ Ο.Ε','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(157,'CORFU 4 ALL','I.K.E','ΚΑΒΟΣ-ΛΕΥΚΙΜΜΗ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(158,'ΚΕΡΚΥΡΑΙΚΕΣ ΚΡΟΥΑΖΙΕΡΕΣ Ν.Ε.','ΝΑΥΤΙΚΗ ΕΤΑΙΡΙΑ','ΚΑΒΟΣ ΛΕΥΚΙΜΜΗΣ','-','-','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(159,'OSCAR CORFU TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(160,'D.T.S.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ     ','ΚΑΖΑΝΤΖΙΔΗ & ΒΟΣΠΟΡΟΥ 13-ΗΡΑΚΛΕΙΟ ΚΡΗΤΗΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(161,'ΚΑΛΟΥΔΗΣ Ν. ΒΑΣΙΛΕΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΥΠΟΚΑΤΑΣΤΗΜΑ ΑΓΙΟΥ ΓΕΩΡΓΙΟΥ-ΑΡΓΥΡΑΔΕΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(162,'EASY BOOK-ΚΑΒΒΑΔΙΑΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΓ.ΓΕΩΡΓΙΟΣ-ΑΡΓΥΡΑΔΕΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(163,'DESTINATION SERVISES','TOYΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΚΤΗ ΚΟΝΔΥΛΗ 4,ΤΚ-18545','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(164,'TRAVEL 4 ALL','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΧΑΡΑΒΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(165,'ΒΛΑΣΕΡΟΣ ΚΩΝ/ΝΟΣ-SIDARI TRV','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΣΙΔΑΡΙ-ΚΕΡΚΥΡΑ (ΚΕΝΤΡΙΚΟ ΚΑΤ/ΜΑ)','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(166,'PANDIS TRAVEL MORAITIKA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΩΡΑΙΤΙΚΑ-ΚΕΡΚΥΡΑ-ΥΠΟΚ/ΜΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(167,'PAPANAGIOTOU TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΠΕΛΕΚΑΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(168,'HN TRAVEL-ΠΑΡΓΙΝΟΣ Δ ΧΑΡΙΔΗΜΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΠΕΡΙΘΕΙΑ-ΚΕΡΚΥΡΑ ΚΕΝΤΡΙΚΟ ΚΑΤ/ΜΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(170,'TP TRAVEL-ΠΑΝΔΗΣ ΑΝΤΩΝΗΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΠΕΡΑΜΑ-ΚΕΡΚΥΡΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(171,'PANDIS TRAVEL ΜΠΕΝ.(ΥΠΟΚ/ΜΑ 2)','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(172,'PANDIS TRAVEL ΜΠΕΝΙΤΣΕΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(173,'ΛΕΙΤΟΥΡΓΗΣ ΓΕΩΡΓ. ΝΙΚΟΛΑΟΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΥΛΙΩΤΕΣ-ΚΕΡΚΥΡΑ (ΚΕΝΤΡΙΚΟ)','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(174,'JUST IN TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','Μ.ΜΕΘΟΔΙΟΥ 10-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(175,'MED.BLUE-ΜΙΑΡΗΣ ΒΑΣΙΛΗΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ-ΥΠΗΡ.ΛΕΩΦ.','ΚΑΒΟΣ ΚΕΡΚΥΡΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(176,'TRAVEL-CO','ΓΡΑΦΕΙΟ ΓΕΝ. ΤΟΥΡΙΣΜΟΥ','ΣΠΥΡΟΥ ΠΕΡΟΥΛΑΚΗ-ΠΟΤΑΜΟΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(177,'PANDIS TRAVEL-GOUVIA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΓΟΥΒΙΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(178,'LEANDROS TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΧΑΡΑΒΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(179,'MADALENA GOUVIA TOURS','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΓΟΥΒΙΑ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(180,'VALUE PLUS TRAVEL-ΒΛΑΣΕΡΟΥ ΣΟΦΙΑ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΣΙΔΑΡΙ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(181,'OLYMPUS CORFU TRAVEL','ΤΟΥΡΙΣΤΙΚΕΣ ΕΠΙΧΕΙΡΙΣΕΙΣ','ΓΟΥΒΙΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(182,'THE TRAVEL CORNER','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΣΣΙΟΠΗ-ΚΕΡΚΥΡΑΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(183,'BANDOS TRAVEL','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΠΕΡΑΜΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(184,'EXECUTIVE SOLUTIONS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΙΩΑΝ.ΓΑΡΔΙΚΙΩΤΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(185,'ΧΡΥΣΙΚΟΠΟΥΛΟΣ ΧΑΡΑΛΑΜΠΟΣ','ΕΚΜ. ΤΟΥΡ. ΣΚΑΦΟΥΣ','ΚΑΒΟΣ ΛΕΥΚΙΜΜΗΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(186,'ΚΟΡΦΟΥ ΣΙΤΥ ΤΟΥΡΣ-ΤΟΥΡ. ΜΟΝΟΠΡΟΣΩΠΗ ΕΠΕ','ΥΠΗΡΕΣΙΕΣ ΓΡΑΦΕΙΩΝ ΟΡΓΑΝΩΜΕΝΩΝ ΤΑΞΙΔΙΩΝ','ΑΝΑΛΗΨΗ ΚΑΤΩ ΚΟΡΑΚΙΑΝΑΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(187,'TRADE GLOBAL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','2nd HIGH STREET-BRISTOL','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(188,'CORFU PRIVATE TRAVEL','TOΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΧΑΡΑΒΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(189,'PANDIS TRAVEL (ΥΠΟΚ.7- ΠΟΛΗΣ )','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','Ι.ΘΕΟΤΟΚΗ 128-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(190,'ΒΛΑΧΟΠΟΥΛΟΣ ΠΑΥΛΟΣ','ΓΡΑΦΕΙΟ ΓΕΝ. ΤΟΥΡΙΣΜΟΥ','ΜΩΡΑΪΤΙΚΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(191,'MARINE TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','Ι.ΘΕΟΤΟΚΗ 132','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(192,'ΣΥΡΙΩΤΗΣ ΣΠΥΡΙΔΩΝ','ΓΡΑΦΕΙΟ ΓΕΝ. ΤΟΥΡΙΣΜΟΥ-ΕΝΟΙΚ.ΑΥΤ/ΤΩΝ','ΑΧΑΡΑΒΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(193,'CORFU EXPRESS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΒΙΤΑΛΑΔΕΣ-ΓΑΡΔΕΝΟΣ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(194,'DESTINY CORFU','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΔΟΝΑΤΟΥ ΔΗΜΟΥΛΙΤΣΑ 82-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(195,'AUGUSTA TRAVEL-ΛΙΝΟΣΠΟΡΗΣ ΧΑΡΙΛΑΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΛ. ΒΕΝΙΖΕΛΟΥ 1-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(196,'A. ΠΑΝΔΗΣ & Σια Ο.Ε. - ΑΓ. ΓΟΡΔΙΟΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΑΓ. ΓΟΡΔΗΣ-ΚΕΡΚΥΡΑΣ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(197,'ΙΔΙΩΤΗΣ','ΙΔΙΩΤΗΣ','-','-','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(199,'TC in-Destination Tourism Hellas ΜΟΝΟΠΡΟΣΩΠΗ ΙΚΕ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΜΗΤΡΟΠΟΛΕΩΣ 26-28, 10563 ΑΘΗΝΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(200,'LET\'S BOOK TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΒΕΪΚΟΥ27, ΚΟΥΚΑΚΙ,ΑΘΗΝΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(201,'LUXURY TRAVEL DMC Ε.Π.Ε.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΔΑΝΑΙΔΩΝ 9, ΘΕΣ/ΝΙΚΗ','2310528922','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(202,'CORFU SUN TRAVEL','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΤΑΡΤΑΓΙΑ-ΔΑΣΙΑΣ-ΚΑΤΩ ΚΟΡΑΚΙΑΝΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(203,'ΤΖΟΙ ΚΡΟΥΙΖΙΣ ΝΕ','ΝΑΥΤΙΚΗ ΕΤΑΙΡΕΙΑ','ΝΕΟ ΛΙΜΑΝΙ ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(204,'ΚΑΠΑ ΚΟΡΦΟΥ - ΣΙΔΑΡΙ ΤΡΑΒΕΛ Α.Ε','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','Κ ΓΕΩΡΓΑΚΗ 31','2661034019','','accounts@kappavita.gr',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(205,'ΚΑΠΑ ΚΟΡΦΟΥ - ΣΙΔΑΡΙ ΤΡΑΒΕΛ Α.Ε - ΥΠ/ΜΑ','ΓΡΕΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΥΠΟΚ/ΜΑ ΕΛ. ΒΕΝΙΖΕΛΟΥ 32Α, ΚΕΡΚΥΡΑ','2661034400, 2661024127','','kappavita@kappavita.gr',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(206,'KARDAKARI - CORFU COMPASS ΥΠ/ΜΑ 4','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΑΓ. ΓΟΡΔΙΟΣ - ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(209,'KORINA TRAVEL-TΣΟΥΚΙΑ ΚΩΝ/ΝΑ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΚΑΒΟΣ-ΛΕΥΚΙΜΜΗ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(210,'TRIDENT-ΠΑΝΔΗΣ ΣΠΥΡΟΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΚΑΒΟΣ-ΛΕΥΚΙΜΜΗ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(211,'ΠΑΝΔΗΣ ΧΑΡΑΛ. ΘΕΟΔΩΡΟΣ','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΚΑΒΟΣ - ΚΕΡΚΥΡΑ','2662061037','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(217,'DAYTRIP4U','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','NICOSIA-CYPRUS','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(218,'CHARITOS TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΘΝ. ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 66','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(219,'SANDY TRAVEL-ΣΤΟΥΠΑΣ ΣΟΦΟΚΛΗΣ','ΤΟΥΡΙΣΤΚΟ ΓΡΑΦΕΙΟ','ΚΑΒΟΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(220,'PYRGI TRAVEL-ΤΡΙΒΙΖΑΣ','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΓΟΥΒΙΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(221,'BIG TRAVEL-BIBLO GLOBUS','ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΓΡΑΦΕΙΩΝ ΓΕΝ. ΤΟΥΡΙΣΜΟΥ','ΕΘΝ/ΚΗΣ ΠΑΛΑΙΟΚΑΣΤΡΙΤΣΑΣ 7-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(222,'ASK 2 TRAVEL','ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΤΑΞΙΔΙΩΤΙΚΩΝ ΠΡΑΚΤΟΡΕΙΩΝ','ΛΕΩΦ. ΣΥΓΓΡΟΥ 188, 17671 ΚΑΛΛΙΘΕΑ-ΑΘΗΝΑ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(223,'GRECIAN TRAVEL TOURIST ENTERPRISES A.E.','ΤΟΥΡΙΣΤΙΚΕΣ-ΞΕΝ/ΚΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ','ΑΠΟΛΛΩΝΟΣ 34-ΑΘΗΝΑ ΤΚ 10556','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(224,'TOURIST CLUB ΜΟΝΟΠΡΟΣΩΠΗ Ε.Π.Ε.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΟΜΗΡΟΥ 52- ΑΘΗΝΑ Τ.Κ. 10672','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(226,'DANAOS BLUE TRAVEL SERVISES S.A.','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','2ΧΛΜ Ε.Ο. ΠΕΛΕΚΑΣ-ΑΛΕΠΟΥ ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(227,'SPIN TOURS','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΠΕΡΑΜΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(228,'OLYMPUS CORFU TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΓΟΥΒΙΑ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(229,'TRAVEL POINT CORFU','ΥΠΗΡΕΣΙΕΣ ΤΟΥΡΙΣΤΙΚΟΥ ΓΡΑΦΕΙΟΥ','ΜΠΕΝΙΤΣΕΣ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(230,'MARIA\'S TOURIST SERVICES','ΕΝΟΙΚΙΑΣΕΙΣ ΑΥΤΟΚΙΝΗΤΩΝ-ΜΟΤΟΣΥΚΛΕΤΩΝ','ΑΓΙΟΣ ΓΕΩΡΓΙΟΣ ΠΑΓΩΝ-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(231,'MANO GRAIKIJA','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','GAISU G. 3A-3, ANTEZERIAI, VILNIAUS DSTR.','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(232,'CHRISTIAN TOUR-AMAZE HOLIDAYS','TOYΡΙΣΤΙΚΕΣ ΕΠΙΧΕΙΡΗΣΕΙΣ','ΕΘΝ. ΑΝΤΙΣΤΑΣΕΩΣ 18-ΚΕΡΚΥΡΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(233,'GRECA TRAVEL','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','ΕΛΕΥΘΕΡΙΟΥ ΒΕΝΙΖΕΛΟΥ 212, ΚΑΛΛΙΘΕΑ','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(234,'DISCOVERY TRAVEL LTD','ΓΡΑΦΕΙΟ ΓΕΝΙΚΟΥ ΤΟΥΡΙΣΜΟΥ','Liulin 8, str 328 No 10','','','',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(235,'AROUND CORFU-YEVGENIA RIGANA','ΤΟΥΡΙΣΤΙΚΟ ΓΡΑΦΕΙΟ','ΚΑΠΟΔΙΣΤΡΙΟΥ 106-ΚΕΡΚΥΡΑ','','','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Abbreviation` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (2,'PA','PAXOS - ANTIPAXOS',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(3,'BL','BLUE LAGOON',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(5,'','AQUALAND',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(9,'','SAFARI CRUISE',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(12,'','B.B.Q',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(15,'','GRAND ISLAND',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(17,'','CORFU BY NIGHT',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(18,'','GREEK NIGHT',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(22,'','CORFU BY DAY',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(23,'','ALBANIA',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(24,'CS','CORFU SUNSET CRUISE',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(25,'','OLYMPIC FLAME',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(26,'','OLYMPIC FLAME',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(27,'','CORFU BY NIGHT',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(28,'','CORFU DELIGHT',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(29,'','PARGA-PAXOS',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(30,'','MOONLIGHT',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(31,'','TRANSFER BLUE LAGOON',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(32,'','ALBANIA',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(34,'','TRANSFER',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(36,'','SCHOOL TRANSFER',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(37,'','KALYPSO STAR',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(38,'','AIRPORT TRANSFER',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(39,'','AQUALAND TRANSFER',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(40,'','BOOZE CRUISE',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(41,'','SCUBA DIVING',2,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(42,'','OLIKH NAYLOSH',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(43,'','SUNSET BLUE LAGOON',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(44,'PAC','PAXOS - ANTIPAXOS - SPACE SAFE',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(45,'BL','BLUE LAGOON-SPACE SAFE',1,'e7e014fd-5608-4936-866e-ec11fc8c16da');
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `drivers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Phones` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `IsDefault` tinyint(1) NOT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'STAMATIS','6972 771 185',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(2,'SELLAS ALEKOS','6906 624 374',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(3,'SCHERIA FOTIS MARK','6944 869 230',0,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(6,'SCHERIA NONTAS','6936 943 610',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(7,'SCHERIA SKORDILIS','6944 791 714',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(8,'-','',1,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(9,'MED BLUE VASILIS','6948 590 575',0,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(10,'SCHERIA ALEKOS','6932 413 447',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(11,'SELLAS NORTH','6944721735',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(12,'SELLAS KYRIAKOS','6986 670 108',0,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(13,'TAXI VASILIS','26620 22214',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(14,'SELLAS NORTH2','6944 721 735',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(15,'SCHERIA SPIROS','6934311713',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(16,'SCHERIAS TSAGKARIS','',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(17,'SELLAS NORTH 3','6944721735',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(18,'SCHERIA AIMILIOS','6936778419',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(19,'SCHERIA KOTINAS','',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(20,'SELLAS GIORGOS','694 87 50 672',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(21,'VASILIS NORTH','6938878924',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(22,'NORTH ΧΑΝΔΡΙΝΟΣ ΣΠΥΡΟΣ','6975580110',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(23,'MED.BLUE ARHS','6986080045',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(24,'ΤΣΙΡΙΓΓΩΤΗΣ','6973330223',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(25,'MERIANOS CHRISTOS','6937762673',0,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(26,'ΜΑΚΡΗΣ','6932474125',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(27,'KATSAROS','',0,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(28,'MALACHAS','',0,1,'e7e014fd-5608-4936-866e-ec11fc8c16da');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joineddestinationspickuppoints`
--

DROP TABLE IF EXISTS `joineddestinationspickuppoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `joineddestinationspickuppoints` (
  `DestinationId` int DEFAULT NULL,
  `PickupPointId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joineddestinationspickuppoints`
--

LOCK TABLES `joineddestinationspickuppoints` WRITE;
/*!40000 ALTER TABLE `joineddestinationspickuppoints` DISABLE KEYS */;
INSERT INTO `joineddestinationspickuppoints` VALUES (11,504),(11,364),(11,694),(11,503),(11,500),(11,536),(11,509),(11,523),(11,524),(11,526),(11,543),(11,535),(11,542),(11,537),(11,538),(11,539),(11,541),(11,683),(11,534),(11,527),(11,684),(11,507),(11,530),(11,531),(11,512),(11,529),(11,528),(11,515),(11,522),(11,532),(11,506),(11,525),(11,520),(11,533),(11,513),(11,516),(11,540),(11,510),(11,501),(11,502),(11,511),(11,508),(11,363),(11,544),(11,681),(11,518),(11,505),(11,514),(11,521),(11,519),(11,517),(11,551),(11,563),(11,562),(11,545),(11,549),(11,366),(11,550),(11,365),(11,552),(11,556),(11,557),(11,564),(11,559),(11,554),(11,555),(11,548),(11,547),(11,546),(11,558),(11,560),(11,561),(11,553),(11,565),(11,572),(11,576),(11,569),(11,570),(11,573),(11,581),(11,568),(11,575),(11,571),(11,577),(11,574),(11,582),(11,578),(11,580),(11,579),(11,584),(11,583),(11,567),(11,566),(11,471),(11,466),(11,476),(11,467),(11,461),(11,433),(11,432),(11,469),(11,458),(11,463),(11,472),(11,450),(11,451),(11,479),(11,477),(11,473),(11,434),(11,459),(11,439),(11,440),(11,441),(11,445),(11,454),(11,460),(11,438),(11,478),(11,437),(11,444),(11,464),(11,436),(11,446),(11,447),(11,455),(11,442),(11,452),(11,475),(11,468),(11,474),(11,457),(11,431),(11,449),(11,456),(11,465),(11,435),(11,470),(11,443),(11,462),(11,448),(11,453),(11,682),(11,493),(11,485),(11,488),(11,492),(11,494),(11,495),(11,497),(11,499),(11,491),(11,486),(11,487),(11,489),(11,490),(11,484),(11,482),(11,496),(11,498),(11,483),(11,480),(11,481),(11,382),(11,402),(11,416),(11,415),(11,394),(11,409),(11,390),(11,389),(11,411),(11,419),(11,381),(11,428),(11,430),(11,377),(11,425),(11,372),(11,391),(11,379),(11,414),(11,374),(11,429),(11,424),(11,380),(11,401),(11,383),(11,408),(11,393),(11,404),(11,396),(11,NULL),(11,403),(11,399),(11,376),(11,384),(11,385),(11,386),(11,397),(11,400),(11,406),(11,417),(11,423),(11,251),(11,392),(11,371),(11,373),(11,375),(11,426),(11,378),(11,422),(11,421),(11,398),(11,388),(11,412),(11,418),(11,420),(11,427),(11,405),(11,413),(11,407),(11,410),(11,387),(11,395),(2,82),(2,309),(2,335),(2,57),(2,73),(2,67),(2,328),(2,104),(2,62),(2,1),(2,17),(2,677),(2,275),(2,200),(2,355),(28,644),(28,710),(28,696),(28,713),(28,714),(28,716),(28,701),(28,706),(28,700),(28,690),(28,697),(28,658),(28,656),(28,649),(28,650),(28,653),(28,661),(28,662),(28,663),(28,666),(28,667),(28,668),(28,669),(28,671),(28,651),(28,645),(28,655),(28,659),(28,665),(28,660),(28,657),(28,648),(28,654),(28,646),(28,647),(28,652),(28,664),(28,670),(28,592),(28,591),(28,590),(28,589),(28,594),(28,596),(28,593),(28,587),(28,588),(28,586),(28,585),(28,595),(28,NULL),(28,598),(28,600),(28,626),(28,609),(28,617),(28,630),(28,631),(28,636),(28,705),(28,620),(28,698),(28,691),(28,625),(28,606),(28,632),(28,612),(28,637),(28,597),(28,621),(28,618),(28,613),(28,633),(28,623),(28,708),(28,707),(28,642),(28,640),(28,603),(28,611),(28,604),(28,614),(28,601),(28,616),(28,624),(28,627),(28,629),(28,634),(28,639),(28,699),(28,643),(28,615),(28,635),(28,610),(28,599),(28,608),(28,715),(28,602),(28,641),(28,628),(28,638),(28,619),(28,607),(28,622),(28,704),(2,270),(2,282),(2,277),(2,276),(2,330),(2,211),(2,210),(2,201),(2,167),(2,133),(2,48),(2,145),(2,177),(2,209),(2,131),(2,151),(2,354),(2,41),(2,61),(2,174),(2,349),(2,71),(2,205),(2,288),(2,289),(2,199),(2,27),(2,292),(2,678),(2,341),(2,83),(2,327),(2,55),(2,80),(2,79),(2,331),(2,346),(2,297),(2,69),(2,68),(2,306),(2,316),(2,60),(2,140),(2,686),(2,76),(2,685),(2,36),(2,687),(2,9),(2,14),(2,15),(2,161),(2,315),(2,299),(2,298),(2,31),(2,679),(2,312),(2,16),(2,188),(2,680),(2,325),(2,369),(2,74),(2,84),(2,308),(2,300),(2,307),(2,333),(2,329),(2,77),(2,26),(2,49),(2,78),(2,326),(2,332),(2,304),(2,323),(2,343),(2,34),(2,347),(2,293),(2,46),(2,337),(2,45),(2,38),(2,64),(2,103),(2,98),(2,96),(2,95),(2,86),(2,43),(2,13),(2,12),(2,8),(2,89),(2,348),(2,114),(2,6),(2,688),(2,702),(2,703),(2,59),(2,11),(2,18),(2,19),(2,20),(2,25),(2,313),(2,44),(2,334),(2,81),(2,110),(2,111),(2,112),(2,113),(2,295),(2,317),(2,291),(2,290),(2,33),(2,56),(2,353),(2,184),(2,220),(2,163),(2,91),(2,28),(2,85),(2,214),(2,127),(2,105),(2,189),(2,286),(2,287),(2,169),(2,142),(2,217),(2,97),(2,94),(2,204),(2,342),(2,215),(2,162),(2,40),(2,336),(2,709),(2,216),(2,303),(2,42),(2,122),(2,129),(2,5),(2,284),(2,100),(2,128),(2,281),(2,280),(2,53),(2,356),(2,7),(2,30),(2,339),(2,279),(2,278),(2,54),(2,274),(2,99),(2,273),(2,139),(2,47),(2,198),(2,144),(2,262),(2,269),(2,203),(2,141),(2,218),(2,267),(2,206),(2,268),(2,107),(2,263),(2,265),(2,264),(2,266),(2,221),(2,202),(2,219),(2,207),(2,186),(2,261),(2,294),(2,159),(2,222),(2,223),(2,143),(2,260),(2,712),(2,32),(2,182),(2,314),(2,130),(2,301),(2,150),(2,88),(2,370),(2,362),(2,92),(2,2),(2,302),(2,258),(2,256),(2,255),(2,183),(2,257),(2,344),(2,39),(2,93),(2,360),(2,357),(2,350),(2,109),(2,108),(2,87),(2,66),(2,165),(2,72),(2,121),(2,120),(2,75),(2,3),(2,4),(2,63),(2,51),(2,310),(2,21),(2,296),(2,213),(2,58),(2,23),(2,283),(2,50),(2,305),(2,22),(2,35),(2,324),(2,125),(2,147),(2,345),(2,285),(2,322),(2,24),(2,675),(2,271),(2,10),(2,272),(2,320),(2,173),(2,259),(2,185),(2,170),(2,168),(2,119),(2,212),(2,254),(2,237),(2,689),(2,676),(2,252),(2,137),(2,236),(2,361),(2,359),(2,180),(2,352),(2,146),(2,118),(2,253),(2,351),(2,190),(2,106),(2,116),(2,191),(2,358),(2,175),(2,123),(2,135),(2,134),(2,115),(2,152),(2,52),(2,132),(2,235),(2,102),(2,311),(2,178),(2,250),(2,70),(2,181),(2,224),(2,194),(2,248),(2,176),(2,157),(2,249),(2,247),(2,338),(2,246),(2,245),(2,244),(2,243),(2,233),(2,321),(2,187),(2,196),(2,90),(2,126),(2,154),(2,234),(2,226),(2,227),(2,124),(2,225),(2,208),(2,238),(2,318),(2,239),(2,673),(2,29),(2,101),(2,172),(2,195),(2,228),(2,232),(2,240),(2,241),(2,242),(2,171),(2,158),(2,117),(2,231),(2,160),(2,197),(2,340),(2,319),(2,136),(2,229),(2,193),(2,192),(2,179),(2,166),(2,164),(2,138),(2,230),(2,156),(2,65),(2,148),(2,149),(2,153),(2,155),(2,37),(2,NULL),(2,251),(1,82),(1,309),(1,335),(1,57),(1,73),(1,67),(1,328),(1,104),(1,62),(1,1),(1,17),(1,677),(1,275),(1,200),(1,355),(1,270),(1,282),(1,277),(1,276),(1,330),(1,211),(1,210),(1,201),(1,167),(1,133),(1,48),(1,145),(1,177),(1,209),(1,131),(1,151),(1,354),(1,41),(1,61),(1,174),(1,349),(1,71),(1,205),(1,288),(1,289),(1,199),(1,27),(1,292),(1,678),(1,341),(1,83),(1,327),(1,55),(1,80),(1,79),(1,331),(1,346),(1,297),(1,69),(1,68),(1,306),(1,316),(1,60),(1,140),(1,686),(1,76),(1,685),(1,36),(1,687),(1,9),(1,14),(1,15),(1,161),(1,315),(1,299),(1,298),(1,31),(1,679),(1,312),(1,16),(1,188),(1,680),(1,325),(1,695),(1,369),(1,74),(1,84),(1,308),(1,300),(1,307),(1,333),(1,329),(1,77),(1,26),(1,49),(1,78),(1,326),(1,332),(1,304),(1,323),(1,343),(1,34),(1,347),(1,293),(1,46),(1,337),(1,45),(1,38),(1,64),(1,103),(1,98),(1,96),(1,95),(1,86),(1,43),(1,13),(1,12),(1,8),(1,89),(1,348),(1,114),(1,703),(1,702),(1,688),(1,6),(1,81),(1,11),(1,18),(1,19),(1,20),(1,25),(1,44),(1,313),(1,59),(1,334),(1,110),(1,111),(1,112),(1,113),(1,295),(1,317),(1,291),(1,290),(1,33),(1,56),(1,353),(1,220),(1,184),(1,163),(1,28),(1,189),(1,214),(1,85),(1,91),(1,127),(1,286),(1,287),(1,105),(1,169),(1,142),(1,215),(1,204),(1,94),(1,97),(1,40),(1,336),(1,217),(1,342),(1,709),(1,162),(1,216),(1,303),(1,42),(1,122),(1,129),(1,284),(1,5),(1,128),(1,100),(1,30),(1,280),(1,339),(1,7),(1,53),(1,356),(1,281),(1,279),(1,278),(1,54),(1,99),(1,273),(1,274),(1,139),(1,47),(1,144),(1,262),(1,198),(1,269),(1,203),(1,141),(1,218),(1,268),(1,107),(1,206),(1,267),(1,266),(1,265),(1,264),(1,263),(1,202),(1,219),(1,207),(1,221),(1,186),(1,222),(1,261),(1,159),(1,143),(1,294),(1,223),(1,260),(1,712),(1,32),(1,182),(1,314),(1,130),(1,301),(1,150),(1,88),(1,255),(1,256),(1,183),(1,92),(1,2),(1,257),(1,362),(1,258),(1,370),(1,302),(1,93),(1,344),(1,39),(1,360),(1,357),(1,350),(1,109),(1,108),(1,87),(1,75),(1,3),(1,310),(1,296),(1,213),(1,165),(1,120),(1,72),(1,66),(1,63),(1,51),(1,4),(1,21),(1,121),(1,58),(1,23),(1,305),(1,283),(1,22),(1,35),(1,50),(1,147),(1,125),(1,345),(1,285),(1,324),(1,272),(1,24),(1,10),(1,322),(1,271),(1,675),(1,173),(1,320),(1,259),(1,185),(1,119),(1,168),(1,170),(1,212),(1,254),(1,237),(1,252),(1,689),(1,676),(1,361),(1,359),(1,236),(1,137),(1,118),(1,146),(1,352),(1,180),(1,190),(1,351),(1,253),(1,106),(1,191),(1,116),(1,358),(1,175),(1,123),(1,115),(1,135),(1,134),(1,52),(1,152),(1,178),(1,132),(1,311),(1,102),(1,250),(1,235),(1,194),(1,176),(1,181),(1,224),(1,247),(1,157),(1,70),(1,249),(1,248),(1,338),(1,246),(1,245),(1,244),(1,243),(1,227),(1,233),(1,226),(1,124),(1,196),(1,234),(1,187),(1,321),(1,90),(1,126),(1,154),(1,673),(1,239),(1,238),(1,225),(1,318),(1,208),(1,29),(1,241),(1,240),(1,232),(1,172),(1,228),(1,242),(1,101),(1,195),(1,171),(1,158),(1,231),(1,117),(1,160),(1,37),(1,138),(1,319),(1,340),(1,65),(1,164),(1,179),(1,148),(1,149),(1,192),(1,166),(1,197),(1,136),(1,156),(1,229),(1,230),(1,155),(1,153),(1,193);
/*!40000 ALTER TABLE `joineddestinationspickuppoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pickuppoints`
--

DROP TABLE IF EXISTS `pickuppoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pickuppoints` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RouteId` int NOT NULL,
  `Description` varchar(128) NOT NULL,
  `ExactPoint` varchar(128) NOT NULL,
  `Time` varchar(5) NOT NULL,
  `Coordinates` varchar(128) DEFAULT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `FK_PickupPoints_Routes` (`RouteId`),
  CONSTRAINT `pickuppoints_ibfk_1` FOREIGN KEY (`RouteId`) REFERENCES `routes` (`Id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pickuppoints`
--

LOCK TABLES `pickuppoints` WRITE;
/*!40000 ALTER TABLE `pickuppoints` DISABLE KEYS */;
INSERT INTO `pickuppoints` VALUES (844,28,'RESTIA SUITES','MAI ROAD','06:55','39.80549315087046,19.829987078349387',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(845,19,'ARION HOTEL','MAIN ROAD','08:10','39.6085812288308,19.92480039596558',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(848,22,'PALEO DISCO','MAIN ROAD','07:00','',1,'Maria'),(850,19,'SOPHIAS CORNER','MAIN ROAD','07:29','39.687623,19.838339',1,'Maria'),(851,29,'FOUNTAIN BAR','CROSSROAD','09:45','',1,'NICOLE'),(852,19,'DASSIA PHARMACY','MAIN ROAD','07:31','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(853,29,'SILVERSTONE GO CARTS','MAIN ROAD','09:44','',1,'NICOLE'),(854,28,'ANGELINA','MAIN ROAD - KALUA BAR','07:30','39.794461727875024,19.69951315783758',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(855,22,'VILLA MIRTO','MAIN ROAD','07:15','',1,'Maria'),(856,29,'SAN MARINA','MAIN ROAD','09:45','',1,'NICOLE'),(858,29,'CAPTAINS AG.PETROS','MAIN ROAD','09:44','',1,'NICOLE'),(859,29,'SCRIVAS','MAIN ROAD','09:44','',1,'NICOLE'),(861,28,'PANORAMA','SIDARI SCONTO MARKET','07:30','39.792619046820356,19.706992786104887',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(862,28,'SPIROS S/M SIDARI','MAIN ROAD','07:37','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(863,28,'TZORAS S/M ACHARAVI','MAIN ROAD','06:57','39.801974147310965,19.836413940283308',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(864,29,'EKATI HOTEL','OFFICE','09:45','',1,'NICOLE'),(865,29,'ISLAND HOLIDAYS','OFFICE','09:45','',1,'NICOLE'),(866,29,'LEMON GROVE','MAIN ROAD','09:45','',1,'NICOLE'),(867,22,'LAKONES JUNCTION','JUNCTION','07:00','',1,'Maria'),(870,22,'ERMONES BUS STOP','BUS STOP','07:05','',1,'Maria'),(871,22,'GLYFADA BUS STOP','BUS STOP','07:15','',1,'Maria'),(872,29,'PANDIS TRAVEL','OFFICE','09:45','',1,'NICOLE'),(873,32,'AKTI ARILLAS HOTEL','AKTI ARILLAS','07:00','',1,'Eva'),(875,28,'SUNRISE TAVERNA','MAIN ROAD','07:20','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(877,20,'CATHOLIC CHURCH MESSONGHI','MAIN ROAD','09:11','39.47657250919703,19.929338693618778',1,'Eva'),(878,19,'VIVA BAR','M.ROAD','07:31','',1,'Maria'),(880,28,'SUMMERTIME HOTEL','SAXOPHONE BAR','07:34','39.79460604810414,19.69710767269135',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(882,19,'CORFU MARE','MAIN ROAD','07:54','39.628176396384916,19.896599650383',1,'Maria'),(883,19,'NISSAKI KATERINA\'S S/M','MAIN ROAD','07:05','39.725532641157955,19.895934462547306',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(885,22,'GR.MEDITTERANNEO','HOTEL','07:05','',1,'Maria'),(886,28,'POTAMOS','CROSSROAD','07:30','39.78477917234618,19.717969894409183',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(887,20,'STARS STDS','M.ROAD','09:40','39.43128792558272,19.952070571809013',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(889,32,'NAFSIKA SAN STEFANO','M.ROAD','07:10','',1,'Eva'),(890,19,'BRETAGNE HOTEL','M.ROAD','08:20','39.61192875069881,19.91530537605286',0,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(891,19,'BUTCHERS CORNER PIRGI','MAIN ROAD','07:20','39.70628284863589,19.843454360961918',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(892,28,'FIRE STATION','M.ROAD','07:05','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(893,19,'MARGARITA DASSIA-IPSOS','M.ROAD','07:25','',1,'Maria'),(894,29,'NIKOS APTS AG.PETROS','M.ROAD','09:44','',1,'NICOLE'),(895,29,'OYLA APTS','CROSSROAD','09:45','',1,'NICOLE'),(897,32,'ATHINA','ASPA S/M','07:10','',1,'Eva'),(898,19,'KOMENO BAY','EVA P. CROSSROAD','07:38','39.6651416,19.8542106',1,'Maria'),(899,28,'BOSTONIA VILLAGE','TZORAS S/M','07:00','39.80197528370331,19.836239218711857',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(900,32,'MARINA ARILLAS','M.ROAD','07:00','',1,'Eva'),(901,22,'PHILOXENIA','BRIDGE','07:05','',1,'Maria'),(902,22,'OCEANIS','M.ROAD','07:00','',1,'Maria'),(903,20,'AKTI PERAMA','M.ROAD','08:30','39.482091332575834,19.923878561826196',0,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(905,19,'KIRKI TAVERNA','M.ROAD','07:31','',1,'Maria'),(906,19,'PRIMAVERA HOTEL','M.ROAD-OPPOSITE','07:35','39.67282123617335,19.839608073234558',1,'Maria'),(907,28,'LAGOON','M.ROAD','07:30','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(908,19,'CORFU RESIDENSE','M.ROAD','07:06','39.72546250161387,19.892506599426273',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(909,28,'GIANNIS RENT A BIKE KASSIOPI','M.ROAD','06:40','39.787924419967645,19.918357729911808',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(910,22,'PALEO CAMPING','MAIN ROAD','07:00','',1,'Maria'),(911,29,'MORFEAS HOTEL','M.ROAD','09:45','',1,'NICOLE'),(912,28,'SIDARI MIMOZA','M.ROAD','07:30','39.79243809460396,19.70586717873374',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(913,28,'RODA BP','M.ROAD','07:06','39.78643631942038,19.79472398757935',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(914,28,'ALMYROS NATURA','HOTEL','06:55','39.8077942786189,19.83143270015717',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(915,22,'PALEO INN','HOTEL','07:00','',1,'Maria'),(916,32,'ROMANZA HOTEL ST.STEFANO','HOTEL','07:10','',1,'Eva'),(917,20,'PERIVOLI GAS STATION','M.ROAD','09:40','39.42508442456661,20.002015829086307',1,'Eva'),(918,22,'ODYSSEUS','M.ROAD','07:00','',1,'Maria'),(919,28,'NIKOS SUPERMARKET','M.ROAD','06:40','39.782870518174946,19.92371141910553',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(920,28,'ALKION','M.ROAD','07:30','39.792050535946956,19.70179080963135',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(921,28,'ANDROMEDA HOTEL','HOTEL','07:30','39.786015853045996,19.68210875988007',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(922,20,'GOLDEN SUNSET BUKARI','M.ROAD','09:00','',1,'Eva'),(923,28,'RODA TAXI RANK','M.ROAD','07:09','39.78714922253394,19.789154650443518',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(924,22,'SPIROS TAVERNA','M.ROAD','07:00','',1,'Maria'),(925,28,'MICHELANGELO KASSIOPI','NIKOS SUPERMARKET','06:40','39.782870518174946,19.92371141910553',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(926,32,'THEO HOTEL PAGOI','HOTEL','06:50','',1,'Eva'),(927,22,'FAROS','M.ROAD','07:00','',1,'Maria'),(928,28,'OLGA','M.ROAD','07:30','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(931,28,'SUNNY CORFU SIDARI','M. ROAD','07:30','39.79102418256839,19.69811618328095',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(932,28,'SIDARI SCONTO MARKET','M. ROAD','07:30','39.79233082256098,19.704810976982117',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(933,29,'KAVOS PLAZA','M.ROAD','09:45','',1,'NICOLE'),(935,28,'PARADISE BAR','M. ROAD','07:29','39.79045535361871,19.70877528190613',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(936,32,'COSTAS GOLDEN BEACH-PAGOI','MAIN GATE','06:50','',1,'Eva'),(940,29,'YIANETTA','M. ROAD','09:44','',1,'NICOLE'),(941,22,'PALEO ART NOUVEAU','M. ROAD','07:00','',1,'Maria'),(942,19,'ARITI','M. ROAD','08:10','39.593019326693025,19.918819069862366',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(943,29,'SOCRATIS','M.ROAD','09:44','',1,'NICOLE'),(944,20,'MAYFLOWER','EKO-MORAITIKA','09:10','',1,'Eva'),(945,19,'BARBATI CHURCH','MAIN ROAD','07:15','39.71920329151425,19.869031906127933',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(946,19,'CORFU PALACE','M. ROAD','08:10','39.61878033392963,19.92303013801575',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(947,19,'BRETANIA HOTEL','M. ROAD','08:20','39.61190395483556,19.915230274200443',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(948,19,'IPSOS ΔΗΜΑΡΧΕΙΟ','MAIN ROAD','07:20','39.69845898670079,19.838595760498322',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(949,29,'KYANEA','MAIN ROAD','09:44','',1,'NICOLE'),(950,29,'SEA SIDE','MAIN ROAD','09:44','',1,'NICOLE'),(951,19,'EKO DASSIA','EKO DASSIA','07:20','39.6869859333045,19.838330151953524',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(952,29,'SUNRISE','M.ROAD','09:44','',1,'NICOLE'),(953,19,'TILEMACHOS HOTEL','MAIN ROAD','07:35','39.67331258611935,19.83937203884125',1,'Maria'),(954,19,'TARTAYIA BAR','M.ROAD-APENANTI','07:30','39.6824163792293,19.83761787414551',1,'Maria'),(956,20,'TSAKI','TSAKI-SPIROS BIKES','08:55','39.528816419068114,19.921752682303374',1,'Eva'),(957,29,'CAPO DI CORFU','M.GATE','09:44','',1,'NICOLE'),(958,28,'MARE BLUE = BLUE BAY','HOTEL','06:50','39.81294936478792,19.865169525146484',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(959,19,'RIVIERA BARBATI','MAIN ROAD','07:15','39.719194,19.869231',1,'Maria'),(960,20,'ALEXANDROS','M.ROAD','08:40','39.57918221119962,19.913122057914737',1,'Eva'),(963,31,'KAVOS JETTY','-','10:00','',1,'Maria'),(964,31,'LEFKIMMI PORT','-','09:45','',1,'Maria'),(965,29,'IONIAN SEA VIEW','M.ROAD','09:45','',1,'NICOLE'),(966,29,'CHANDRIS S/M','M. ROAD','09:45','',1,'NICOLE'),(967,29,'CORFU SEA GARDENS','M. ROAD','09:45','',1,'NICOLE'),(968,29,'ASPIOTIS','OFFICE','09:45','',1,'NICOLE'),(969,29,'ASPROKAVOS S/M','M. ROAD','09:45','',1,'NICOLE'),(970,20,'ANNITA HTL','M.ROAD','08:35','39.58611971816607,19.910745620727543',1,'Eva'),(972,20,'PERAMA KIOSK','OASIS','08:40','39.58117919290795,19.913154244422913',1,'Eva'),(973,20,'LINIA BP','M.ROAD','09:30','39.44348812354449,19.94172946452493',1,'Eva'),(974,20,'KAIZER BRIDGE','M.ROAD','08:50','39.563381597670364,19.910122092732188',1,'Eva'),(975,22,'SINARADES','BUS STOP-CROSSROAD','07:45','',1,'Maria'),(976,22,'PALEOKASTRITSA HOTEL','MAIN ROAD','07:00','',1,'Maria'),(977,22,'AMPELAKI','RESTURANT LA CALM','07:00','',1,'Maria'),(978,19,'MAGGIOROS S/M','M.ROAD','07:28','39.69002466069578,19.83760178089142',1,'Maria'),(981,20,'PONTIKONISI HTL','M.ROAD','08:40','39.584689275950645,19.91429150104523',1,'Eva'),(984,22,'MICHALIS TAVERNA','M.ROAD','07:10','',1,'Maria'),(986,19,'AKTI BARBATI APPTS','M.ROAD','07:15','39.71579081310867,19.864220023155216',1,'Maria'),(988,19,'DASSIA BEACH','JOY S/M','07:29','39.68204894778133,19.837456941604618',1,'Maria'),(989,19,'HELLENIC OFFICE','KANALIA (NEXT TO TUI OFFICE)','08:00','',1,'Maria'),(990,28,'SPIROS SUPERMARKET','M.ROAD','07:04','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(991,20,'BELLOS BEACH HOTEL','M.ROAD','08:55','39.526031758315064,19.922761515544046',1,'Eva'),(992,28,'SALVANOS S/M','M.ROAD','07:00','39.79468436068705,19.820086956024173',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(994,20,'COCA COLA','M.ROAD','08:35','39.59033879391593,19.894239462113735',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(995,20,'CHURCH - ST.GEORGE\'S','M. ROAD','09:40','39.42541126403798,19.95320964661165',1,'Eva'),(997,20,'PASSAS STD','BENITSES PORT','08:50','',1,'Eva'),(998,20,'ELEANA APTS','M.ROAD','09:40','39.42969214981488,19.95028138160706',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(999,19,'EVA PALACE','EVA PALACE CROSSROAD','07:38','39.66609475822976,19.85562086105347',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1000,28,'SIDARI VILLAGE','LAGOON','07:30','39.7915064469065,19.70510601997376',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1002,19,'SAN MARCO','MINI MARKET','07:19','39.70849901476611,19.842596054077152',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1003,19,'AB VASILOPOYLOS KONTOKALI','M.ROAD','07:45','39.644354136277705,19.85363602638245',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1005,28,'PIXEL (SPORT CENTER)','M.ROAD','07:01','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1006,20,'GRANDE MARE = COSTA BLUE','M.ROAD','08:50','39.5608175156743,19.91074994797698',1,'Eva'),(1007,22,'LIAPADES BEACH','HOTEL - TAVERNA','07:10','',1,'Maria'),(1008,20,'TZEVENOS','M.ROAD','09:40','39.42826987864351,19.948928749975035',1,'Eva'),(1009,20,'ANANIAS','BLUE SEA-MAIN ROAD','09:40','39.42551848362576,19.95121279848928',1,'Eva'),(1010,19,'VIROS CROSSROAD','M.ROAD','08:05','',1,'Maria'),(1011,28,'NSK OFFICE RODA','OFFICE','07:05','39.78889311078403,19.788013100624088',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1013,20,'ST.GEORGE HTL','BARBAYIANNIS','09:40','39.423894240924085,19.960969668720505',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1015,20,'PANORAMA REST.AG.GEORGIOS','M.ROAD','09:40','39.42614522284321,19.944965243339542',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1016,20,'ARGYRADES','KIOSK','09:40','39.43618471308516,19.976422190666202',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1017,20,'ONEIRO VILLAS','M.ROAD 200m AFTER REGENCY','09:00','39.51557069777342,19.924123708979494',1,'Eva'),(1018,20,'BP MESSONGHI','CROSSROAD FOR AG.MATHEOS','09:20','39.47483287095038,19.912037522323683',1,'Eva'),(1020,19,'PARAMITHOUPOLI','M.ROAD','07:45','39.64488649273263,19.859414564067084',1,'Maria'),(1021,20,'MARATHIAS','M.ROAD BUS STOP','09:35','39.4285775,19.9951761',1,'Eva'),(1022,28,'THREE LITTLE PIGS','MAIN ROAD','07:31','39.79214138128412,19.70261528709018',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1023,19,'VILLA ANNA CASTELLO','EKO DASSIA','07:20','',1,'Maria'),(1025,20,'GOLDEN SAND','M.ROAD','09:40','39.42523722609506,19.95416436261219',1,'Eva'),(1027,20,'BLUE SEA HTL','M.ROAD','09:40','39.4255728703101,19.95087065846085',1,'Eva'),(1028,28,'ALMYROS VILLAS RESORT','MAIN GATE','07:00','39.799098477448595,19.82900040229109',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1029,22,'PINK PALACE','PINK PALACE','07:45','',1,'Maria'),(1031,19,'MARILENA HOTEL','M.ROAD','07:16','39.70827616329067,19.843803048133854',1,'Maria'),(1032,22,'BELVEDERE APPTS AG.GORDIS','M.ROAD','07:45','',1,'Maria'),(1035,22,'AQUALAND VILLAGE','M.ROAD','07:25','',1,'Maria'),(1037,28,'RODA CROSSROAD','CROSSROAD','07:07','39.786874958688365,19.78920219980073',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1038,20,'AEGLI HOTEL','PONTIKONISI','08:40','39.58571043280224,19.914393424987797',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1040,28,'ACHARAVI PUMP','M.ROAD','07:01','39.792071145295694,19.816229939460754',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1041,20,'KARINA HOTEL','M.ROAD','08:55','39.53361638654475,19.9190765619278',1,'Eva'),(1042,20,'LORD TRAVEL','M.ROAD','09:40','39.424519912995166,19.958198741255067',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1043,20,'EL GRECO','M.ROAD','08:50','39.55877858926616,19.91123296393497',1,'Eva'),(1044,20,'ALAMANOS','M. ROAD','09:00','',1,'Eva'),(1045,19,'KOTSOVOLOS','M.ROAD','07:55','39.62444539501614,19.89109039306641',1,'Maria'),(1046,19,'HELLENIS','M.ROAD','08:10','39.59390394819019,19.916694760322574',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1047,19,'LA RIVIERA','M.ROAD','07:14','39.719223922671894,19.86914455890656',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1048,22,'PARADISE FUN CLUB','M. ROAD - KIOSK','07:30','',1,'Maria'),(1049,19,'KONTOKALI - AB BASILOPOULOS','TRAFFIC LIGHTS','07:43','39.6436116,19.8529911',1,'Maria'),(1050,20,'ALKIONIS','M.ROAD','09:10','39.48439387380603,19.92499887943268',1,'Eva'),(1053,28,'SIDARI ELIN','M.ROAD','07:38','39.782685009007075,19.70827102661133',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1054,19,'AKROGIALI','RESTAURANT','07:15','39.720151,19.874266',1,'Maria'),(1055,20,'FRINIE','M.ROAD','08:45','39.57302087062317,19.91144736598792',1,'Eva'),(1056,20,'OASIS HOTEL','BUS STOP','08:40','39.58002152936207,19.913197159767154',1,'Eva'),(1057,20,'KAFESAS','RESTAURANT','09:40','39.4242551466998,19.95899271243499',1,'Eva'),(1058,20,'MALTA','RESTAURANT','09:40','',1,'Eva'),(1059,20,'VERONIKA','MAIN ROAD','09:00','',1,'Eva'),(1060,20,'TAXI MESSONGHI','TAXI STATION','09:15','39.47876291118928,19.927091002464298',1,'Eva'),(1061,20,'COOP SUPERMARKET','MAIN ROAD','09:10','39.48581810387342,19.924982786178592',1,'Eva'),(1062,20,'AG.GEORGIOS - CROSSROAD','CROSSROAD','09:40','39.442704634722325,19.95511898271196',1,'Eva'),(1063,19,'IONIAN ARCHES','POST OFFICE','07:39','39.6606665,19.8396371',1,'Maria'),(1064,28,'ANGELA  BEACH','HOTEL','07:15','39.794175112572745,19.76324116328824',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1066,28,'IONIAN PRINCESS','PUMP','07:00','39.792071145295694,19.816229939460754',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1069,19,'GOVINO BAY','PARK HTL M.ROAD','07:40','39.658337,19.8381531',1,'Maria'),(1070,19,'GEORGIA APARTMENTS','EKO DASSIA','07:20','39.68707309378835,19.83829379081726',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1071,28,'ROBOLLA BEACH','M.GATE RODA BEACH','07:10','39.795286858903985,19.78094179183245',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1072,19,'MATHRAKI DINOS','JET OIL','07:41','39.654686141761985,19.840576168701674',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1073,19,'KIOSK GOUVIA','KIOSK GOUVIA','07:42','39.652321810681244,19.841834306716922',1,'Maria'),(1074,20,'ROSSIS','M.ROAD','09:11','39.47721017587317,19.921941161155704',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1075,28,'FARMAKEIO ACHARAVI - ΔΗΜΗΤΡΑ S/M','M.ROAD','07:02','39.79115196233764,19.814513325691227',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1076,28,'BEIS BEACH','SPIROS SM','07:00','39.794787403423406,19.816036820411686',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1077,28,'CORYFO VILLAGE','SALVANOS SUPER MARKET','07:00','39.79466787383488,19.820097684860233',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1079,22,'AG.GORDIS HTL=MAYOR LA GROTTA VERDE','HOTEL','07:45','',1,'Maria'),(1080,22,'AKROTIRI','M.ROAD','07:00','',1,'Maria'),(1081,19,'CAPTAINS','CAPTAINS BAR','07:15','39.71983047594857,19.872652888298038',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1082,19,'PAVLOS STUDIOS','EKO DASSIA','07:20','',1,'Maria'),(1083,19,'IPSOS BEACH HTL','M.ROAD','07:21','39.697073,19.838188',1,'Maria'),(1084,19,'PIRGI HOTEL','KREOPOLIO M.ROAD','07:20','',1,'Maria'),(1085,19,'JET OIL','M.ROAD','07:41','39.65481229501845,19.84042882919312',1,'Maria'),(1086,19,'DIELLAS MARKET','M.ROAD','07:42','39.65208638712216,19.8421186208725',1,'Maria'),(1087,19,'PANTOKRATOR HTL','M.ROAD','07:14','39.720164696903026,19.874289035797123',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1089,19,'EYTERPE','KONTOKALI HTL M.GATE','07:45','39.64848885020234,19.859268665313724',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1090,19,'ROUVAS APTS','ROUVAS RESTAURANT','07:45','39.64450697226194,19.855030775070194',1,'Maria'),(1091,20,'BUKARI','PORT','09:00','',1,'Eva'),(1093,20,'AQUARIUS','BUS STOP','09:11','39.475446226502356,19.93454217910767',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1094,20,'EKO MORAITIKA','M.ROAD','09:10','39.483275998379966,19.92481112480164',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1095,20,'BELLA GRECIA','M.ROAD','09:10','39.48386806056607,19.924955964088443',1,'Eva'),(1097,20,'ATTIKA BEACH','RECEPTION','09:40','39.43825078138391,20.04559137272198',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1099,20,'BLUE DIAMOND','M.ROAD','09:40','39.42581786884768,19.948360919952396',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1100,20,'SANDY BEACH','HOTEL','09:30','39.432931774203574,19.942749206121853',1,'Eva'),(1103,20,'FARMAKEIO MORAITIKA','M.ROAD','09:10','39.485346123884874,19.924886226654056',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1104,20,'THEODOROS TAVERNA(GREEN BUS ST','M.ROAD','08:55','39.524584042307886,19.922842383384708',1,'Eva'),(1106,20,'BENITSES KIOSK','M.ROAD','08:50','39.54641191968671,19.91350293159485',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1107,20,'CORFU MARIS','MAIN ROAD','08:50','39.539523702594664,19.91701051735745',1,'Eva'),(1108,20,'APOLLO PALACE','M.GATE','09:11','39.47672933847517,19.932277748108117',1,'Eva'),(1109,20,'GEMINI','HOTEL','09:11','39.477213798962595,19.932808823067127',1,'Eva'),(1110,20,'MESSONGHI BEACH','TAXI STATION','09:15','39.47839853908093,19.92753088474274',1,'Eva'),(1111,20,'MARGARITA','TAXI STATION','09:15','39.486161736411326,19.92518663406372',1,'Eva'),(1113,20,'DELFINIA','BUS STOP','09:09','39.48815673815567,19.926028106491458',1,'Eva'),(1114,20,'MIRAMARE BEACH','M.ROAD','09:09','39.49098845557718,19.92708503027048',1,'Eva'),(1115,20,'CORFU VILLAGE','M.ROAD','09:05','39.50726445376603,19.923775220735312',1,'Eva'),(1116,20,'MARBELLA','M.ROAD','09:05','39.5089075713531,19.923614271212802',1,'Eva'),(1117,20,'CORFU SENSES=MARE MONTE','M.ROAD','09:00','39.51211919529205,19.923029374979276',1,'Eva'),(1118,20,'NERAIDA ONEIRO','M.ROAD','09:00','',1,'Eva'),(1119,20,'PRIMASOL IONIAN SUN = REGENCY','M.ROAD','09:00','39.51641544136896,19.92407619953156',1,'Eva'),(1120,20,'BELVEDERE','M.ROAD BUS STOP','08:55','39.522121459255146,19.922691608293295',1,'Eva'),(1122,20,'POTAMAKI','MAIN ROAD','08:50','39.544173492177016,19.9144249430715',1,'Eva'),(1123,20,'AEOLOS BEACH','M.ROAD','08:45','39.56843504301148,19.909188943571444',1,'Eva'),(1124,22,'AG. GORDIOS','BUS STOP','07:45','',1,'Maria'),(1125,19,'CORFU HOLIDAY','M.GATE','08:10','39.61792074301297,19.922158907685628',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1126,19,'DIVANI','M.ROAD','08:10','39.598789831639024,19.921656847000126',1,'Maria'),(1127,19,'MON REPO HTL','HOTEL','08:10','39.60999051393664,19.92757916450501',1,'Maria'),(1128,19,'CAVALIERI','HOTEL','08:10','39.62117698821121,19.923915266990665',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1129,22,'PELEKAS BEACH','RECEPTION','07:25','',1,'Maria'),(1130,19,'KERKYRA GOLF','M.ROAD BUS STOP','07:50','39.63174376889772,19.882888161158256',1,'Maria'),(1131,19,'KONTOKALI BAY','M.GATE','07:45','39.648468197900044,19.859241843223575',1,'Maria'),(1132,19,'CORFU IMPERIAL','M.GATE','07:39','39.66719730132942,19.85939204692841',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1133,19,'SPITI PRIFTI','MAIN ROAD - OPPOSITE','07:42','39.647856886958635,19.846512079238895',1,'Maria'),(1134,19,'POPI STAR','SPITI PRIFTI','07:42','39.65110751214785,19.845337271690372',1,'Maria'),(1135,19,'MOLFETA','SPITI  PRIFTI','07:42','39.652627447088236,19.844189286231998',1,'Maria'),(1136,19,'DEBONO','DIELLAS','07:42','39.64834428395679,19.84360992908478',1,'Maria'),(1137,19,'CORKYRA BEACH','JET OIL','07:41','39.65493619736881,19.84035909175873',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1138,19,'PARADISE','JET OIL','07:41','39.65478338443808,19.840461015701297',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1139,19,'PARK HOTEL','M.ROAD','07:40','',1,'Maria'),(1140,28,'GELLINA MARE','M.ROAD','07:00','39.79667099744096,19.82244729995728',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1141,22,'GLYFADA VILLA','M.GATE GLYFADA HTL','07:15','',1,'Maria'),(1142,22,'GLYFADA BEACH H','BUS STOP','07:15','',1,'Maria'),(1143,19,'NEFELI','M.GATE DAPHNILA','07:35','39.6649971,19.8481875',1,'Maria'),(1144,19,'DAPHNILA BAY','M.GATE','07:35','39.6663103,19.8483645',1,'Maria'),(1145,28,'GELLINA VILLAGE','M.GATE','06:59','39.79765605123094,19.823487997055057',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1146,28,'ACHARAVI BEACH','SALVANOS SUPER MARKET','07:00','39.79468023897436,19.820086956024173',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1147,28,'CENTURY RESORT','PUMP','07:00','39.79200107348475,19.816224575042725',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1148,19,'MAGNA GRECIA','BUS STOP','07:32','39.67473706830992,19.839318394660953',1,'Maria'),(1149,19,'LIVADI NAFSIKA','CORFU CHANDRIS','07:31','39.67744969663652,19.83915209770203',1,'Maria'),(1150,19,'DASSIA CHANDRIS','M.ROAD','07:31','39.679534673393285,19.838470816612244',0,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1151,19,'CORFU CHANDRIS','M.ROAD','07:31','39.68005074703087,19.838266968727115',0,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1152,28,'BLUE BAY APARTMENTS','PIXEL/FB TRAVEL','07:00','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1154,19,'ELEA BEACH','BUS STOP','07:29','39.685351632175994,19.83789682388306',1,'Maria'),(1155,22,'BLUE PRINCESS = ELLY BEACH','HOTEL','07:10','',1,'Maria'),(1156,19,'NAUTILUS','M.ROAD','07:15','39.718613237793235,19.867224097251896',1,'Maria'),(1157,19,'BARBATI BAY','M.ROAD','07:15','39.71765593710137,19.86632823944092',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1158,28,'RODA BEACH','RECEPTION','07:10','39.79548856272341,19.778484108823505',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1159,28,'MIRABELL','HOTEL','07:11','39.79630417464208,19.77344334125519',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1160,19,'NISSAKI BEACH','HOTEL','07:05','39.73142823364359,19.920149445533756',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1161,19,'SUNSHINE','M.ROAD','07:05','39.7268075180835,19.905161261558536',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1163,28,'REBECCA VILLAGE','MAIN ROAD - BRIDGE','07:26','39.77928391896437,19.7198098897934',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1167,19,'HOSPITAL','TRAFFIC LIGHTS','07:45','39.64463657116461,19.850555609924577',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1168,29,'NAOS','OFFICE','09:45','',1,'NICOLE'),(1169,22,'PALEO POLICE','MAIN ROAD','07:00','',1,'Maria'),(1171,28,'KANAL D\'AMOUR','CORFIOT OFFICE','07:30','39.79449888337257,19.699473381042484',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1173,28,'SAXOPHONE BAR','MAIN ROAD','07:34','39.79456895263904,19.697697758674625',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1174,28,'CORFIOT OFFICE KANALI','OPPOSITE ANGELINA','07:33','39.794527735432105,19.699462652206424',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1175,32,'BELLE HELENE','MAIN ROAD','06:50','',1,'Eva'),(1177,19,'ROYAL BOUTIQUE','MAIN ROAD','08:10','39.59263075106277,19.917343854904175',1,'Maria'),(1178,19,'KIOSK ANALIPSI','KIOSK','07:21','',1,'Maria'),(1181,22,'ERMONES BRIDGE','BRIDGE','07:05','',1,'Maria'),(1182,28,'POLYXENI','MAIN ROAD','07:30','39.79224014172259,19.692907333374027',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1183,32,'ALKYON HOTEL','MAIN ROAD','06:50','',1,'Eva'),(1184,32,'DIKTIA AG. GEORGIOS','MAIN ROAD','06:50','',1,'Eva'),(1185,28,'KASSIOPI PUMP','PUMP','06:40','39.78881891367194,19.920648336410526',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1187,22,'ARIS SUPERMARKET','MAIN ROAD','07:00','',1,'Maria'),(1188,20,'CORFU LIDO SUN','MAIN ROAD','08:55','39.52527919802662,19.922729730606083',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1189,28,'DAMIA HOTEL','MAIN ROAD','07:36','39.78616425323624,19.687773585319523',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1192,29,'MEDITERRANEAN BLUE','HOTEL','09:45','',1,'NICOLE'),(1193,19,'ATLANTIS','MAIN ROAD','07:55','39.62563123896577,19.911378622055057',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1194,28,'AK NEW OFFICE','M.ROAD','07:32','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1195,28,'SUNSHINE(MELITSA)','MAIN ROAD','07:30','39.793431199479755,19.694452075132336',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1196,19,'SAN ANTONIO = ADONIS KALAMI','MAIN ROAD','06:45','39.744533703146224,19.93407011032105',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1197,20,'PANTHEON','MAIN ROAD','09:11','39.47756575532039,19.933077165266027',1,'Eva'),(1199,22,'MOUCHAS CORNER','M. ROAD','07:25','',1,'Maria'),(1200,20,'VERYCOCO','MAIN ROAD','09:10','39.48048899459971,19.924998065451316',1,'Eva'),(1201,22,'GRAND HOTEL GLYFADA','MAIN GATE','07:15','',1,'Maria'),(1202,32,'ASPA S/M','MAIN ROAD','07:05','',1,'Eva'),(1203,22,'LIAPADES CEMETARY','MAIN ROAD','07:10','',1,'Maria'),(1204,28,'GOUDELIS','MAIN ROAD','07:40','39.77446438959849,19.71227288246155',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1205,32,'ARILLAS ARKOKAL','MAIN ROAD','07:00','',1,'Eva'),(1206,28,'ABC SWEETHOME','MAIN ROAD','07:30','39.78624257542984,19.723709821701053',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1207,28,'CHRISMOS HOTEL','MAIN ROAD - BUS STOP','06:45','39.79626295847498,19.88533437252045',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1208,32,'AGG PAGI DIKTIA','MAIN ROAD','06:50','',1,'Eva'),(1209,28,'MUSEUM ACHARAVI','MAIN ROAD','07:00','39.78895488559324,19.809404685451305',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1211,32,'DIONYSSOS','MAIN ROAD','07:00','',1,'Eva'),(1212,32,'GOLDEN BEACH','MAIN ROAD','06:50','',1,'Eva'),(1213,29,'ISLAND BEACH','MAIN ROAD','09:45','',1,'NICOLE'),(1214,28,'APRAOS HOTEL','MAIN ROAD','06:40','39.79679052354835,19.890452027320865',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1215,19,'SOFIA VRADI OFFICE IPSOS','MAIN ROAD','07:20','',1,'Maria'),(1217,20,'AURORA','MAIN ROAD','09:01','39.516034713132704,19.924140572547913',1,'Eva'),(1218,19,'ARTION','BUS STOP','07:31','39.685070910145186,19.83765006065369',1,'Maria'),(1219,20,'DIMITRA SUPERMARKET LEFKIMMI','MAIN ROAD','09:40','39.4222046305038,20.044686350870037',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1220,28,'SIDARI LEGENDS','MAIN ROAD','07:28','39.787053040997776,19.708331372045382',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1221,19,'CLUB MEDITERANEE','MAIN ROAD','07:20','39.692010189255555,19.837977290153507',1,'Maria'),(1223,19,'DALIA HOTEL','MAIN ROAD','08:20','39.612060995152845,19.917107820510868',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1224,22,'LIAPADES BUS STOP','BUS STOP','07:10','',1,'Maria'),(1225,28,'PALMAR HOTEL','MAIN ROAD','07:30','39.79367453370144,19.694929718971256',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1226,32,'BARRAS HOTEL','MAIN ROAD','07:10','',1,'Eva'),(1227,29,'KAVOS TAXI STATION','MAIN ROAD','09:45','',1,'NICOLE'),(1228,28,'HN TRAVEL RODA','OFFICE','07:08','39.78863707050628,19.788267786973577',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1230,20,'ST.STEFANO - CROSSROAD','CROSSROAD','08:45','39.55466333210965,19.912118262726246',1,'Eva'),(1231,20,'MUSES SEA VEIW','MAIN ROAD','08:50','',1,'Eva'),(1232,19,'GLYFA TAVERNA','MAIN ROAD','07:10','39.72383689454385,19.88359093666077',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1233,28,'BLUE LAGOON HOTEL RODA','MAIN ROAD','07:05','39.78685408874083,19.791799763391236',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1234,28,'DIELLAS ACHARAVI','MAIN ROAD','07:00','39.79442998791759,19.819711453374',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1235,19,'DASSIA CHANDRIS, NSK OFFICE','MAIN ROAD,PHARMACY','07:31','',1,'Maria'),(1242,20,'PERAMA HOTEL','OASIS','08:40','39.57939255851618,19.913115537456648',1,'Eva'),(1243,20,'BENITSES PORT','MAIN ROAD','08:50','39.54705466812339,19.913023366800815',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1244,31,'CORFU TOWN NEW PORT','-','08:30','',1,'Maria'),(1245,20,'STADIUM','MAIN ROAD','08:50','39.540591030597014,19.91588963297326',1,'Eva'),(1246,19,'AKTAION','MAIN ROAD','08:10','39.6219414208258,19.925165176391605',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1254,32,'SAN GEORGE PALACE HOTEL','COSTAS RENT A CAR','06:50','',1,'Eva'),(1255,19,'KONSTANTINOYPOLIS','MAIN ROAD','08:10','39.626647660462154,19.92054104804993',1,'Maria'),(1559,20,'3K S/M MESSONGHI','M.ROAD','09:11','39.47547107117025,19.93453681468964',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1565,20,'CORFU CRUISES OLD BENITSES OFFICE','MAIN ROAD','08:50','39.54136100654675,19.914790391922',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1566,28,'SHELL PETROL STATION','MAIN ROAD','06:58','39.79755301279228,19.827296733856205',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1567,28,'PIZZA VENEZIA','MAIN ROAD','07:27','39.785912797169985,19.708131551742554',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1568,28,'JOANNAS','MAIN ROAD','07:35','39.79012147356631,19.68983352184296',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1569,28,'CHRISTINAS','MAIN ROAD','07:39','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1574,28,'ESCAPE BAR','MAIN ROAD','07:30','39.79475030805611,19.701485037803653',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1575,28,'BLUE SKY','MAIN ROAD','07:30','39.79185268588472,19.706956744194034',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1576,28,'SAN GEORGE SIDARI','MAIN ROAD','07:30','-',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1577,29,'LEFKIMMI HOTEL','MAIN ROAD','09:45','',1,'NICOLE'),(1578,20,'OSCAR BENITSES OFFICE','MAIN ROAD','08:50','',1,'Eva'),(1591,29,'ALEXANDRA','MAIN ROAD','09:45','',1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(1592,29,'TEX MEX','MAIN ROAD','09:45','',1,'NICOLE'),(1598,19,'KALYPSO CAFE IPSOS','MAIN ROAD','07:20','39.701288,19.840292',1,'Maria'),(1601,19,'SUNSET HOTEL ALYKES','M.ROAD OPPOSITE','07:53','39.63349377753193,19.879555005313843',1,'Maria');
/*!40000 ALTER TABLE `pickuppoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ports`
--

DROP TABLE IF EXISTS `ports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ports` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ports`
--

LOCK TABLES `ports` WRITE;
/*!40000 ALTER TABLE `ports` DISABLE KEYS */;
INSERT INTO `ports` VALUES (1,'CORFU PORT',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(2,'LEFKIMMI PORT',1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210');
/*!40000 ALTER TABLE `ports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Abbreviation` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PortId` int NOT NULL,
  `IsActive` tinyint NOT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `FK_Routes_Ports` (`PortId`),
  CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`PortId`) REFERENCES `ports` (`Id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (19,'NISAKI','NISAKI - KALAMI - BARBATI - DASIA - GOUVIA - CORFU PORT',1,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(20,'SOUTH','TOWN - ΠΕΡΑΜΑ - ΜΕΣΣΟΓΓΗ - ΛΕΥΚΙΜΜΗ',2,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(22,'WEST','PALEO - ERMONES - GLYFADA - PELEKA - AG.GORDIS - CORFU PORT',1,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(28,'ACH-SID','ACHARAVI - RODA - SIDARI - CORFU PORT',1,1,'e7e014fd-5608-4936-866e-ec11fc8c16da'),(29,'KAVOS','KAVOS',2,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(31,'L.P.-C.P.','NO TRANSFER',1,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210'),(32,'PAGOI','AG.STEFANOS - ARILLAS - PAGOI - CORFU PORT',1,1,'b6401c3e-7683-49bc-bb7f-8be3b2fd2210');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ClientId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CreatedDate` datetime(6) NOT NULL,
  `UserId` varchar(450) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastModifiedDate` datetime(6) NOT NULL,
  `ExpiryTime` datetime(6) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14349 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (11396,'ujZZ55qcTE-1I3ObqGa5Qg','51743b510b6a413dae84c93f21865ddf','2020-05-11 05:56:10.865424','830796dc-cee0-4f08-9b11-283bdd3aaa98','0001-01-01 00:00:00.000000','2020-05-11 07:26:10.865424'),(11721,'ujZZ55qcTE-1I3ObqGa5Qg','b2b46b2034bf43f38eeb01822c134320','2020-05-27 05:25:21.924113','c7c0fbe5-7e34-4336-8ca0-3a565bf8e36b','0001-01-01 00:00:00.000000','2020-05-27 06:55:21.924188'),(14348,'2623706f-198b-4a7f-877f-ea86f3013831','a2579ca22e5a48f9b6a8732e0bae3634','2020-12-29 10:02:06.128116','e7e014fd-5608-4936-866e-ec11fc8c16da','0001-01-01 00:00:00.000000','2020-12-29 11:32:06.128117');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers`
--

DROP TABLE IF EXISTS `transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DateIn` date NOT NULL,
  `CustomerId` int NOT NULL DEFAULT '0',
  `DestinationId` int NOT NULL DEFAULT '0',
  `PickupPointId` int NOT NULL,
  `DriverId` int NOT NULL DEFAULT '0',
  `PortId` int NOT NULL DEFAULT '0',
  `Adults` int NOT NULL,
  `Kids` int NOT NULL,
  `Free` int NOT NULL,
  `TotalPersons` int GENERATED ALWAYS AS (((`Adults` + `Kids`) + `Free`)) VIRTUAL,
  `Remarks` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `UserId` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  KEY `FK_Transfers_Destinations` (`DestinationId`),
  KEY `FK_Transfers_Customers` (`CustomerId`),
  KEY `FK_Transfers_Drivers` (`DriverId`),
  KEY `FK_Transfers_PickupPoints` (`PickupPointId`),
  CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`Id`) ON UPDATE CASCADE,
  CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`DestinationId`) REFERENCES `destinations` (`Id`) ON UPDATE CASCADE,
  CONSTRAINT `transfers_ibfk_3` FOREIGN KEY (`DriverId`) REFERENCES `drivers` (`Id`) ON UPDATE CASCADE,
  CONSTRAINT `transfers_ibfk_4` FOREIGN KEY (`PickupPointId`) REFERENCES `pickuppoints` (`Id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` (`Id`, `DateIn`, `CustomerId`, `DestinationId`, `PickupPointId`, `DriverId`, `PortId`, `Adults`, `Kids`, `Free`, `Remarks`, `UserId`) VALUES (1,'2019-10-01',8,2,1086,1,1,1,0,0,'14','Eva');
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-29 12:12:18
