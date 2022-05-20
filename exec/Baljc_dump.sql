-- MySQL dump 10.13  Distrib 5.7.35, for Win64 (x86_64)
--
-- Host: k6a407.p.ssafy.io    Database: baljc_prod
-- ------------------------------------------------------
-- Server version	5.7.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_book`
--

DROP TABLE IF EXISTS `account_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_book` (
  `account_book_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `fixed_expenditure_yn` char(1) DEFAULT NULL,
  `fixed_income_yn` char(1) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `monthly_period` int(11) DEFAULT NULL,
  `payment_method` char(1) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `category_id` binary(16) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`account_book_id`),
  KEY `FK8685ocikdi04moxkavl3ejt88` (`category_id`),
  KEY `FKo8gacuvdd3kk8pdw7hkj3orfc` (`member_id`),
  CONSTRAINT `FK8685ocikdi04moxkavl3ejt88` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKo8gacuvdd3kk8pdw7hkj3orfc` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_book`
--

LOCK TABLES `account_book` WRITE;
/*!40000 ALTER TABLE `account_book` DISABLE KEYS */;
INSERT INTO `account_book` VALUES (_binary '\0qV\�v�Jx�Q59��}','2022-05-11 10:10:19.947000','2022-05-12 19:09:00.000000','N',NULL,'N','N','',NULL,'M',5000,NULL,'노인코래방','E',_binary 'f91c1bbd98bf449c',_binary '�¤ۑBT�ޙ���'),(_binary 'PDN_\�Lh�_r<���','2022-05-16 20:46:37.627000','2022-05-16 20:45:00.000000','Y',NULL,'N','N','',NULL,'N',50000,NULL,'얍','I',_binary '435cfde98bc84022',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\r��ݚvH�QٰW\�G','2022-05-18 10:46:34.704000',NULL,'N','2022-05-28','Y','N','',26,'M',39400,'2022-01-01','통신비','E',_binary '8fb2815868004447',_binary '��5J9��\���\�=\�'),(_binary '\r\� ��II��\'M�\'\�2','2022-05-19 14:19:39.193000','2022-05-15 16:15:00.000000','N',NULL,'N','N','',NULL,'C',12000,NULL,'미용실','E',_binary 'f91c1bbd98bf449c',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\"��-\�B��7k ��','2022-05-18 22:49:41.347000','2022-05-18 22:49:00.000000','N',NULL,'N','N','',NULL,'C',1,NULL,'11','E',_binary 'd61821c5547c4330',_binary '@ME�BK��u�\�fH'),(_binary ':��h[�M��A5�q','2022-05-19 14:40:26.164000','2022-04-24 16:00:00.000000','N',NULL,'N','N','',NULL,'C',5000,NULL,'옐로커피 아메리카노','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '<:i1�3Nǅ�U�+/\�h','2022-05-20 10:18:17.859000','2022-05-20 00:15:00.000000','Y',NULL,'N','N','5월 31일 1+1',NULL,'C',4400,NULL,'핫식스 4캔','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '<��6L���dp \�\�`','2022-05-06 19:35:54.654000','2022-05-07 04:35:00.000000','N',NULL,'N','N','',NULL,'M',5000,NULL,'떡볶이','E',_binary '282f6dece05f4014',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '=�ʺ�i@枬鯚�\�','2022-05-19 11:03:08.327000',NULL,'N','2022-05-28','Y','N','',19,'C',6000,'2022-05-01','수도 요금','E',_binary '8fb2815868004447',_binary 'K��RvO��<Jh�Ĝ'),(_binary '>�j\�eJ��\� \�-','2022-05-18 10:49:07.640000',NULL,'N','2022-05-28','Y','N','',18,'C',2100,'2021-11-01','유튜브 프리미엄 결제','E',_binary '587d20d7c7894efa',_binary '��5J9��\���\�=\�'),(_binary 'BB v�L��\�+Z�\n\�','2022-05-16 20:48:00.180000','2022-05-12 20:47:00.000000','N',NULL,'N','N','',NULL,'C',33000,NULL,'옷구입','E',_binary '5ec2f7ea593c424f',_binary '\�q�\�K���h\"m:I!'),(_binary 'B�h\�@LF�F\�\r�\��','2022-05-19 17:57:55.669000','2022-05-20 12:00:00.000000','Y',NULL,'N','N','5월31일까지 1+1',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'Lo;iaO&�\�\�\�h��','2022-05-19 10:52:19.487000',NULL,'N','2022-08-28','Y','N','',4,'C',3650,'2020-09-01','넷플릭스','E',_binary '587d20d7c7894efa',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'S\�z�~O:��?��AR','2022-05-13 03:13:10.600000','2022-05-12 03:12:00.000000','N',NULL,'N','N','커피 부족함 앞으로 2개 사야댐',NULL,'M',1350,NULL,'밤샘용 커피','E',_binary '282f6dece05f4014',_binary '�\��\�YJ��	(Ń\'F'),(_binary 'S\�\Z\�1�M�pI��x�Q','2022-05-17 11:22:21.190000','2022-05-17 11:22:00.000000','N',NULL,'N','N','',NULL,'M',12000,NULL,'양파 한 망','E',_binary '282f6dece05f4014',_binary '��5J9��\���\�=\�'),(_binary 'Z�i\�A1�\�����y','2022-05-19 14:32:48.545000','2022-04-11 12:32:00.000000','N',NULL,'N','N','',NULL,'C',3400,NULL,'편의점 1L 커피','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary ']<`�Gñ�N\�\�f�6','2022-05-14 20:22:24.631000','2022-05-14 19:20:00.000000','N',NULL,'N','N','',NULL,'C',139000,NULL,'meari mgw bag','E',_binary '5ec2f7ea593c424f',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary 'a�C\�B��\�Sޒ��','2022-05-12 22:21:30.590000','2022-05-12 23:22:00.000000','N',NULL,'N','N','',NULL,'C',1000,NULL,'아이스크림','E',_binary '282f6dece05f4014',_binary '\�\��`��Mo��b˶��;'),(_binary 'dn\�mP`O\n�~ʲ:F\�\�','2022-05-16 20:49:51.334000','2022-05-03 20:49:00.000000','N',NULL,'N','N','',NULL,'C',20000,NULL,'병원','E',_binary '13b8d980e1d540c1',_binary '\�q�\�K���h\"m:I!'),(_binary 'e�Df\�SD��ש�h�\�','2022-05-18 10:39:59.268000',NULL,'N','2022-04-28','N','Y','',15,'N',1000000,'2021-07-01','S S A F Y','I',_binary '435cfde98bc84022',_binary '��5J9��\���\�=\�'),(_binary 'o@uYƾJ���8J�ŨK','2022-05-16 20:43:52.573000','2022-05-13 20:43:00.000000','N',NULL,'N','N','',NULL,'N',200000,NULL,'용돈','I',_binary '62c8a332e6a34e84',_binary '\�q�\�K���h\"m:I!'),(_binary 'o\��\�sL\�[�קBn','2022-05-16 20:49:15.811000','2022-05-08 20:48:00.000000','N',NULL,'N','N','',NULL,'C',100000,NULL,'뮤지컬','E',_binary '587d20d7c7894efa',_binary '\�q�\�K���h\"m:I!'),(_binary 'q\��DM}@�\�Wx���','2022-05-19 14:29:45.796000','2022-05-09 14:29:00.000000','N',NULL,'N','N','',NULL,'C',6200,NULL,'교통비','E',_binary '0e450d23ae884d64',_binary 'K��RvO��<Jh�Ĝ'),(_binary 't��}zC��\�S�\Z�','2022-05-12 22:24:09.823000','2022-05-12 22:25:00.000000','N',NULL,'N','N','',NULL,'C',30000,NULL,'사과','E',_binary '587d20d7c7894efa',_binary '\0y�@�I0�B��U�}E'),(_binary 'whi\n.K���\�`^BH','2022-05-19 14:39:21.750000','2022-04-07 14:38:00.000000','N',NULL,'N','N','실수로 2개 사버림',NULL,'C',24000,NULL,'러닝 벨트','E',_binary '587d20d7c7894efa',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'xt\n%Nr�~�X���','2022-05-19 14:16:51.145000','2022-05-15 14:15:00.000000','N',NULL,'N','N','계란초밥이 맛있다 ',NULL,'C',50000,NULL,'초밥집','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��v�\0=BA�P\n��	��','2022-05-17 14:02:21.114000','2022-05-11 14:01:00.000000','N',NULL,'N','N','',NULL,'C',120000,NULL,'운동화','E',_binary '5ec2f7ea593c424f',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�;\�Mń~H@ZD','2022-05-16 20:43:28.754000','2022-05-16 13:43:00.000000','N',NULL,'N','N','',NULL,'C',20000,NULL,'점심','E',_binary '282f6dece05f4014',_binary '\�q�\�K���h\"m:I!'),(_binary '�j=\n�L�9z5x\�7g','2022-05-18 23:24:50.517000','2022-05-18 19:55:00.000000','Y',NULL,'N','N','5월 31일까지 1+1',NULL,'C',440,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��\�ƣ�K\�Ғ_��6\�','2022-05-18 22:49:35.960000','2022-05-18 19:55:00.000000','Y',NULL,'N','N','5월 31일까지 1+1',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��C�@��nx��\'�','2022-05-18 10:58:21.408000','2022-05-15 10:57:00.000000','N',NULL,'N','N','네이버 페이',NULL,'M',20000,NULL,'엄마 양말','E',_binary '5ec2f7ea593c424f',_binary '��5J9��\���\�=\�'),(_binary '��\�5�Lᣦg9�]\0','2022-05-18 10:55:14.501000','2022-05-06 10:54:00.000000','N',NULL,'N','N','네이버 페이',NULL,'M',400000,NULL,'어버이날 선물','E',_binary 'f91c1bbd98bf449c',_binary '��5J9��\���\�=\�'),(_binary '��\�%*H2�\��\���\r','2022-05-15 22:39:39.971000','2022-05-15 22:39:00.000000','N',NULL,'N','N','',NULL,'C',30000,NULL,'식사','E',_binary '282f6dece05f4014',_binary '\�q�\�K���h\"m:I!'),(_binary '��\���Jل��4CtCG','2022-05-18 12:27:54.069000','2022-05-16 12:27:00.000000','N',NULL,'N','N','',NULL,'N',1000000,NULL,'S S A F Y','I',_binary '435cfde98bc84022',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '�,��HK���q7\�\�','2022-05-15 15:36:34.911000','2022-05-15 15:36:00.000000','Y',NULL,'N','N','',NULL,'C',3000,NULL,'버스비','E',_binary '0e450d23ae884d64',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��\�\�hJV�7ϫڵ`y','2022-05-18 10:40:56.409000','2022-05-16 10:40:00.000000','N',NULL,'N','N','',NULL,'N',1000000,NULL,'S S A F Y','I',_binary '435cfde98bc84022',_binary '��5J9��\���\�=\�'),(_binary '�\�z+\�J��g�\��\�\�f','2022-05-17 14:01:40.310000','2022-05-14 14:01:00.000000','N',NULL,'N','N','',NULL,'N',300000,NULL,'용돈','I',_binary '62c8a332e6a34e84',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�&�\�\�A��9\�\�!\�','2022-05-15 22:39:05.500000','2022-05-08 22:38:00.000000','N',NULL,'N','N','',NULL,'N',1,NULL,'ㅃ','I',_binary '65d0ee2690f44bc2',_binary '@ME�BK��u�\�fH'),(_binary '�;\n�\�MCU�\�7,S\�','2022-05-18 10:42:13.721000','2022-05-16 10:41:00.000000','N',NULL,'N','N','',NULL,'N',500000,NULL,'수익','I',_binary '435cfde98bc84022',_binary '��5J9��\���\�=\�'),(_binary '�R�qF�J���\�m@p&\�','2022-05-12 22:29:43.737000','2022-05-12 23:30:00.000000','N',NULL,'N','N','',NULL,'C',43000,NULL,'ㅇㅇ','E',_binary '282f6dece05f4014',_binary '\�\��`��Mo��b˶��;'),(_binary '�a�\�\��C���{6�/�`','2022-05-19 14:31:01.382000','2022-05-07 10:30:00.000000','N',NULL,'N','N','',NULL,'C',4300,NULL,'병원 진료비','E',_binary '13b8d980e1d540c1',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�,i�/Ik�Â4�tE\�','2022-05-13 03:14:17.317000','2022-05-12 03:16:00.000000','N',NULL,'N','N','',NULL,'C',1700,NULL,'쥬시쿨','E',_binary '282f6dece05f4014',_binary '�\��\�YJ��	(Ń\'F'),(_binary '�ۆ�f\�F\n�\�W��A�\�','2022-05-19 14:30:32.477000','2022-04-09 09:30:00.000000','N',NULL,'N','N','',NULL,'C',8400,NULL,'병원 진료','E',_binary '13b8d980e1d540c1',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�8[\�Mڡ� !��\�','2022-05-13 03:13:52.265000','2022-05-12 03:14:00.000000','N',NULL,'N','N','',NULL,'M',2000,NULL,'하이쮸','E',_binary '282f6dece05f4014',_binary '�\��\�YJ��	(Ń\'F'),(_binary '����^�H.�Ú�\�xC�','2022-05-18 10:50:02.012000','2022-05-05 10:49:00.000000','N',NULL,'N','N','',NULL,'N',234000,NULL,'옷 반품한 거 입금','I',_binary '65d0ee2690f44bc2',_binary '��5J9��\���\�=\�'),(_binary '�\�-m\�B8��푻\�@','2022-05-16 21:13:31.455000','2022-05-14 18:13:00.000000','N',NULL,'N','N','',NULL,'C',150000,NULL,'뮤지컬','E',_binary '587d20d7c7894efa',_binary '\�q�\�K���h\"m:I!'),(_binary '�B\0D�K^�Q\�\'8\\Z','2022-05-18 10:50:31.346000','2022-05-05 10:50:00.000000','Y',NULL,'N','N','두 번에 나눠서 들어옴',NULL,'N',39000,NULL,'옷 반품한 거 입금 2','I',_binary '65d0ee2690f44bc2',_binary '��5J9��\���\�=\�'),(_binary '��g�\�qJ%��\�Ԝ','2022-05-18 10:47:47.675000','2022-05-07 10:47:00.000000','N',NULL,'N','N','핸드크림... 그리고 갑작스러운 소비..',NULL,'C',17300,NULL,'선물','E',_binary '5ec2f7ea593c424f',_binary '��5J9��\���\�=\�'),(_binary '�`|&�:Jd�\�X\�>�g�','2022-05-19 14:25:56.054000',NULL,'N','2022-07-28','N','Y','감사합니다',15,'N',1000000,'2021-08-01','SSAFY 교육지원금','I',_binary '435cfde98bc84022',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�^\�[+qL�\�@	-\�','2022-05-18 10:48:28.031000','2022-05-09 10:48:00.000000','N',NULL,'N','N','',NULL,'C',14300,NULL,'배달 떡볶이','E',_binary '282f6dece05f4014',_binary '��5J9��\���\�=\�'),(_binary '�L\�\�\�DB=��\�~\�\�-','2022-05-13 03:13:38.154000','2022-05-12 03:13:00.000000','N',NULL,'N','N','',NULL,'M',700,NULL,'마이쮸','E',_binary '282f6dece05f4014',_binary '�\��\�YJ��	(Ń\'F'),(_binary '��D)�MK,��\�f\�24','2022-05-18 10:53:35.090000','2022-05-13 10:53:00.000000','N',NULL,'N','N','',NULL,'M',50000,NULL,'슬랙스','E',_binary '5ec2f7ea593c424f',_binary '��5J9��\���\�=\�'),(_binary '�\��B	\nK��#�V��l','2022-05-19 14:23:10.877000','2022-04-15 19:35:00.000000','N',NULL,'N','N','',NULL,'C',20000,NULL,'익선동 맛집','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�#j\�U@6���3|49','2022-05-19 14:38:29.812000','2022-04-20 13:38:00.000000','N',NULL,'N','N','',NULL,'C',13500,NULL,'편의점 쇼핑','E',_binary '5ec2f7ea593c424f',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��Z\�\�\\M�p\"<C�\�','2022-05-18 10:52:10.372000',NULL,'N','2022-05-28','Y','N','',4,'C',11600,'2022-04-01','체크교통카드','E',_binary '0e450d23ae884d64',_binary '��5J9��\���\�=\�'),(_binary '�\��iV\�J˳iSd�B;y','2022-05-18 10:44:32.829000','2022-05-14 10:44:00.000000','N',NULL,'N','N','',NULL,'C',16000,NULL,'떡볶이','E',_binary '282f6dece05f4014',_binary '��5J9��\���\�=\�'),(_binary '�굫\�K۸��o+�n\n','2022-05-19 21:34:04.852000','2022-05-28 21:33:00.000000','Y',NULL,'N','N','',NULL,'C',999999,NULL,'ㅇ','E',_binary 'da5fff85a9094a77',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\��BnJQ��1�/+d','2022-05-16 20:47:43.796000','2022-05-16 20:47:00.000000','Y',NULL,'N','N','',NULL,'C',3000,NULL,'아','E',_binary '82792d4d63fc49d1',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�E�\�Hـ\�\�^K\�c','2022-05-19 14:21:20.268000','2022-05-01 14:20:00.000000','N',NULL,'N','N','',NULL,'C',6000,NULL,'옐로커피 초코라떼','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�ʢK�\nFt�䁎2��\�','2022-05-16 20:48:01.409000','2022-05-17 20:47:00.000000','Y',NULL,'N','N','',NULL,'N',1234,NULL,'어라','I',_binary '62c8a332e6a34e84',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�\�J�GO���f�)6','2022-05-19 14:24:32.795000',NULL,'N','2022-12-28','Y','N','',22,'C',33000,'2019-01-01','핸드폰 요금','E',_binary '8fb2815868004447',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\���\r�M�\n\���\�','2022-05-18 10:54:45.949000','2022-05-06 10:54:00.000000','N',NULL,'N','N','네이버 페이',NULL,'M',30000,NULL,'선크림,수분크림','E',_binary '5ec2f7ea593c424f',_binary '��5J9��\���\�=\�'),(_binary '\�0%�gK8��O� �bX','2022-05-13 03:15:54.594000','2022-05-12 03:20:00.000000','N',NULL,'N','N','게임해야지',NULL,'M',1500000,NULL,'컴퓨터','E',_binary '587d20d7c7894efa',_binary '�\��\�YJ��	(Ń\'F'),(_binary '\�N�(�GI\�\�\�1��','2022-05-19 20:40:40.685000','2022-05-19 12:00:00.000000','N',NULL,'N','N','5월 31일 1+1',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\���� fF?�!q\�FG\�','2022-05-16 20:46:06.108000','2022-05-12 20:45:00.000000','N',NULL,'N','N','',NULL,'N',50000,NULL,'용돈','I',_binary '65d0ee2690f44bc2',_binary '\�q�\�K���h\"m:I!'),(_binary '\�\n�=\�Gΐ���ȂW','2022-05-19 10:32:53.937000','2022-05-19 00:00:00.000000','Y',NULL,'N','N','5월 31일 1+1',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�\�%0\\Hw�ѿ!�\��','2022-05-19 14:18:41.106000','2022-05-13 19:18:00.000000','N',NULL,'N','N','',NULL,'C',50000,NULL,'조카 생일 선물','E',_binary 'd61821c5547c4330',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�D�\�lqEj�|\Z\�\�K\��','2022-05-19 14:18:17.843000','2022-05-03 18:35:00.000000','N',NULL,'N','N','다 읽을 수 있을까',NULL,'C',33000,NULL,'클린 코드 책','E',_binary '82792d4d63fc49d1',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�\�=\�\��I������,y','2022-05-18 15:58:58.159000','2022-05-18 15:58:00.000000','N',NULL,'N','N','오늘의 마음의 양식',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�X�MBߐ�KV\'k�t','2022-05-18 10:45:15.436000','2022-05-12 10:44:00.000000','N',NULL,'N','N','엄마가 파닭먹고 싶다고 했음',NULL,'C',18000,NULL,'파닭','E',_binary '282f6dece05f4014',_binary '��5J9��\���\�=\�'),(_binary '\�\�Ėh N-���\r\�\n','2022-05-17 14:01:17.128000','2022-05-17 14:01:00.000000','N',NULL,'N','N','',NULL,'N',1000,NULL,'이자','I',_binary '1cf959e5f1574ae9',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '��\�VH<��9R;��:','2022-05-18 12:28:28.906000','2022-05-17 12:28:00.000000','N',NULL,'N','N','경기도 재난지원금',NULL,'M',8500,NULL,'떡볶이','E',_binary '282f6dece05f4014',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '�\�Μ�\�N�(ƷE�u`','2022-05-15 15:49:53.065000','2022-05-15 15:49:00.000000','Y',NULL,'N','N','',NULL,'N',50000,NULL,'주움','I',_binary '65d0ee2690f44bc2',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��ܤ�$J��JE�Er','2022-05-07 20:24:55.663000','2022-05-08 05:24:00.000000','N',NULL,'N','N','새우 애호박 버섯 방토 양상추 로메인',NULL,'C',39030,NULL,'쿠팡) 장보기','E',_binary '282f6dece05f4014',_binary '@ME�BK��u�\�fH'),(_binary '�\"\�\�Aϛ\Z4�Y\�','2022-05-19 11:12:28.786000','2022-05-19 12:00:00.000000','Y',NULL,'N','N','5월 31일까지 1+1',NULL,'C',4400,NULL,'핫식스','E',_binary '282f6dece05f4014',_binary 'K��RvO��<Jh�Ĝ');
/*!40000 ALTER TABLE `account_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `board_id` binary(16) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `dong` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `board_category_id` binary(16) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK37benda2qsi5fgjospu67wyro` (`board_category_id`),
  KEY `FKsds8ox89wwf6aihinar49rmfy` (`member_id`),
  CONSTRAINT `FK37benda2qsi5fgjospu67wyro` FOREIGN KEY (`board_category_id`) REFERENCES `board_category` (`board_category_id`),
  CONSTRAINT `FKsds8ox89wwf6aihinar49rmfy` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (_binary '\��\�G	M���YI\�4g�','하이','2022-05-14 20:12:39.400000','N','노형동',33.4790656,126.4812032,NULL,_binary '003ee176d5424e26',_binary 'O\�\�W�DMR�P�Zħ�\�'),(_binary '�X��HAD�t�\�xB�I','바질 페스토 만들려다 바질 1kg 사버렸습니다. 바질 좋아하시는 분, 바질이 뭔지 모르지만 일단 갖고 싶으신 분,  100g에 5,000원에 주워가실 분 구합니다. 바지 아니고 바질입니다.','2022-05-18 16:02:19.260000','Y','원당동',37.6842941,126.8550591,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��D�B|�r��g)D','바질 페스토 만들려다 바질 5kg 사버렸습니다. 바질 좋아하시는 분, 바질이 뭔지 모르지만 일단 갖고 싶으신 분,  200g에 5,000원에 주워가실 분 구합니다. 바지 아니고 바질입니다.','2022-05-19 20:43:41.887000','Y','사리현동',37.6975036,126.8421754,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�M�AeL¼�\�Y#\�\�','ㅂㅈ ㅍㅅㅌ ㅁㄷㄹㄷㄱ ㅂㅈ 5ㅅㅂㄹㅅㄴㄷ','2022-05-18 22:55:38.185000','Y','사리현동',37.6974957,126.8422095,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�\�\0h@��N����','동네에 있는 뚱냥이 사진 올려봅니다.','2022-05-19 11:50:48.870000','N','풍덕천동',37.3210057,127.0936762,NULL,_binary '003ee176d5424e26',_binary '\��F]N�)0�'),(_binary '�\�M�dH;�z����sk','돼지가 사는 동네에요','2022-05-13 03:17:42.808000','Y','주교동',37.5682,126.9977,NULL,_binary '003ee176d5424e26',_binary '�\��\�YJ��	(Ń\'F'),(_binary '\�d]�\�OB�R���H�','부탁드립니다 ','2022-05-14 08:49:09.526000','N','천연동',37.56799200577017,126.95855032908612,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '\0�M$FH��\�E\"\�','주말에 보드 타실 분 계신가요\n오전 9시 ~ 11시 까지 타려고 합니다. 더 늦어지면 너무 더울 것 같아서요. \n\n김밥은 제가 10줄까진 준비하겠습니다.','2022-05-17 11:20:58.889000','N','풍덕천동',37.322752,127.0939648,NULL,_binary '592ab2a68de54b82',_binary '��5J9��\���\�=\�'),(_binary '$�ۑ\�G�L���sU@','ㅂㅈㅍㅅㅌ 5ㅋㄹㄱㄹ','2022-05-18 23:27:49.784000','Y','사리현동',37.6975037,126.8422024,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '(�h�\�\�K��\�5}Q��','누가 잃어버린줄 알고 봤더니 아파트 단지 안에 이런 게 있네요 ㅎㅎ \n마음씨가 고와요 ','2022-05-19 10:46:46.549000','N','사리현동',37.6975105,126.8421847,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary ')\�\��\�D����Ef�c','안녕하세요!\n요즘 식물 키우는데 맛들렸습니다.\n혹시 근처에 반려 식물 파는 곳 추천해주실 수 있을까요? 허브나 꽃이나 다육이도 좋아합니다.\n사진은 제가 키우고 있는 레몬입니다.','2022-05-19 15:21:30.738000','N','사리현동',37.6974875,126.8421719,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '1 �t�&Gx�\��h�\�=\�','코로나에 집안 생활만 한 지 어언 2년 반,, 차오르는 뱃살을 보며 운동을 결심했습니다. 마침 집안에 굴러다니던 배드민턴 라켓이 제 눈에 들어오더군요. 운명처럼 다가온 이 라켓과 함께 일주일에 한번씩 배드민턴을 시작해볼까합니다. \n저와 셔틀콕을 주고받으며 같이 땀 흘려보실 분을 구합니다. 본인의 실력, 초등학생 아이와 비슷합니다. 느긋한 랠리 원합니다. 약수터 숨은 고수 어르신부터 초등학생까지 남녀노소 누구든 환영합니다. \n댓글 부탁드립니다.','2022-05-19 11:07:15.047000','N','사리현동',37.6975105,126.8421847,NULL,_binary '592ab2a68de54b82',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary ':\nA�\�JP��2\�','어라','2022-05-15 21:29:28.326000','Y','사리현동',37.6974983,126.8422081,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'B�U%ZC�\�D�\�(','위 climb 같이해요!!','2022-05-18 21:19:47.667000','N','풍덕천동',37.3210057,127.0936762,NULL,_binary '592ab2a68de54b82',_binary '\��F]N�)0�'),(_binary 'K\�)Uq,CE��T|:\�','aaa','2022-05-14 20:06:29.770000','N','노형동',33.4790656,126.4812032,NULL,_binary '003ee176d5424e26',_binary 'O\�\�W�DMR�P�Zħ�\�'),(_binary 'M\n��\�FF���\�F��','풍덕풍덕~\n\n제 점식 식사를 부탁해요?\n','2022-05-19 11:45:04.705000','N','풍덕천동',37.3210057,127.0936762,NULL,_binary '2f274fb71d084878',_binary '\��F]N�)0�'),(_binary ']�(3�BS�\�W��X�','제가 일주일동안 학회 때문에 집에 못 있을 것 같은데 저희 집 딱지 하루에 한 번씩만 물 갈아주실 수 있는 분 계신가요.. ? 이름은 딱지예요.. 코딱지.. ','2022-05-17 22:47:01.011000','N','풍덕천동',37.322752,127.0939648,NULL,_binary '2f274fb71d084878',_binary '��5J9��\���\�=\�'),(_binary ']��aiyI\�i�<�lw','Test','2022-05-12 10:52:33.659000','N','구월동',37.4474283,126.7041283,NULL,_binary '003ee176d5424e26',_binary '\��F]N�)0�'),(_binary 'q�}�Mz��K+J�y','6월부터 같이 살 룸메 구합니다! 제가 이미 입주해서 살고 있던 곳이라 보증금은 안 내셔도 됩니다. 아침형이라 일찍 활동하시는 분이었으면 좋겠습니다.  \n\n위치는 달쌍빌라입니다. 채팅 주세요.','2022-05-18 12:21:16.414000','N','풍덕천동',37.3210057,127.0936762,NULL,_binary '592ab2a68de54b82',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary 'rt�0KE�\r�х��','1','2022-05-15 21:18:22.161000','Y','역북동',37.2441088,127.1988224,NULL,_binary '2f274fb71d084878',_binary '@ME�BK��u�\�fH'),(_binary '�\�\�&KPF\��\"\�^�','역 근처에서 에어팟 분실했습니다ㅠㅠㅠㅠ\n키움히어로즈 케이스 끼워져있고 김혜성 키링 달려있어요ㅠ\n사례금 드리겠습니다 발견하신 분 꼭 알려쥬새요 제발요','2022-05-19 11:04:34.238000','N','사리현동',37.6975105,126.8421847,NULL,_binary '2f274fb71d084878',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�pK�@η\�l喢?\�','호','2022-05-14 08:48:36.538000','N','천연동',37.56799200577017,126.95855032908612,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�\�\�-NOS�\�R-�)�T','풍덕천동에 이사에 1주일 전에 이사왔어요!\n필라테스 다니고 싶은데 괜찮은 곳 있나요 ?\n시설이랑 비용 궁금해요 ?‍♀️','2022-05-19 11:40:10.770000','N','풍덕천동',37.3210057,127.0936762,NULL,_binary '003ee176d5424e26',_binary '@ME�BK��u�\�fH'),(_binary '���/tK��~���\�','양조절 실패 팟타이','2022-05-17 12:30:22.863000','N','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '� ܰ�@�Ř�[\�ؑ','바질 페스토 만들려다 바질 5kg 사버렸습니다. 바질 좋아하시는 분, 바질이 뭔지 모르지만 일단 갖고 싶으신 분,  200g에 5,000원에 주워가실 분 구합니다. 바지 아니고 바질입니다.','2022-05-19 18:00:47.407000','Y','사리현동',37.6974927,126.8421797,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�pЪ]�Jߍ\"��!Q\�','얍','2022-05-19 10:36:18.076000','Y','사리현동',37.6975105,126.8421847,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '���_>\�Jr�G<N\�Ѓ','집에서 쌀국수 해먹으려고 육수 샀는데 너무 많네요… 1년 내내 쌀국수만 먹어야 할 거 같아서 혹시 소분 원하시는 분 계시면 나눔 해드리려고 합니다. 저희 집 앞까지 담아가실 용기 들고 오시면 됩니다! \n','2022-05-19 10:50:52.657000','N','사리현동',37.6975105,126.8421847,NULL,_binary '592ab2a68de54b82',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '���J\�UFݳ����/\�','ㅡㅡㅡ','2022-05-15 21:14:51.210000','Y','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '@ME�BK��u�\�fH'),(_binary '\�g��O�H�\�j9`\�1','ㅁㄴㅇㅁㄴㅇ','2022-05-15 21:21:04.742000','Y','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '@ME�BK��u�\�fH'),(_binary '́��\�Fڒh$����\0','a\na\na\na\na\n\n\na','2022-05-16 10:21:39.202000','Y','노형동',33.4790656,126.4812032,NULL,_binary '592ab2a68de54b82',_binary '\�q�\�K���h\"m:I!'),(_binary '\�if�LMܫ��\�X��','아스크림 고양이','2022-05-15 15:52:03.182000','Y','조리읍',37.7410605,126.8057151,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�TIh\�O����l�Hk�','오늘 양파 2개가 필요해서 마트 갔는데 다 품절되고 이렇게 30개 묶음으로만 팔고 있더라구요... 필요하신 분 계신가요 ??','2022-05-18 10:24:42.578000','N','부평동',37.5062528,126.7269632,NULL,_binary '592ab2a68de54b82',_binary '��5J9��\���\�=\�'),(_binary '\�D�\�8JO�i�\�\r���','길가다가 애옹이 봤어요~ 너무 귀여움','2022-05-16 15:17:46.364000','N','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '՗\�\�\"E��D\���ph\�','예ㅔㅇ','2022-05-15 20:53:27.958000','N','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '@ME�BK��u�\�fH'),(_binary '\�\"�䐸K�����a���','저희동네 애옹','2022-05-19 10:42:12.118000','N','사리현동',37.6975105,126.8421847,NULL,_binary '003ee176d5424e26',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '\�wu$\�N��\�Ăܕ�','나랑 떡볶이 물 사람 ','2022-05-15 21:16:42.878000','N','역북동',37.2441088,127.1988224,NULL,_binary '592ab2a68de54b82',_binary '@ME�BK��u�\�fH'),(_binary '\�j\�M���gM����','바질 페스토 만들려다 바질 5kg 사버렸습니다. 바질 좋아하시는 분, 바질이 뭔지 모르지만 일단 갖고 싶으신 분,  200g에 5,000원에 주워가실 분 구합니다. 바지 아니고 바질입니다.','2022-05-20 10:21:03.200000','Y','사리현동',37.6974832,126.8421611,NULL,_binary '003ee176d5424e26',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�V\�\�@?�?.f�@&','제가 일주일동안 학회 때문에 집에 못 있는데 저희 집 고양이 하루에 한 번씩만 물 갈아주실 수 있는 분 계실까요.. 이름은 딱지예요.. 코딱지... ?','2022-05-18 10:27:22.998000','N','풍덕천동',37.2441088,127.0936762,NULL,_binary '2f274fb71d084878',_binary '��5J9��\���\�=\�'),(_binary '�)qA�C�m&ԶB','벌레잡아주실분 구해요ㅠㅠㅜㅜㅜㅡ\n여자분이시면 좋게썽요ㅠ\n만원드릴게요 제발 도와주세요\n','2022-05-19 11:01:43.114000','N','사리현동',37.6975105,126.8421847,NULL,_binary '2f274fb71d084878',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�s\0U\� F���>c�C5','어제 양파 한 망 사왔는데 양파 필요하신 분 계신가요 \n\n달쌍빌라 근처에서 나눔합니다.','2022-05-17 11:18:11.468000','N','풍덕천동',37.322752,127.0939648,NULL,_binary '003ee176d5424e26',_binary '��5J9��\���\�=\�'),(_binary '��H\�\�\�N�ET�J^','ㅜ','2022-05-15 21:16:42.094000','Y','역북동',37.2441088,127.1988224,NULL,_binary '003ee176d5424e26',_binary '@ME�BK��u�\�fH'),(_binary '�]MH��L%��(��K@','일요일 오전 8시에 같이 테니스 레슨 받으실 분 구해요!','2022-05-16 17:24:27.878000','N','역북동',37.2441088,127.1988224,NULL,_binary '592ab2a68de54b82',_binary '\�\�\0$TRJy�I�ͱ�\�');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_category`
--

DROP TABLE IF EXISTS `board_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board_category` (
  `board_category_id` binary(16) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`board_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_category`
--

LOCK TABLES `board_category` WRITE;
/*!40000 ALTER TABLE `board_category` DISABLE KEYS */;
INSERT INTO `board_category` VALUES (_binary '003ee176d5424e26','https://drf5juj9r1n4w.cloudfront.net/board_category_image/town.png','동네정보'),(_binary '2f274fb71d084878','https://drf5juj9r1n4w.cloudfront.net/board_category_image/help.png','부탁해요'),(_binary '592ab2a68de54b82','https://drf5juj9r1n4w.cloudfront.net/board_category_image/together.png','같이해요'),(_binary '88076e1bd35e4083','https://drf5juj9r1n4w.cloudfront.net/board_category_image/all.png','전체보기');
/*!40000 ALTER TABLE `board_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_img`
--

DROP TABLE IF EXISTS `board_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board_img` (
  `board_img_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `board_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`board_img_id`),
  KEY `FKey99sxtgmf5fpa0dfs2r2hxaa` (`board_id`),
  CONSTRAINT `FKey99sxtgmf5fpa0dfs2r2hxaa` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_img`
--

LOCK TABLES `board_img` WRITE;
/*!40000 ALTER TABLE `board_img` DISABLE KEYS */;
INSERT INTO `board_img` VALUES (_binary '\n\�R\�K��2��iO5','2022-05-19 10:42:12.587000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/b0a0112e-cb54-4263-8557-12898e87a514-1652924532393',_binary '\�\"�䐸K�����a���'),(_binary '	�Vc`�IW�Ƶ\�3f8u','2022-05-20 10:21:03.952000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/4aba7ae8-15cd-4569-ab41-d05a37363135-1653009663811',_binary '\�j\�M���gM����'),(_binary 'w\�h\�KO��\�\�U�(','2022-05-18 21:19:48.504000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/e2384af3-cb6c-4418-85f0-f955d1359267-1652876387842',_binary 'B�U%ZC�\�D�\�('),(_binary '\�^\ZJ1�v��:	','2022-05-16 10:21:40.283000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/eb01d31a-190c-42ed-a7da-181f80b5c708-1652664100182',_binary '́��\�Fڒh$����\0'),(_binary 'x\�\�1CX�k��\�K\r|','2022-05-19 20:43:42.115000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/8df7caff-b320-4dbc-9b27-a98ef1f46173-1652960622068',_binary '��D�B|�r��g)D'),(_binary 'i\�\�ܭF���v��̥','2022-05-14 20:12:40.159000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/6df04af2-19d3-4e59-a734-8530186e4a5d-1652526759602',_binary '\��\�G	M���YI\�4g�'),(_binary '$\'\�MD%�m�\\2h�z','2022-05-18 23:27:51.036000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/78d4b33b-98ba-454a-b082-ce0235950e66-1652884070892',_binary '$�ۑ\�G�L���sU@'),(_binary '*RF\�\�F5�]0fܣ\�','2022-05-15 21:16:42.925000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/9ecc5837-c9e3-4fb4-b182-4b3e8963f1ee-1652617002885',_binary '\�wu$\�N��\�Ăܕ�'),(_binary '+>���E\�F\�ǌ<8*','2022-05-19 18:00:48.451000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/b8b5a543-db8a-48d1-98c6-9599499cf6f3-1652950848334',_binary '� ܰ�@�Ř�[\�ؑ'),(_binary '-\�\�@�KL��1�2h��','2022-05-19 18:00:48.331000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/efd727df-ee1b-49df-8e65-7342e340b07b-1652950848223',_binary '� ܰ�@�Ř�[\�ؑ'),(_binary '9\�i\�\�@���x\Zr\Z\�\�','2022-05-19 10:36:19.131000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/886ea6c5-ca5c-428f-a3f6-729739402fef-1652924179012',_binary '�pЪ]�Jߍ\"��!Q\�'),(_binary 'G`�[\�B��]7�\��6','2022-05-18 23:27:50.889000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/557d6da8-c523-47af-ba40-26a85ce50827-1652884070737',_binary '$�ۑ\�G�L���sU@'),(_binary 'I\�P/�OJ�������:{','2022-05-15 21:21:05.463000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/43f4c375-17ab-44b0-9fbf-6a0affcc9cb1-1652617265387',_binary '\�g��O�H�\�j9`\�1'),(_binary 'M`.3�.@��sʄ`\�\�a','2022-05-18 22:55:39.064000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/ec114e6e-df70-4b85-8b2c-ff58e148c446-1652882138361',_binary '�M�AeL¼�\�Y#\�\�'),(_binary 'Mj\�\�\�Hu�ن!�w-\�','2022-05-15 21:18:22.301000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/adcc0b58-ce29-484b-bc13-d4ec08030bc5-1652617102167',_binary 'rt�0KE�\r�х��'),(_binary 'Na�s)\'@��)l\n\�5�+','2022-05-19 11:45:04.837000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/f98bb44d-3f86-4223-942f-e9f071816286-1652928304706',_binary 'M\n��\�FF���\�F��'),(_binary 'c��CȱKb�\�V\Z\�\'','2022-05-13 03:17:42.984000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/0dbd1361-d3cc-4675-aecc-e333ed5b15d8-1652379462818',_binary '�\�M�dH;�z����sk'),(_binary 'k��\�<yE�����\�!� ','2022-05-18 16:02:20.187000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/af0f4c5d-e6ed-472b-af39-f03ad6e38eac-1652857340140',_binary '�X��HAD�t�\�xB�I'),(_binary 'm�^C1I���pJ&\�;','2022-05-19 11:01:43.848000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/5c99088f-fa61-4c3b-a7a1-10e1a70a9f0b-1652925703311',_binary '�)qA�C�m&ԶB'),(_binary 'q\��\�UEI�\�Bi\�d\�','2022-05-19 11:02:38.205000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/4f2db683-6b29-484e-bedb-98dd46683406-1652925758143',_binary '�)qA�C�m&ԶB'),(_binary 's\�\�}K�Al��<g�P','2022-05-19 11:50:49.458000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/c5c83128-ceb3-4008-9cca-637f1e764429-1652928649070',_binary '�\�\�\0h@��N����'),(_binary 'vsp\�c�L�YFZ1�7','2022-05-19 18:00:48.217000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/7f84d074-091f-4f28-84b9-f9d871e2d168-1652950847840',_binary '� ܰ�@�Ř�[\�ؑ'),(_binary '��\����D;��\��:&\�','2022-05-19 20:43:42.066000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/fb302d8c-f465-4393-957a-c8f913ef7357-1652960621959',_binary '��D�B|�r��g)D'),(_binary '��#g�N��9g\�ӥP','2022-05-19 10:50:52.837000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/684e43b4-cdce-4ad9-ab68-1856db3feabe-1652925052662',_binary '���_>\�Jr�G<N\�Ѓ'),(_binary '�K\��\\Oҋ\\_�\�\�','2022-05-16 10:21:40.179000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/ff8f7d11-fe97-4f23-94dd-c025f99f3284-1652664100026',_binary '́��\�Fڒh$����\0'),(_binary '�\'�-U[L��-���\�\��','2022-05-18 22:55:39.372000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/999f23c5-70ad-476f-bf89-d770e188f4ac-1652882139217',_binary '�M�AeL¼�\�Y#\�\�'),(_binary '��\�\0CVM�HZP\�\�ax','2022-05-16 10:21:40.020000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/9d8bed02-b718-4f6c-bfaf-b6fbfcf297fb-1652664099470',_binary '́��\�Fڒh$����\0'),(_binary '��{]�L�\r~�z�\n','2022-05-19 15:21:31.415000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/4295d7b6-c6a3-4a84-9654-cb7cddcc00f9-1652941290920',_binary ')\�\��\�D����Ef�c'),(_binary '�&�{��L+��A4���','2022-05-19 11:07:15.170000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/3ebc778c-d4a1-4122-a827-b16e5d9ff01e-1652926035062',_binary '1 �t�&Gx�\��h�\�=\�'),(_binary '�2\�YMA�\��|6��','2022-05-16 15:17:47.271000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/9bd54b7a-e376-4442-a804-5b25469564b9-1652681866810',_binary '\�D�\�8JO�i�\�\r���'),(_binary '�����\�@��{�j\�Ҵ','2022-05-15 21:21:05.380000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/ae4e56e1-1235-4ff9-a709-e58b4863ea85-1652617264950',_binary '\�g��O�H�\�j9`\�1'),(_binary '����7dCK�<H\�w��+','2022-05-19 10:46:46.736000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/dfa90dc1-1918-4e1d-8721-8c107d87c38f-1652924806554',_binary '(�h�\�\�K��\�5}Q��'),(_binary '�B\�w&JX�r\���\�4','2022-05-19 10:50:52.991000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/9c295289-20d7-467a-9f5e-5aeaf8ad56f3-1652925052839',_binary '���_>\�Jr�G<N\�Ѓ'),(_binary '�6&\'!IƲ:��\�\�=','2022-05-15 21:16:42.696000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/0b9cb6bc-fe6a-42ce-bd36-4352ea568c99-1652617002272',_binary '��H\�\�\�N�ET�J^'),(_binary '�Ӵ�\�|O�\�ӵ���6','2022-05-18 12:21:16.705000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/eafa978d-f16e-4621-ab0e-6aac624dbb80-1652844076594',_binary 'q�}�Mz��K+J�y'),(_binary '�l,�^�Fc���&�3M','2022-05-18 16:02:20.136000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/10df9e91-53f5-4719-a089-d13b107bf88f-1652857340051',_binary '�X��HAD�t�\�xB�I'),(_binary '���n\�D�vX�\�VE','2022-05-17 12:30:23.605000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/274adf5d-bf0b-4572-a6fd-b78d95898c20-1652758223062',_binary '���/tK��~���\�'),(_binary '�\Z�ک\�MK�\�u\�\�','2022-05-18 22:55:39.214000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/80a9f104-fdac-473c-9b45-339b5a7a09ef-1652882139070',_binary '�M�AeL¼�\�Y#\�\�'),(_binary '�&ν�FL�WA��\�','2022-05-18 12:21:16.589000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/95b2abf1-3442-463d-a614-5dcc55f5c74c-1652844076424',_binary 'q�}�Mz��K+J�y'),(_binary '\�D�9\�[H2��n��.\�l','2022-05-19 20:43:41.957000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/071bd103-a18b-4591-94b1-c50a5d8bd2ba-1652960621893',_binary '��D�B|�r��g)D'),(_binary '\�ු\�Hl�t��+EMT','2022-05-20 10:21:03.688000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/ff4174a2-f44c-45db-b23c-1dc626eaee72-1653009663377',_binary '\�j\�M���gM����'),(_binary '\�\�\�f`Hi�8\�9�','2022-05-19 10:36:18.855000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/31a3a011-c790-447f-a29d-b676fcf1ac65-1652924178252',_binary '�pЪ]�Jߍ\"��!Q\�'),(_binary '˝�\�(\\Me�����1\�','2022-05-19 10:36:19.009000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/9957a0bf-88d1-48ed-9ecf-1879d4108ff1-1652924178861',_binary '�pЪ]�Jߍ\"��!Q\�'),(_binary 'τ�]�G\n�3�','2022-05-19 11:04:34.356000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/d20a9d66-81e4-4467-a8d1-155d6678fb2c-1652925874244',_binary '�\�\�&KPF\��\"\�^�'),(_binary '\�\�ᚏEV��D5�\�\�','2022-05-18 23:27:50.731000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/c385a1da-130b-4ec8-ad5c-d4b0c1ef4ee1-1652884069962',_binary '$�ۑ\�G�L���sU@'),(_binary '\�\Zs�\"�CC�\�I���\�','2022-05-17 22:47:01.633000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/1d1a94bf-368d-4c78-8856-2c01175e147e-1652795221193',_binary ']�(3�BS�\�W��X�'),(_binary '݅b�\�@DΒQpnM�\�','2022-05-15 15:52:03.322000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/5c10fcf6-0ce9-4568-bdd8-f569f8f949e2-1652597523194',_binary '\�if�LMܫ��\�X��'),(_binary '\�\�\�>�DS�zYr8��\�','2022-05-15 20:53:28.547000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/c3dc216b-feea-4e60-b1e5-45f810e69d6d-1652615608148',_binary '՗\�\�\"E��D\���ph\�'),(_binary '\�	\�%uIa�+�Y\���','2022-05-17 11:18:12.178000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/8dfb28eb-e782-4f71-a06d-26b201aea05c-1652753891672',_binary '�s\0U\� F���>c�C5'),(_binary '\�y\�lz�OO��\�rl\���','2022-05-17 22:47:22.718000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/125217b0-c05b-4d4c-b0eb-806521ccc532-1652795242609',_binary ']�(3�BS�\�W��X�'),(_binary '䛖\��@����䱯�','2022-05-18 16:02:20.045000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/f8f45283-d091-4a0f-96d3-fb23282c1930-1652857339684',_binary '�X��HAD�t�\�xB�I'),(_binary '\�oN�Dk�[S\"}\��','2022-05-15 15:52:03.473000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/81f3c602-9b72-4118-bd4c-7fe473f7c446-1652597523329',_binary '\�if�LMܫ��\�X��'),(_binary '\�?�v\npIm�6k:5\�4','2022-05-18 10:27:44.496000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/309de513-acd0-4549-abeb-7b18186423bf-1652837264370',_binary '\�V\�\�@?�?.f�@&'),(_binary '\�;8(]kJ��i�����','2022-05-19 10:42:12.391000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/5e604f58-eb6a-4686-ad09-e6ae11b5b6cb-1652924532123',_binary '\�\"�䐸K�����a���'),(_binary '\�\�\r��A���S�l�L','2022-05-18 10:27:23.355000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/743bef75-1289-4506-8ca6-ef8b4972ab17-1652837243006',_binary '\�V\�\�@?�?.f�@&'),(_binary '\��PQ�C��\�Pٙm�\�','2022-05-17 01:34:05.562000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/a23f7c93-429f-4946-a34d-faf06cad169f-1652718845013',_binary ':\nA�\�JP��2\�'),(_binary '���\�\�Hܯ��\�\�vJ','2022-05-20 10:21:03.808000','Y','https://drf5juj9r1n4w.cloudfront.net/board_image/a0e78d9e-9471-4299-a758-7c893997e6f7-1653009663694',_binary '\�j\�M���gM����'),(_binary '����߱I������$`=','2022-05-18 10:24:43.213000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/191fe547-3c85-42e0-9db7-67a4819e7d4a-1652837082757',_binary '\�TIh\�O����l�Hk�'),(_binary '��\�F+\�@�\�&Ȉc�','2022-05-19 10:42:12.764000','N','https://drf5juj9r1n4w.cloudfront.net/board_image/cb5fa35c-da49-41b2-8a0f-041e515a8728-1652924532589',_binary '\�\"�䐸K�����a���');
/*!40000 ALTER TABLE `board_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` binary(16) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (_binary '0e450d23ae884d64','https://drf5juj9r1n4w.cloudfront.net/category_image/transportation.png','교통비','E'),(_binary '13b8d980e1d540c1','https://drf5juj9r1n4w.cloudfront.net/category_image/medical.png','의료/건강','E'),(_binary '1cf959e5f1574ae9','https://drf5juj9r1n4w.cloudfront.net/category_image/cost.png','금융수입','I'),(_binary '282f6dece05f4014','https://drf5juj9r1n4w.cloudfront.net/category_image/food.png','식비','E'),(_binary '435cfde98bc84022','https://drf5juj9r1n4w.cloudfront.net/category_image/cost.png','급여','I'),(_binary '587d20d7c7894efa','https://drf5juj9r1n4w.cloudfront.net/category_image/leisure.png','문화/여가','E'),(_binary '5ec2f7ea593c424f','https://drf5juj9r1n4w.cloudfront.net/category_image/shopping.png','쇼핑','E'),(_binary '62c8a332e6a34e84','https://drf5juj9r1n4w.cloudfront.net/category_image/cost.png','용돈','I'),(_binary '65d0ee2690f44bc2','https://drf5juj9r1n4w.cloudfront.net/category_image/cost.png','기타수입','I'),(_binary '82792d4d63fc49d1','https://drf5juj9r1n4w.cloudfront.net/category_image/education.png','교육/학습','E'),(_binary '8dccdf1aae2a4dc0','https://drf5juj9r1n4w.cloudfront.net/category_image/cost.png','사업수입','I'),(_binary '8fb2815868004447','https://drf5juj9r1n4w.cloudfront.net/category_image/living.png','주거/통신','E'),(_binary 'd61821c5547c4330','https://drf5juj9r1n4w.cloudfront.net/category_image/congratulations.png','경조사비','E'),(_binary 'da5fff85a9094a77','https://drf5juj9r1n4w.cloudfront.net/category_image/parenting.png','육아/반려','E'),(_binary 'f91c1bbd98bf449c','https://drf5juj9r1n4w.cloudfront.net/category_image/uncategorized.png','미분류','E');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `chat_id` binary(16) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `room_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`chat_id`),
  KEY `FKgvc5hrt0h18xk63qosss3ti30` (`member_id`),
  KEY `FKm38tfuuhbqvc3jrrat6q4k01j` (`room_id`),
  CONSTRAINT `FKgvc5hrt0h18xk63qosss3ti30` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKm38tfuuhbqvc3jrrat6q4k01j` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `board_id` binary(16) DEFAULT NULL,
  `parent_id` binary(16) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKlij9oor1nav89jeat35s6kbp1` (`board_id`),
  KEY `FKde3rfu96lep00br5ov0mdieyt` (`parent_id`),
  KEY `FKmrrrpi513ssu63i2783jyiv9m` (`member_id`),
  CONSTRAINT `FKde3rfu96lep00br5ov0mdieyt` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `FKlij9oor1nav89jeat35s6kbp1` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKmrrrpi513ssu63i2783jyiv9m` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (_binary 'B[~�J�H�עv-','2022-05-18 22:48:15.206000','N',_binary ']�(3�BS�\�W��X�',_binary 'Sl�fS\�D��\�\�]�\��',_binary 'Ӥ\�EEXA�N\�\�\�\�)�','저 완전 가능합니다'),(_binary '�?O�sIu�\�^l�!�','2022-05-19 18:01:45.337000','Y',_binary '1 �t�&Gx�\��h�\�=\�',NULL,_binary 'K��RvO��<Jh�Ĝ','저도 치고 싶어요 채팅 남기겠습니다'),(_binary '�\�&��F]�\�\�u\�\�\�','2022-05-18 21:20:34.517000','N',_binary 'B�U%ZC�\�D�\�(',_binary 'd\�.���F��\�C�S�\r',_binary '\��F]N�)0�','대박'),(_binary '\��АB��qE��ؙ%','2022-05-19 10:37:22.376000','N',_binary '$�ۑ\�G�L���sU@',NULL,_binary 'K��RvO��<Jh�Ĝ','안녕하세요'),(_binary ')�H�o@��=uv�r.1','2022-05-15 21:54:31.987000','N',_binary '՗\�\�\"E��D\���ph\�',_binary 'p=_Z\�#Cc�0����7�',_binary '@ME�BK��u�\�fH','z'),(_binary '֢@\��A��\\\�ʮz^','2022-05-17 22:47:47.964000','Y',_binary ']�(3�BS�\�W��X�',NULL,_binary '��5J9��\���\�=\�','하루종일 있어도 되나요'),(_binary '���\ZG��\�Ƭ\�nx\�','2022-05-17 23:36:18.527000','Y',_binary '���/tK��~���\�',NULL,_binary '\��F]N�)0�','맛점~'),(_binary '\Z��ZR\0L\'�z�(C\"�}','2022-05-19 11:34:20.078000','N',_binary '1 �t�&Gx�\��h�\�=\�',NULL,_binary '@ME�BK��u�\�fH','저요저요! 위치랑 시간은 채팅으로 얘기할까요 ?'),(_binary '*!�M�BP�t\�jNV�','2022-05-18 12:25:08.945000','N',_binary 'q�}�Mz��K+J�y',NULL,_binary 'Ӥ\�EEXA�N\�\�\�\�)�','내년 말까지요!'),(_binary '+i�t\�H��:P�#Z�','2022-05-18 22:59:50.649000','N',_binary ':\nA�\�JP��2\�',NULL,_binary 'K��RvO��<Jh�Ĝ','저 같이 배드민턴 치고싶어요! 채팅으로 연락드릴게요'),(_binary ':�;¼Fp���,�5O\�','2022-05-18 23:29:21.829000','N',_binary '�M�AeL¼�\�Y#\�\�',NULL,_binary 'K��RvO��<Jh�Ĝ','저도 배드민턴 치고싶어요 채팅으로 연락드릴게요'),(_binary 'Bq�\�H��[�\�5','2022-05-17 22:47:39.146000','Y',_binary ']�(3�BS�\�W��X�',NULL,_binary '��5J9��\���\�=\�','몇 시에 될까요'),(_binary 'H\�\�1\Z;E�\�\'��\���','2022-05-17 22:43:38.295000','N',_binary '�s\0U\� F���>c�C5',NULL,_binary '��5J9��\���\�=\�','저요'),(_binary 'JwX�)H-�H�\n #��','2022-05-16 23:14:41.125000','N',_binary '�]MH��L%��(��K@',NULL,_binary '@ME�BK��u�\�fH','헐 저요 저 테니스 배우고 싶어요'),(_binary 'M_08�AL��	[\��','2022-05-16 23:14:50.502000','N',_binary '�]MH��L%��(��K@',NULL,_binary '@ME�BK��u�\�fH','테니스 테니스 스파이크 강시브 리시브 테니스 '),(_binary 'NP�\��MA�܆H\�Sp','2022-05-18 21:21:00.012000','N',_binary 'B�U%ZC�\�D�\�(',_binary 'd\�.���F��\�C�S�\r',_binary 'Ӥ\�EEXA�N\�\�\�\�)�','낄 낄'),(_binary 'Sl�fS\�D��\�\�]�\��','2022-05-17 22:51:49.804000','N',_binary ']�(3�BS�\�W��X�',NULL,_binary 'Ӥ\�EEXA�N\�\�\�\�)�','저요'),(_binary 'S\�\�s\�E�w�\"z�2','2022-05-17 22:47:55.683000','Y',_binary ']�(3�BS�\�W��X�',NULL,_binary '��5J9��\���\�=\�','plz'),(_binary 'V6�-LCR�	*\�Szы','2022-05-18 15:45:33.115000','N',_binary ':\nA�\�JP��2\�',NULL,_binary 'K��RvO��<Jh�Ĝ','안녕하세요'),(_binary 'XJnk�aB<�kui_\�)�','2022-05-18 21:16:15.896000','N',_binary 'q�}�Mz��K+J�y',_binary '*!�M�BP�t\�jNV�',_binary 'Ӥ\�EEXA�N\�\�\�\�)�','확인했습니다 ?‍♀️'),(_binary '_\�\�ğA5�,�\��jq�','2022-05-19 18:01:47.635000','Y',_binary '1 �t�&Gx�\��h�\�=\�',_binary '\Z��ZR\0L\'�z�(C\"�}',_binary '\�\�\0$TRJy�I�ͱ�\�','넵 챗주세요'),(_binary '`{\�MX\�K��A��Ŗ<�','2022-05-18 22:51:14.057000','N',_binary ']�(3�BS�\�W��X�',_binary 'Sl�fS\�D��\�\�]�\��',_binary '��5J9��\���\�=\�','채팅 드렸습니다 감사합니다'),(_binary '`\�D�%BE�_z�b�cg','2022-05-17 11:21:14.796000','N',_binary '\0�M$FH��\�E\"\�',NULL,_binary '��5J9��\���\�=\�','채팅주세여'),(_binary 'd\�.���F��\�C�S�\r','2022-05-18 21:20:16.337000','N',_binary 'B�U%ZC�\�D�\�(',NULL,_binary 'Ӥ\�EEXA�N\�\�\�\�)�','어디로 올라가면 되나요'),(_binary 'e|�+��D�B\�R�','2022-05-18 17:48:21.446000','N',_binary 'q�}�Mz��K+J�y',_binary '*!�M�BP�t\�jNV�',_binary '\�\�\0$TRJy�I�ͱ�\�','채팅드렸습니다!!'),(_binary 'j�×\�H\�9]\�\�@\�','2022-05-19 18:01:13.607000','N',_binary '� ܰ�@�Ř�[\�ؑ',NULL,_binary '\�\�\0$TRJy�I�ͱ�\�','저 400그람 사고싶어요'),(_binary 'l�\�LGyMА��eu\r\�','2022-05-17 23:47:20.498000','N',_binary '\��\�G	M���YI\�4g�',NULL,_binary '\�q�\�K���h\"m:I!','안녕'),(_binary 'p=_Z\�#Cc�0����7�','2022-05-15 20:53:33.882000','N',_binary '՗\�\�\"E��D\���ph\�',NULL,_binary '@ME�BK��u�\�fH','악'),(_binary 'zD�s,�NP�B�}/F�','2022-05-18 16:02:55.467000','N',_binary ':\nA�\�JP��2\�',_binary 'V6�-LCR�	*\�Szы',_binary 'K��RvO��<Jh�Ĝ','안녕하세요'),(_binary '|E]�<N\�0\���\��\�','2022-05-14 20:12:08.066000','N',_binary 'K\�)Uq,CE��T|:\�',NULL,_binary 'O\�\�W�DMR�P�Zħ�\�','하하'),(_binary '��\�wHVB��}�%x�w(','2022-05-17 22:47:34.534000','Y',_binary ']�(3�BS�\�W��X�',NULL,_binary '��5J9��\���\�=\�','저요저요'),(_binary '����\�WFQ�\�\�\�\�%','2022-05-18 15:45:44.322000','N',_binary ':\nA�\�JP��2\�',_binary 'V6�-LCR�	*\�Szы',_binary 'K��RvO��<Jh�Ĝ','음 안녕하세요'),(_binary '�h*�\�XM|�υ��\�','2022-05-18 12:19:08.178000','N',_binary '\0�M$FH��\�E\"\�',_binary '`\�D�%BE�_z�b�cg',_binary 'Ӥ\�EEXA�N\�\�\�\�)�','채팅 드렸습니다'),(_binary '��\��EC����\rihe�','2022-05-18 21:20:30.639000','Y',_binary 'B�U%ZC�\�D�\�(',_binary 'd\�.���F��\�C�S�\r',_binary '\��F]N�)0�','바로 댓글'),(_binary '����I2D����88aD','2022-05-17 22:48:00.378000','Y',_binary ']�(3�BS�\�W��X�',NULL,_binary '��5J9��\���\�=\�','저요 plz'),(_binary '�9\rO;�]L��v\�','2022-05-17 14:00:45.044000','N',_binary '\�wu$\�N��\�Ăܕ�',_binary '\�13�%J�����\�8�|',_binary '\�\�\0$TRJy�I�ͱ�\�','네??'),(_binary '�=\�s�\�F\�\�ء�&��','2022-05-19 11:32:23.949000','N',_binary '�\�\�&KPF\��\"\�^�',_binary '\�K�\�H����#N�\�8',_binary '\�\�\0$TRJy�I�ͱ�\�','앗 원당역이요!!!! ㅜㅜ '),(_binary '���t40L���\�]\�\�\Z','2022-05-14 20:13:08.434000','N',_binary '\��\�G	M���YI\�4g�',NULL,_binary 'O\�\�W�DMR�P�Zħ�\�','안녕하세요'),(_binary '\�w�I�\nI\n�	\�\�ԅ�','2022-05-19 20:44:37.581000','Y',_binary '1 �t�&Gx�\��h�\�=\�',NULL,_binary 'K��RvO��<Jh�Ĝ','저도 치고싶어요 채팅으로 연락드리겠습니다'),(_binary '\�y���Hy�\�\�\0\\�Ҙ','2022-05-14 20:13:24.947000','N',_binary '\��\�G	M���YI\�4g�',_binary '���t40L���\�]\�\�\Z',_binary 'O\�\�W�DMR�P�Zħ�\�','호잇'),(_binary '\�\"�3�NL5�-�-\�','2022-05-18 12:25:45.454000','N',_binary '�s\0U\� F���>c�C5',NULL,_binary 'Ӥ\�EEXA�N\�\�\�\�)�','양파 장아찌 담그려고 하는데 몇 개정도 받을 수 있을까요?'),(_binary '\�αZK@ݾ\�Lᴈc{','2022-05-15 21:54:33.963000','N',_binary '՗\�\�\"E��D\���ph\�',_binary 'p=_Z\�#Cc�0����7�',_binary '@ME�BK��u�\�fH','dd'),(_binary '\���{G9�+\��{Ũ','2022-05-19 20:44:48.331000','Y',_binary '1 �t�&Gx�\��h�\�=\�',_binary '\�w�I�\nI\n�	\�\�ԅ�',_binary '\�\�\0$TRJy�I�ͱ�\�','챗주세요'),(_binary '\�13�%J�����\�8�|','2022-05-17 12:30:45.289000','N',_binary '\�wu$\�N��\�Ăܕ�',NULL,_binary '\�\�\0$TRJy�I�ͱ�\�','저욧'),(_binary '\�K�\�H����#N�\�8','2022-05-19 11:31:51.448000','N',_binary '�\�\�&KPF\��\"\�^�',NULL,_binary 'K��RvO��<Jh�Ĝ','어디 역이죠?'),(_binary '�\�,u\�6C������틦','2022-05-18 21:23:55.123000','N',_binary 'q�}�Mz��K+J�y',NULL,_binary '��5J9��\���\�=\�','저도 줄설게요');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `heart`
--

DROP TABLE IF EXISTS `heart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `heart` (
  `heart_id` binary(16) NOT NULL,
  `board_id` binary(16) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`heart_id`),
  KEY `FK197ewge8jbxp2sfnm7f64bhdo` (`board_id`),
  KEY `FKiqbtbunbl2h0r928gnlg7ncta` (`member_id`),
  CONSTRAINT `FK197ewge8jbxp2sfnm7f64bhdo` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKiqbtbunbl2h0r928gnlg7ncta` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `heart`
--

LOCK TABLES `heart` WRITE;
/*!40000 ALTER TABLE `heart` DISABLE KEYS */;
INSERT INTO `heart` VALUES (_binary ',3\�]�E�R\�`-u\�',_binary 'B�U%ZC�\�D�\�(',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary 'W<~0fjN�\�v\�{\�d',_binary '1 �t�&Gx�\��h�\�=\�',_binary '@ME�BK��u�\�fH'),(_binary 'b��9�\�CJ��u\0\�V��',_binary ']�(3�BS�\�W��X�',_binary '��5J9��\���\�=\�'),(_binary 'pj<Z^\�E�\�&<X�',_binary '\�V\�\�@?�?.f�@&',_binary '��5J9��\���\�=\�'),(_binary 'rpSM	�\�q0\��',_binary ']�(3�BS�\�W��X�',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary 'x�/|�B��,��\�e',_binary 'q�}�Mz��K+J�y',_binary '��5J9��\���\�=\�'),(_binary '�M\�\��GR�g7_R\��',_binary '�\�\�&KPF\��\"\�^�',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�W��r�J�*c�rˌ',_binary ')\�\��\�D����Ef�c',_binary '@ME�BK��u�\�fH'),(_binary '�q)��[D��%o�ú�',_binary ':\nA�\�JP��2\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�=�)�EI*���\�\�x\�',_binary '���_>\�Jr�G<N\�Ѓ',_binary 'K��RvO��<Jh�Ĝ'),(_binary '���6?.O��+t*:�',_binary '�pK�@η\�l喢?\�',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '��\"\�hN������L�',_binary '�M�AeL¼�\�Y#\�\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�\�\�,fN�����ƻ��',_binary ']�(3�BS�\�W��X�',_binary '\�q�\�K���h\"m:I!'),(_binary '�Y��m�Ny����X��K',_binary '(�h�\�\�K��\�5}Q��',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�&\�\�Fݳ\�\0&\�\�',_binary '\�wu$\�N��\�Ăܕ�',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '���+\�E��o����',_binary '�\�\�&KPF\��\"\�^�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�py�gO��z��E\�\�\�',_binary '1 �t�&Gx�\��h�\�=\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'п�+\�^D)��叢�',_binary '�s\0U\� F���>c�C5',_binary '��5J9��\���\�=\�'),(_binary '\�\�%\�\�C@<���\�qu�3',_binary '$�ۑ\�G�L���sU@',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'ѭ\�\�KνgT_�Ot�',_binary 'q�}�Mz��K+J�y',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\�Jȍ[+GI�\�\�\�t\�',_binary '���/tK��~���\�',_binary '\�q�\�K���h\"m:I!'),(_binary '\�\'�0\n3D�\�ҏ\r�υ',_binary '́��\�Fڒh$����\0',_binary '\�q�\�K���h\"m:I!'),(_binary '\�\�;D�I��\�\��=S',_binary ']�(3�BS�\�W��X�',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\�\��\�fG�+g�\�)_',_binary 'B�U%ZC�\�D�\�(',_binary '\��F]N�)0�'),(_binary '\�\���L4��\�\'�9',_binary '\0�M$FH��\�E\"\�',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\�\�a�<�DH�{�\\�!�',_binary '�\�\�-NOS�\�R-�)�T',_binary '\�q�\�K���h\"m:I!'),(_binary '\�\�N\�J\���~w�A\�',_binary '���/tK��~���\�',_binary '\��F]N�)0�'),(_binary '\�S\�#C��\�q� ��\�',_binary '\0�M$FH��\�E\"\�',_binary '��5J9��\���\�=\�'),(_binary '깣\\@tJ����~!�',_binary '\�\"�䐸K�����a���',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��\�MiL��\�	\�7P!',_binary '�s\0U\� F���>c�C5',_binary 'Ӥ\�EEXA�N\�\�\�\�)�');
/*!40000 ALTER TABLE `heart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `member_id` binary(16) NOT NULL,
  `budget` int(11) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `dong` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `kakao_id` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `salary_type` char(1) DEFAULT NULL,
  `surveyed_yn` char(1) DEFAULT NULL,
  `working_hours` int(11) DEFAULT NULL,
  `depth1` varchar(255) DEFAULT NULL,
  `depth2` varchar(255) DEFAULT NULL,
  `depth3` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (_binary '\0y�@�I0�B��U�}E',1000000,'2022-05-12 22:21:46.384000',NULL,NULL,NULL,'c6YMk2ZHGi6kSQabB-pNF8:APA91bGdjcGCqxLh55l6YEzZ102EBCqSB8CuM9-A6Al93R1g2e0B7gaTm5q_obnR3xrwEbUs6KtVJxEJYzykB-ft8aOCtgkbjpFRy8eNfPD4yyzpmInFRoJAwGozJuSce04RO2Jx2ej_','2239746209',NULL,NULL,'타타',NULL,2000000,'M','Y',8,NULL,NULL,NULL,NULL),(_binary 'Q��L����j\�v',NULL,'2022-05-17 11:48:16.484000',NULL,NULL,NULL,NULL,'2238560447',NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM5NjUyOTd9.9_8bmbqFHIi9geA84ZuAk1fbhNKQZ6zc420EWu57Cw1BWl_E8ADtc8M_jeE9KUAMIDl2o0hBF1vophHchEIf-g'),(_binary '	l��YIA�j<��\��',NULL,'2022-05-20 01:11:12.290000',NULL,NULL,'meanstrike@naver.com',NULL,'2249395400',NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxODYyNzJ9.t552bZi8rfrm8eTxBkEbsxTgSJBBeSsgViAwUkHzdlYXoOvlfoDFn-IDn_f_60TP8-dlaKSxqJEfcQPH6sQsGQ'),(_binary '@ME�BK��u�\�fH',600000,'2022-05-06 21:08:24.918000',NULL,NULL,'zummy@kakao.com','eyt2i6UgJMLXod5J_kA68O:APA91bHtlWhaE14xv-iF2yUhuflrbTkBihv--IlWTLZrTALRhohv2osEviqtiHULdJyS8k-jSW59e_g2b3l4BznPbbZl1Wo0VR0r2PC7VSQwCB-6Y75rn8xijq8HicqiMv4isDFYpN_6','2225262405',37.6974875,126.8421719,'ㅅrㄹ67r득','https://drf5juj9r1n4w.cloudfront.net/profile_image/f9c0dac4-f64a-45c6-be8d-f7b168cd3259-1652927701320',1000000,'M','Y',40,'경기도','고양시 일산동구','사리현동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwODcyMjJ9.CbEfM4JhOk2WZmgzsXHzufZGNRVsrm6XNV4RscD-mCNZmqtgPTOI8HtFAwWz4YYy40-HLZ2hibrgmk-u57lwhw'),(_binary '\0�|L@B���Bh皀�',NULL,NULL,'2022-05-09 14:11:31.274000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '\'�,\0\nHN�\�~��$�',3000000,'2022-05-20 01:11:25.754000',NULL,NULL,'qweadzs@naver.com',NULL,'2249395520',37.6278196,126.7064952,'박현우박',NULL,8700000,'M','Y',30,'경기도','김포시','북변동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxODYyODV9.M3m6sBAMoLPzvmkKLFx1LmGyZWQUhcbc9U4Ktydmg_1FYWWbJFvnQq8NcPZvcZ8oa21a4FjFzD8WPKOvEkv9Dg'),(_binary '.Wz�mBv�>\��)��@',10000,'2022-05-15 13:59:47.599000',NULL,NULL,'hnpaula@naver.com','dhylRAYZtsokSEqdMKF8by:APA91bEQLl0twTyKZlNQB2PTrRIPMyIJ6_Z2GrK6PKBpaUHSaXyTYsBwc7PvUH_U_lZPHkB7VsRfIJDbK3VVhtIFGakA-O3uhg9GQULPSqv0SOUfU6Ut3frkMOmAApDgsEI5Q-ADHdyw','2242995677',NULL,NULL,'랴됴묭',NULL,NULL,'N','Y',NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4MDAzODd9.FnPEirUahoPWnGDa5mLKItx7u5W4zpBKZhREROomJfpRpQKKUyFYnJaJrlFFzk0Gk6l8LJl423taJ9PTNVGurQ'),(_binary 'A$�\�C�I.��´�0',NULL,NULL,'2022-05-13 22:58:18.024000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary 'B@{��E_�E\�\��',1600000,'2022-05-09 15:54:49.545000',NULL,NULL,'rxplus2019rxplus2019@gmail.com','dh6_Lo9R5tJqOP43JrCvVN:APA91bFbT13VhDmrjaU2a6d7JPCoRbIGXF7WW249QqQ0eepCEwI-qES-JUGy71-ojlrTcPWsxp0IGMo6e05gU9OMo7rAzT9N57epSpXqTKqZCoSHgSsuTjIN3al_KglvIJhX698blznH','2235189413',NULL,NULL,'johndoe',NULL,8000,'H','Y',7,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwOTgwMTh9.31maWXgZStWRJPuW964Xv3PyeYcHI9NGazcrxRJLanCN1oHgS1Eb700p1c1Zpt8eTeQcmoWO0pUb15MUi3PHCw'),(_binary 'EЛ��jBC��&\�\�\�Y<',100000,'2022-05-09 22:16:03.181000',NULL,NULL,NULL,NULL,'2235681024',NULL,NULL,'염탐',NULL,1000000,'M','Y',100,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwNzUyMjh9.XxovjKr7g0F5rK21EEdyH03K8x5-Tha5KSHF7A8ujXKwFjTe7HY11kLsJ-LOtBW0hpF2aRoHUPiDjtmxInJ5hw'),(_binary 'K��RvO��<Jh�Ĝ',600000,'2022-05-13 15:01:58.948000',NULL,NULL,'labyrinthird@gmail.com','fmUcZa-2BFTY7SnGdhSHY9:APA91bG6XC8HHSk91ckFSygCL6QWp69uc_bIv6vYg3K7pdizjKuQhid8-EVjRjP4UjKENjVqDFnRFZiyO4HhlEQQm2xCE9da1mc2bw2QLXoP_CeBty4Ths39KYdWGQ3bD4a2aY-9Gfxc','2220918552',NULL,NULL,'성재','https://drf5juj9r1n4w.cloudfront.net/profile_image/0039c2b6-a7ec-4cba-ad28-11ad1506346e-1652853838985',1000000,'M','Y',40,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQyMjExMDZ9.z_-qHl-DyfSb0VKTSNEmDtkpB7JeYWi5sF7BoSy9wFS7a5rHeyXjZQj8y5TnXMo5Veha0fwayfYeSGO9OGHISA'),(_binary 'M�(A�C����b�R',3000000,'2022-05-12 20:10:05.432000',NULL,NULL,'gjinpark@naver.com','dINWgy80GzoHgwk3g7GbwY:APA91bH_3NflGtpIr5K_aYpnGoy7xmkie-vvVIPpam91Yg3Da2HZASjIgFTaeAkcu7JMRrTbV9BmS2b7mKvcisZdVkn0Om-uEl7ZEx03ZNrbKNvIZzk2vseQ2LboDS3vQi8Yone_4Fk0','2239574634',37.4496559,127.1736181,'승규짱',NULL,4000000,'M','Y',44,'경기도','성남시 중원구','금광동',NULL),(_binary 'O	�4j�A��F��S\�',500,'2022-05-15 16:57:01.371000',NULL,NULL,NULL,'dsi3b-3c8BAU-Sns5EtGXo:APA91bGaSWXRr_jTN19UNYCFfkE4vYLJqJL1aOQ8EcA0jMPde9qw2vTLnuUUVvgtN30qRiEJhQZpIGziTwTEOOKnY90OkG1NR4qvSAHTMMZ-4L_2UcV83kvm6Kr7061hJPl-h74jY7Xw','2243226349',NULL,NULL,'요조숙녀',NULL,1000,'M','Y',52,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4MTEwMjF9.VvURhBf-z2da3WHlBCUKApSFrFeYLUOsN7EWCsiR5BX8avqJ2KFHzz5Zp4o6LOgKnpZ79T_k9c_Wgn_fsg9BVg'),(_binary 'O]\�\0�D�����\��',NULL,'2022-05-13 11:19:40.830000',NULL,NULL,NULL,'eH6I3zH6mNgZMqdSm-e4Sw:APA91bGxsNzrhxfUlCaQeo47urEoUshA26BRIPSbOJ_dHLczT37IAl0D_5Xp8UKZZQY2EhbkRdtsZv2np-TWImx-pD2sfDtkMk9ZHE8EA_9mqt5nY4ss1N20U2R8YqDrwFXQYc1fjTCm','2240244292',NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,NULL,NULL,NULL,NULL),(_binary 'O\�\�W�DMR�P�Zħ�\�',NULL,NULL,'2022-05-15 15:12:53.934000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary 'V�\��\�O#�\�Ws����',2000000,'2022-05-15 14:29:59.742000',NULL,NULL,'happylan68@naver.com','c7ExDRy6S5BFaS7eJKQqWk:APA91bEk-MDCAJOMywfsoLNARnfZ8r6yK_3i5U5GOEULUOdjNsYhbCFGzca-jMjYYKxlT8Zy9ft3XzGJz-A4IS4DDVVTacrd1mem95ARddhPkW4mK00Xj7PfKB9xWdeyy3DllocLjsSj','2243035401',NULL,NULL,'인생은사랑',NULL,5000000,'M','Y',50,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4MDIxOTl9.CjRPcK8LKQysrJnoXpYn8rvhOpeN2bjtboTsIGeIPnDcVmtH0uPuKV6Z9Yc5Cn7HSPJZfzsxJNY31-tA0dEKbQ'),(_binary '^�ū�WFG���S,\�',NULL,NULL,'2022-05-10 20:31:53.039000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary 'c\��\��NR��:�\�9#',NULL,'2022-05-10 14:10:18.903000',NULL,NULL,NULL,'cqegTkcIg6zMTqzpaDqguh:APA91bHBonG7ar6nOTEQsesIVwZ3n_pFIgv_h_DsAwlNmFFWpGd5oUbByzUOV3hSpSzmZFiisX8wKmbxYKL6UjLlaByHueNW2ZkIFEi3fmmM4IPgp3msdkhJydpDeJ1JpkOHtVytmMOd','2236383972',NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,NULL,NULL,NULL,NULL),(_binary 'p\�J�,oNք�r?\�˱\�',NULL,NULL,'2022-05-10 19:54:32.271000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�\��\�YJ��	(Ń\'F',1000000,'2022-05-13 03:10:55.895000',NULL,NULL,'gganzii@naver.com','fd7mqgCtmKh2awkTttluil:APA91bGwuobf1nK7q9addNAJiGVU7XsHFG7-6uNrVx8UHiJ7lJUwboCWyfRQXTUdRo8gv2yGGu8iDjOdsUhJIbR5_dxwwdHA356BmJTH-llicDFtz7PSCNe3o1sjYq_3uqgi46-PUcMS','2239960902',37.5682,126.9977,'아기돼지','https://drf5juj9r1n4w.cloudfront.net/profile_image/e191cff5-7fed-4e37-a20e-2931064f8144-1652379100971',1000000,'M','Y',40,'서울특별시','중구','주교동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4NDAzODd9.Hmhr65Jz2o88KwRXZGStnPOTAHr33ztZOtymSDTbnzi5R00qKs26LHePHjGGqt8ctUKq3Dld8t5sJ0-9bOPENg'),(_binary '�\�Aj\�E��\�\�0\�',2200000,'2022-05-16 14:55:57.825000',NULL,NULL,'qnqkdms@naver.com',NULL,'2244482582',NULL,NULL,'으나',NULL,9560,'H','Y',50,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4OTAxNTh9.raPvOuupHx6VVvrgwNv0BH6Zdi9hkKe-EacxVKrcJ0f9ZJ5wse0YjoIHLo3G_XEmE--GlMsMUHjvjMf9ETF8gg'),(_binary '�\�9>`�J��.c',NULL,NULL,'2022-05-10 20:33:24.938000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�e4\�87K���\n��$}�',1000000,'2022-05-12 20:11:54.574000',NULL,NULL,NULL,NULL,'2239577025',37.4496202,127.1735563,'엘리스',NULL,1700000,'M','Y',40,'경기도','성남시 중원구','금광동',NULL),(_binary '����\�\�Gx�\�\����',400000,'2022-05-17 10:27:05.637000',NULL,NULL,NULL,'f7zNikqxS-p57BUwZGtvMZ:APA91bH1kNCaduRXBVj2TEKE-Q2gF8eg1VKJ-8et5J8wSFW6PN6Z8cJxOjQrM8umM1t1oD2CQUUrizs0FGHzwdYVKf4LmruZfpq-xJV85bnPatf71HzKn2otpSWB7rsOnfSdP1180iyn','2245507459',NULL,NULL,'ssf',NULL,1000000,'M','Y',40,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxMzYyMjd9.SYL_F1eAfW4C9Z4T2zR4gbiZbF_mXb6BA6IlPiDuhMY0nGUSlOcbmiyGlHWj1tG_JOJj8fr3-6D5mHcofyR8iw'),(_binary '��\�yFDH��(W�1	�e',NULL,NULL,'2022-05-10 20:22:07.838000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�4\�C��@��뇋?.#�',NULL,NULL,'2022-05-10 20:27:36.715000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�}̩\�\�J�\��cby',1200000,'2022-05-16 12:09:01.830000',NULL,NULL,'edicius0504@gmail.com',NULL,'2244240920',NULL,NULL,'쿠쿠쿠쿠',NULL,9160,'H','Y',30,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4ODAxNDJ9.61iThzdGNFKPAMm33mDcEo6VtrArh_St0qW2SrDw7x53S26UpFc8P8ZhrQOByxWrlysA1TO8TamSKQHJNz6G6A'),(_binary '���ft0D^�.u��\�v�',NULL,'2022-05-08 14:30:29.444000',NULL,NULL,'sunder93@hanmail.net',NULL,'2233715446',NULL,NULL,NULL,NULL,NULL,NULL,'N',NULL,NULL,NULL,NULL,NULL),(_binary '�\�\�4:A\n�$e쳃T�',100000,'2022-05-12 20:10:00.182000',NULL,NULL,NULL,NULL,'2239574547',37.4495383,127.1735346,'박승규',NULL,NULL,'N','Y',NULL,'경기도','성남시 중원구','금광동',NULL),(_binary '��5J9��\���\�=\�',900000,'2022-05-13 22:58:20.689000',NULL,NULL,'judybudy97@naver.com','fC6C7gQydiyDW7_W4TVDQn:APA91bFCZKOa4cRXUqIH7cFDNi5b8pakZPvvmtzp60mX8uFsPaqcu8thkcPoErJPr42zkI4q2CB_JyACQ9Fw8SpK_fLt35KaSpgdAy8PeedUjlC95tsEaN_AiYncl9pOzPoXUgk7uEgO','2223263392',37.3210057,127.0936762,'딱지맘한싸피','https://drf5juj9r1n4w.cloudfront.net/profile_image/9e9daef4-2b4e-4ae4-8b81-aa06c6507d14-1652837339638',1000000,'M','Y',40,'경기도','용인시 수지구','풍덕천동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwOTE0MDZ9.ukKSKtcH4od_7H398jyMXGGFFma1KzUcJmsQNa3If2KpeWnsCgOTuRrN9hpAdzgkyZd-UVffxuUsQjIfAAowfA'),(_binary '�d�=رKV�(\0�\"ag3',NULL,NULL,'2022-05-10 20:27:06.583000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '��}�sU@�\�J˦\�',NULL,NULL,'2022-05-13 11:24:17.628000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�¤ۑBT�ޙ���',2000000000,'2022-05-11 10:07:54.457000',NULL,NULL,'megahawk@daum.net',NULL,'2237424696',NULL,NULL,'10000',NULL,1000000,'M','Y',100,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwNDg3ODh9.IG5SBKzrQb7PPxDniNuKnO39Bgg_guZIF6wYyowCFPQN_q8dFLahpee83iITsN1qh24dqSCaKinVz1oAM05jXg'),(_binary '�\r\�njcM��)�Ppk�',NULL,NULL,'2022-05-13 15:01:48.810000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '�.\��\�NK�ۉ���c\�',110,'2022-05-16 15:30:38.656000',NULL,NULL,'kong20011013@gmail.com','dfOl4d2djB3m5OBVBp8MDW:APA91bG9oflCVtLKGdlFg3BgaxUTO1i7rkbA9Z3zrTyWl5QF_D6V7YszNy2fC0eAKYUdmhjwTSlPrfos2Wk1BkIcTzFgeuZYhxmMJ30hhSRNkYBgmEMUAcElwNNLG4mu3LE7hWI8Mhfc','2244529360',NULL,NULL,'공혜진',NULL,NULL,'N','Y',NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4OTIyMzh9.mVvDNIbT8u7Rq-NQmTVsq9k7TTp0Ru_zAbKEqzOo7ZbkkfhrheIM5ClGdB6aF-0NPByXY18w2Zq3XTErB0af6w'),(_binary '�^�g�@E��\���i',NULL,NULL,'2022-05-09 14:11:19.759000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '\�\�|J\�)J��o&Z#&\�\�',10000,'2022-05-16 14:24:51.006000',NULL,NULL,NULL,'df457NslsWc-t2l6zryF6f:APA91bFPxkZHqDYkNO-KCkrclcXtO-36YumTLHfnbfv7ZaTq7G3HcG9Hd8duNQcGV8YmJ3zdAurjpmOwav-T08KpyqqLrhHr3lz2608P23Cey7EVHCnArWNnbpXy9wKusKp6-9nzOLHB','2244439155',37.5768249,127.0507572,'월월월',NULL,3500000,'M','Y',8,'서울특별시','동대문구','전농동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4ODgyOTV9.-41AL0VXfRFhhuqF44q7aWG6rHgxMAHBqkFuZZzDWqLk5B69MIYI2p88kj3eFZK8O3iYVyZi8MchIQGi2qrfIg'),(_binary '\�\��`��Mo��b˶��;',100000,'2022-05-12 22:19:58.424000',NULL,NULL,'sny3238@gmail.com',NULL,'2239743737',37.5062528,126.7269632,'ㄴㅇ',NULL,NULL,'N','Y',NULL,'인천광역시','부평구','부평동',NULL),(_binary 'Ӥ\�EEXA�N\�\�\�\�)�',300000,'2022-05-17 22:50:46.445000',NULL,NULL,'g2hhh2ee@kakao.com','fC6C7gQydiyDW7_W4TVDQn:APA91bFCZKOa4cRXUqIH7cFDNi5b8pakZPvvmtzp60mX8uFsPaqcu8thkcPoErJPr42zkI4q2CB_JyACQ9Fw8SpK_fLt35KaSpgdAy8PeedUjlC95tsEaN_AiYncl9pOzPoXUgk7uEgO','2225558097',37.3210057,127.0936762,'샘숭','https://drf5juj9r1n4w.cloudfront.net/profile_image/4f4ab7c5-cac5-4ce7-9070-52aa5d685f24-1652881632241',1000000,'M','Y',40,'경기도','용인시 수지구','풍덕천동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQwOTExMDZ9.02gVGjBgUhMScqlEOUgH_yuMfXOyo-KkGDjvS5kEb9cWQbaujcCmtXRZzilTFryLPFWZ1iUyevqZ8eQzbF90wA'),(_binary '\�Ȣ\�\n\�I_�!��\�\���',50000,'2022-05-19 15:14:00.318000',NULL,NULL,NULL,NULL,'2248676951',NULL,NULL,'coach',NULL,NULL,'N','Y',NULL,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxNTA0NDB9.tQ1nVKbIAo7JWTWQ52VRuIbFUXoaDrNnaTtDkY-QrTVoE8IyccRjTiB77-TBZ543MIPwLeWfShr8NRg2XXEUgQ'),(_binary '\�\�\0$TRJy�I�ͱ�\�',500000,'2022-05-06 19:34:37.676000',NULL,NULL,'beupthere@gmail.com',NULL,'2225622483',37.6975105,126.8421847,'로키맘','https://drf5juj9r1n4w.cloudfront.net/profile_image/a27bac9d-2989-4929-8aed-4573f4279706-1652951158194',1000000,'M','Y',40,'경기도','고양시 일산동구','사리현동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxNTQzODN9.Ji_wytLoCG6gs-mO-eP83y-j6cojMVdnfxrr-2QQsF73ixhbk2Jorr9jDswSbeGoiJ3A5a3NxzCaVRNS4-7MXg'),(_binary '\��F]N�)0�',1000000,'2022-05-10 20:00:51.219000',NULL,NULL,NULL,'ec_P-KCQyhoCwS96KBWyjx:APA91bFKTRs_WYfYOkMFu8nJztCtTbpQGvvjC-LNcGQ_M9lNs4gTSm7j26d6T4IUiZIQJU6QL3y85bh8OtumXj3iXbipdePO7168eTjLze1WWfGzIl2zn1xGFn2aqVTNylZDYQNElpv-','2219502378',37.3210057,127.0936762,'JeBalJC','https://drf5juj9r1n4w.cloudfront.net/profile_image/0bf2cc9b-0e4f-44ca-ad0d-0fc662ef565a-1652882450590',0,'N','Y',0,'경기도','용인시 수지구','풍덕천동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxMzgxMzZ9.HRrjDk3AFRg8NWOwYHXzdWtaMWfKrpzpM85AozhAObjaQFFYFtswJw8uvJKFcsELtWRCepZPYxE_Da5oHWW4Pw'),(_binary '\�\"ͮ��N��.q0�\�\�',NULL,NULL,'2022-05-06 20:57:59.505000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(_binary '\�q�\�K���h\"m:I!',600000,'2022-05-15 15:12:55.625000',NULL,NULL,'lovesu5632@naver.com','eF8EaJ76VLkzXLV-ibR7yU:APA91bGtl4tporLc7bwKwE9hg3yBq1xvzetSRmrQGV5SplKxlrCABtqFyt2OgZq3aeM5gcStJ3vnXz0YhsjRT99ATosCI2SyJkincdvS7k0T2FZTm3X4jrQXAijSyszW6vZ-FJZIhmQy','2225631795',37.6974875,126.8421719,'화이팅',NULL,1000000,'M','Y',40,'경기도','고양시 일산동구','사리현동','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTQxNDg2NDl9.3qhcPYAfTj1eutc6Ihzu4967O7HSKzIBj5_omIJAXDiJMxR309oMGl26LcBk5jcx4C2ur7bursW70fXCe0Z7XQ'),(_binary '�ƪ��_K�r�\�S�\�w',500000,'2022-05-15 14:26:57.558000',NULL,NULL,NULL,NULL,'2243031499',37.277952,127.9093656,'판뎅',NULL,NULL,'N','Y',NULL,'강원도','원주시','흥업면','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4MDIwMTd9.MqwlBAKDH77gsnZd4g1H-ZrDaEDf8SNPFW2KBQwvyeeZKgyhmQivyx08VtMy2dCac_5nS8Fq2LIxabsNS9P0AA'),(_binary '�\�P��@ұl\�97B\\',1004,'2022-05-16 14:41:52.805000',NULL,NULL,NULL,NULL,'2244463105',NULL,NULL,'주미사랑',NULL,1004,'M','Y',1,NULL,NULL,NULL,'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2NTM4ODkzMTN9.LO17fn_tQWBmsoVNAl0NbSDIp7kFRsc7QVOrq3jzGX2v_7T9ghJGgLcUFTEDa_HtYtkcv7WrdWOs7GGCI-TLkA'),(_binary '�ތ\�Ao����W�',NULL,NULL,'2022-05-12 23:40:41.492000',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `push_alarm`
--

DROP TABLE IF EXISTS `push_alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `push_alarm` (
  `push_alarm_id` binary(16) NOT NULL,
  `account_alarm_time` time DEFAULT NULL,
  `account_alarm_yn` char(1) DEFAULT NULL,
  `todo_alarm_time` time DEFAULT NULL,
  `todo_alarm_yn` char(1) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`push_alarm_id`),
  KEY `FKp9dtybwd2q9y27ogikaqng1bd` (`member_id`),
  CONSTRAINT `FKp9dtybwd2q9y27ogikaqng1bd` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `push_alarm`
--

LOCK TABLES `push_alarm` WRITE;
/*!40000 ALTER TABLE `push_alarm` DISABLE KEYS */;
INSERT INTO `push_alarm` VALUES (_binary '\0�z{\0\�E\�].c�E\�','21:00:00','Y','09:00:00','Y',_binary 'O	�4j�A��F��S\�'),(_binary '���	0Nٯ?\�}�%e','21:00:00','Y','09:00:00','Y',_binary '����\�\�Gx�\�\����'),(_binary '\"��F\�/@��%�\'9o�>','21:00:00','Y','09:00:00','Y',_binary '���ft0D^�.u��\�v�'),(_binary '#\�5�!�J,�\n_�Z�','21:00:00','Y','09:00:00','Y',_binary '�\�P��@ұl\�97B\\'),(_binary '%\�\�F%%F�����{��\�','21:00:00','Y','09:00:00','Y',_binary '\�\�|J\�)J��o&Z#&\�\�'),(_binary '1\�\�\�1E&�@{!]��','14:23:00','Y','15:06:00','Y',_binary '@ME�BK��u�\�fH'),(_binary '4\�\�\�S\�FM�\r\�\��\�','21:00:00','Y','09:00:00','Y',_binary '\�\��`��Mo��b˶��;'),(_binary ':�=sAHq��\�\����','10:10:00','Y','11:06:00','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'C\��~��G~�AS����\�','21:00:00','Y','09:00:00','Y',_binary '�\�\�4:A\n�$e쳃T�'),(_binary 'M\�&\�ϦCڴT�-�\Z','21:00:00','Y','09:00:00','Y',_binary 'EЛ��jBC��&\�\�\�Y<'),(_binary 'P\�kشL��~H��\�$','00:14:00','Y','00:15:00','Y',_binary '\��F]N�)0�'),(_binary 'Tea�\�Hܸ&�F\�','21:00:00','Y','09:00:00','Y',_binary '	l��YIA�j<��\��'),(_binary 'V�\�L��7xc�\�L','12:34:00','Y','12:34:00','Y',_binary '��5J9��\���\�=\�'),(_binary '[�dp\�UO�y�e�+�Q','21:00:00','Y','09:00:00','Y',_binary '.Wz�mBv�>\��)��@'),(_binary 'd.ƌ6\�A�����\�\�','21:00:00','Y','09:00:00','Y',_binary '\'�,\0\nHN�\�~��$�'),(_binary 'i\�6ILb��\�\Z�|�','21:00:00','Y','09:00:00','Y',_binary 'c\��\��NR��:�\�9#'),(_binary 'mh�\�62K~��y�\��','21:00:00','Y','09:00:00','Y',_binary 'V�\��\�O#�\�Ws����'),(_binary 'sd\�\�&M���oeXX*','21:00:00','Y','09:00:00','Y',_binary '�\��\�YJ��	(Ń\'F'),(_binary '}�\r�\�\�@��$�2�\�\�!','21:00:00','Y','09:00:00','Y',_binary '�¤ۑBT�ޙ���'),(_binary '�b\�\�O(��T\�\�\�<','21:00:00','Y','09:00:00','Y',_binary 'Q��L����j\�v'),(_binary '��X\��\�G���6�U\\\�','21:00:00','Y','09:00:00','Y',_binary 'M�(A�C����b�R'),(_binary '��Mm�H����4$�','21:00:00','Y','09:00:00','Y',_binary '�e4\�87K���\n��$}�'),(_binary '��\���+Nʦ+.~w�\��','21:00:00','Y','09:00:00','Y',_binary '�\�Aj\�E��\�\�0\�'),(_binary '��\�ԽC��~��?��','21:00:00','Y','09:00:00','Y',_binary '\0y�@�I0�B��U�}E'),(_binary '��H��C��|֛p� \�','21:00:00','Y','09:00:00','Y',_binary 'O]\�\0�D�����\��'),(_binary '�k��!nEa�\����\�z','21:00:00','Y','09:00:00','Y',_binary '�.\��\�NK�ۉ���c\�'),(_binary '�3\"�TPI;�{��oE�\�','21:00:00','Y','09:00:00','Y',_binary '�ƪ��_K�r�\�S�\�w'),(_binary '�qO\�xK\\��>f�*x�','21:00:00','Y','09:00:00','Y',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary '��L=S�J��\�m5��','21:00:00','Y','09:00:00','Y',_binary 'B@{��E_�E\�\��'),(_binary '�O���\�I\�\�\�R\�^�','21:00:00','Y','09:00:00','Y',_binary '�}̩\�\�J�\��cby'),(_binary '�\'D\�I\�֝4���\"','21:00:00','Y','09:00:00','Y',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '��-O\"O{��\�}#��','21:00:00','Y','09:00:00','Y',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�R��\�Hĵr\�Dȍ','17:33:00','Y','09:00:00','Y',_binary '\�q�\�K���h\"m:I!');
/*!40000 ALTER TABLE `push_alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `room_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `member_id1` binary(16) DEFAULT NULL,
  `member_id2` binary(16) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FKdnlsx1bwfootirpep5u57enq6` (`member_id1`),
  KEY `FK9u8sgb3nwkp2e9ueb7bca2x6d` (`member_id2`),
  CONSTRAINT `FK9u8sgb3nwkp2e9ueb7bca2x6d` FOREIGN KEY (`member_id2`) REFERENCES `member` (`member_id`),
  CONSTRAINT `FKdnlsx1bwfootirpep5u57enq6` FOREIGN KEY (`member_id1`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (_binary '\�sw�l\�E\'������+x','2022-05-20 10:21:49.753000',_binary 'K��RvO��<Jh�Ĝ',_binary '\�\�\0$TRJy�I�ͱ�\�','2022-05-20 10:22:08.793000');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routine`
--

DROP TABLE IF EXISTS `routine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routine` (
  `routine_id` binary(16) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `repetition` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`routine_id`),
  KEY `FK546lpheu7wdmjm1fj26wpyno2` (`member_id`),
  CONSTRAINT `FK546lpheu7wdmjm1fj26wpyno2` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routine`
--

LOCK TABLES `routine` WRITE;
/*!40000 ALTER TABLE `routine` DISABLE KEYS */;
INSERT INTO `routine` VALUES (_binary 'h�3O�MȨ\\e�S��<',NULL,'2022-05-19 10:19:40.434000','N',4,'신속항원검사',_binary 'O	�4j�A��F��S\�'),(_binary '�c٭%M��ڽ�\��H(',NULL,'2022-05-18 10:35:33.451000','Y',2,'교수님 미팅',_binary '��5J9��\���\�=\�'),(_binary '\rA\�oR\�Hh��`}�\\Q�',NULL,'2022-05-15 22:53:39.303000','N',62,'프로젝트',_binary '\�q�\�K���h\"m:I!'),(_binary ' ��2b�GR�\�gϒ�,�',NULL,'2022-05-19 15:14:52.529000','N',62,'출근',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary ')m\�Q�C6�+��AT�',NULL,'2022-05-19 10:46:39.184000','N',34,'일반쓰레기 분리수거',_binary 'K��RvO��<Jh�Ĝ'),(_binary '0<}��F鞌\�Ye~\\',NULL,'2022-05-19 10:33:48.919000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary '9\�o+\�HD�V%����',NULL,'2022-05-19 11:20:35.360000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary ':\��U��C?�\�\�I\�}M',NULL,'2022-05-18 10:38:30.791000','Y',8,'리포트 제출',_binary '��5J9��\���\�=\�'),(_binary '>6,�UEļ@��n\�\�N',NULL,'2022-05-18 10:34:35.614000','Y',48,'알고리즘 스터디',_binary '��5J9��\���\�=\�'),(_binary 'A��OK*E\��V ۚ',NULL,'2022-05-18 10:34:23.859000','N',16,'기타학원',_binary '��5J9��\���\�=\�'),(_binary 'U+�\�	\�Iߥ\�6\�,h\�\�',NULL,'2022-05-19 15:15:02.684000','N',62,'퇴근',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary 'Uc��\�/Mp�_nD5\�#',NULL,'2022-05-15 15:40:32.806000','Y',127,'오전 스크럼',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'W��\\m^NϣE�A7\0W',NULL,'2022-05-18 10:38:21.308000','Y',8,'딱지 이빨 닦기',_binary '��5J9��\���\�=\�'),(_binary '[��\�@O���\�.U��',NULL,'2022-05-18 15:59:43.010000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'e�UCm�G4�Y�x\�',NULL,'2022-05-18 21:43:59.540000','N',2,'? 치팅데이',_binary '��5J9��\���\�=\�'),(_binary 'j����EϢ�y~\��B\"',NULL,'2022-05-11 10:10:43.244000','N',4,'오늘할일',_binary '�¤ۑBT�ޙ���'),(_binary 'q�E��\nNS�\\�u��͓',NULL,'2022-05-18 21:47:10.101000','N',8,'분리수거',_binary '��5J9��\���\�=\�'),(_binary 'sf\�\�0Lӹ�\�	5\�U',NULL,'2022-05-14 20:51:11.811000','N',65,'청소',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary 'vYr\n��H\�\��_5�\�R',NULL,'2022-05-18 21:45:09.242000','N',8,'우리집 코딱지 이빨 닦기 ?',_binary '��5J9��\���\�=\�'),(_binary '�Gp��EƖ\�\�Mw�g',NULL,'2022-05-19 10:48:55.024000','N',127,'알고리즘 풀기',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�{�=C3�=�\n͚',NULL,'2022-05-16 13:15:48.886000','N',32,'팀장 미팅',_binary '\�q�\�K���h\"m:I!'),(_binary '�p�A:�C��)\0�e�	',NULL,'2022-05-19 10:48:30.888000','N',1,'화장실 청소',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�|9\�\�M�-� �\�B',NULL,'2022-05-19 10:47:47.323000','N',8,'재활용 분리수거',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�%���F��J7�?\��\�',NULL,'2022-05-19 10:48:41.020000','N',20,'러닝',_binary 'K��RvO��<Jh�Ĝ'),(_binary '���\0%\ZOK�Ĩ^�MH',NULL,'2022-05-16 13:16:17.109000','Y',32,'얍',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�/�e\�Fu��CE^�\�',NULL,'2022-05-18 21:48:21.217000','N',43,'조깅 = 아침(조) + 달리(깅)',_binary '��5J9��\���\�=\�'),(_binary '�<\�\��I7��~]n\�\Z',NULL,'2022-05-20 10:19:12.641000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�\�8\�@NT���+6ԑ\�',NULL,'2022-05-19 10:48:17.017000','N',42,'빨래',_binary 'K��RvO��<Jh�Ĝ'),(_binary '̒�<YO���$F��\�',NULL,'2022-05-18 23:25:32.421000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�e\�V�J@���iZ�x\�',NULL,'2022-05-13 03:12:15.633000','N',62,'싸피',_binary '�\��\�YJ��	(Ń\'F'),(_binary '\�ǱbDм�J�\�',NULL,'2022-05-13 15:51:43.002000','N',6,'분리수거',_binary '@ME�BK��u�\�fH'),(_binary 'ݲ�)d-E���`S\0v',NULL,'2022-05-19 20:41:35.826000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�\�M\�\�LV���=�2',NULL,'2022-05-06 19:36:12.732000','N',62,'분리수거',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�\�_�lI��\�\�W�\0�',NULL,'2022-05-18 10:33:34.861000','N',127,'일어나면 물 한 컵 ?',_binary '��5J9��\���\�=\�'),(_binary '��\\\�N�M܅�>H\�\�Í',NULL,'2022-05-18 22:50:32.660000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ'),(_binary '��s\�E\�BߏW\0,%\�Z	',NULL,'2022-05-19 17:58:43.507000','Y',32,'알고리즘 스터디',_binary 'K��RvO��<Jh�Ĝ');
/*!40000 ALTER TABLE `routine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scrap`
--

DROP TABLE IF EXISTS `scrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scrap` (
  `scrap_id` binary(16) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `board_id` binary(16) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`scrap_id`),
  KEY `FK46d2cvrgggcia4oean5lykfr` (`board_id`),
  KEY `FKq0ff1jblgu8vrsh90u826qell` (`member_id`),
  CONSTRAINT `FK46d2cvrgggcia4oean5lykfr` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`),
  CONSTRAINT `FKq0ff1jblgu8vrsh90u826qell` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scrap`
--

LOCK TABLES `scrap` WRITE;
/*!40000 ALTER TABLE `scrap` DISABLE KEYS */;
INSERT INTO `scrap` VALUES (_binary '\r\n���I���I�C��','2022-05-18 22:58:48.649000',_binary ':\nA�\�JP��2\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�8�7\0Gv�sJm�j�','2022-05-17 22:47:28.858000',_binary ']�(3�BS�\�W��X�',_binary '��5J9��\���\�=\�'),(_binary '1��豙Lǯ���\Z','2022-05-18 14:41:13.110000',_binary '�s\0U\� F���>c�C5',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '5v�n�Ne�<�ۣ�f','2022-05-18 21:20:43.390000',_binary 'B�U%ZC�\�D�\�(',_binary '\��F]N�)0�'),(_binary 'C�xQR(Lu�\�fv�N1�','2022-05-19 10:37:13.792000',_binary '$�ۑ\�G�L���sU@',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'H��\�UI��PHД�� ','2022-05-17 22:51:44.526000',_binary ']�(3�BS�\�W��X�',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary 'W����D)��\�6�d�9','2022-05-19 15:23:30.759000',_binary '(�h�\�\�K��\�5}Q��',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\\�\�ʆnLJ���$���\�','2022-05-19 15:23:23.414000',_binary '\�\"�䐸K�����a���',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'z~J�v\�@�\�q�\�m','2022-05-18 22:54:12.125000',_binary 'q�}�Mz��K+J�y',_binary '��5J9��\���\�=\�'),(_binary '_ҐJ��E~rr\�\�','2022-05-19 20:44:16.792000',_binary '1 �t�&Gx�\��h�\�=\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�6|\�%A����Ŏ�<�','2022-05-18 12:22:40.225000',_binary 'q�}�Mz��K+J�y',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '�u	\�\�dI��\�_�M�W�','2022-05-14 08:48:52.551000',_binary '�pK�@η\�l喢?\�',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '\��C �F뤪5�K\��f','2022-05-19 15:23:39.857000',_binary '���_>\�Jr�G<N\�Ѓ',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\��A9\�N\�k�0�̯\�','2022-05-16 10:28:38.927000',_binary '́��\�Fڒh$����\0',_binary '\�q�\�K���h\"m:I!'),(_binary '\�.\0V��L\0�\�\�J��\�\�','2022-05-17 23:35:36.476000',_binary '���/tK��~���\�',_binary '\��F]N�)0�'),(_binary '\�<�8\�@L�!x�\\�','2022-05-18 23:28:31.798000',_binary '�M�AeL¼�\�Y#\�\�',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�!�A<B��H�#\��!@','2022-05-17 11:21:05.032000',_binary '\0�M$FH��\�E\"\�',_binary '��5J9��\���\�=\�');
/*!40000 ALTER TABLE `scrap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `todo` (
  `todo_id` binary(16) NOT NULL,
  `completed_yn` char(1) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `deleted_yn` char(1) DEFAULT NULL,
  `member_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`todo_id`),
  KEY `FK67o67f2ave0yd2pb137aoh603` (`member_id`),
  CONSTRAINT `FK67o67f2ave0yd2pb137aoh603` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (_binary '���J:�\�Uq.\�ڇ','Y','UCC 컨텐츠 2차 시안','2022-05-18 13:40:16.798000','2022-05-18','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\r���\n�I�8�\�E�\�','Y','? 딱지 장난감 사기','2022-05-18 10:32:21.712000','2022-05-18','N',_binary '��5J9��\���\�=\�'),(_binary '½��IR�N�$\�\�E\�','Y','할 일','2022-05-16 20:50:03.244000','2022-05-09','N',_binary '\�q�\�K���h\"m:I!'),(_binary ',�P,E���C\���	','N','배포','2022-05-13 03:12:01.034000','2022-05-13','N',_binary '�\��\�YJ��	(Ń\'F'),(_binary '�Ҿ\�\"Nv�|x\�̇\Z�','Y','UCC 오프닝 2차 시안','2022-05-18 13:40:08.133000','2022-05-18','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\n\�|J�2\"EZ�\�','Y','UCC 오프닝, 컨텐츠 제작','2022-05-18 13:41:56.315000','2022-05-17','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '!�\Zb�@��\�Z�Mr�','Y','UCC 스토리보드 제작','2022-05-18 13:34:35.702000','2022-05-18','N',_binary '��5J9��\���\�=\�'),(_binary '%d����H��\�K\��\�\�\0','Y','할 일','2022-05-16 20:50:09.530000','2022-05-11','N',_binary '\�q�\�K���h\"m:I!'),(_binary '&\r��\�XF\�\�3�\�P','Y','서류 제출하기','2022-05-18 11:06:47.217000','2022-05-18','N',_binary '��5J9��\���\�=\�'),(_binary '1�\�T6\�B��gםS�4\�','N','하쿠 간식 주문하기','2022-05-19 14:42:08.688000','2022-05-18','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary '4i�h G��KK9�\��','Y','할 일','2022-05-18 16:26:10.501000','2022-05-18','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary '8wngnFE�\���\�','N','면접을 위한 슬랙스','2022-05-18 21:49:50.984000','2022-05-18','Y',_binary '��5J9��\���\�=\�'),(_binary '9/\�kbB`�\�\�7�8��','Y','이잉','2022-05-11 17:21:24.725000','2022-05-11','N',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary 'B\�\��\��G��\�\���h�','N','프론트에서 S3 이미지 업로드하기 공부','2022-05-07 20:25:45.881000','2022-05-08','Y',_binary '@ME�BK��u�\�fH'),(_binary 'C�h\�O��=\�ϧzT�','Y','UCC 1차 시안','2022-05-18 13:41:20.576000','2022-05-17','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary 'D� i\�XI�\�\�*�\0s','Y','빨래','2022-05-07 03:01:13.642000','2022-05-07','N',_binary '@ME�BK��u�\�fH'),(_binary 'G��$M@F��Pf��Ͽ�','N','긴장 풀기','2022-05-19 14:43:33.282000','2022-05-19','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary 'I�\�\��H���\���ά','N','커뮤니티 UI 제작','2022-05-07 20:26:02.232000','2022-05-07','N',_binary '@ME�BK��u�\�fH'),(_binary 'LK�b,7O��v8\�?��','N','일하기','2022-05-19 15:14:35.054000','2022-05-19','N',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary 'O�J�DqD��\�\�E.\�\n','N','ㅏ','2022-05-16 10:37:28.184000','2022-05-16','N',_binary '@ME�BK��u�\�fH'),(_binary 'T�\���Eȶ\�nx�$\�','Y','히히ㅣ','2022-05-07 13:13:22.106000','2022-05-07','N',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary 'U|7gl=J�H^�1��','Y','시연','2022-05-18 15:56:58.430000','2022-05-01','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '[\�6�\�H5�Ii\�fV','N','은비 다영언니','2022-05-06 19:36:25.031000','2022-05-06','N',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary ']부H�C�\�\�2\�]�','Y','서류 제출하기','2022-05-18 10:32:51.743000','2022-05-17','N',_binary '��5J9��\���\�=\�'),(_binary '_]yi\�\�@��a�B\n�\��','Y','UCC 스토리보드 제작','2022-05-18 13:35:12.737000','2022-05-16','N',_binary '��5J9��\���\�=\�'),(_binary 'c?�#A�F���\�vg���','Y','구글 analytics 적용 ','2022-05-13 14:16:09.601000','2022-05-13','N',_binary '@ME�BK��u�\�fH'),(_binary 'p�g�\�K���&�\�i\�','N','멋지게 시연 하기','2022-05-19 10:49:20.255000','2022-05-20','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�Z2�_Kt�\��\'H','Y','미용실 3시반 예약','2022-05-15 15:40:47.340000','2022-05-15','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�AJ\�A��\��\�\\','N','주미랑 데이트 ❤️','2022-05-16 14:42:52.570000','2022-05-28','N',_binary '�\�P��@ұl\�97B\\'),(_binary '�T�SwzB,�তP�2%','Y','택배 부치기','2022-05-19 14:41:57.495000','2022-05-16','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '����\�N�����g','Y','팀장 미팅','2022-05-15 22:54:24.537000','2022-05-16','N',_binary '\�q�\�K���h\"m:I!'),(_binary '���g#3B��Kh@S','N','dk','2022-05-16 13:18:43.749000','2022-05-16','N',_binary '@ME�BK��u�\�fH'),(_binary '�ܢq�c@ڠ3�U\0X��','N','영웅이보기','2022-05-19 15:14:31.367000','2022-05-19','N',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary '�Ksa�N�\�R�e\�C-','Y','빨래 돌리기','2022-05-18 21:26:48.496000','2022-05-18','N',_binary '��5J9��\���\�=\�'),(_binary '�8s5~B?�0@G/{�','Y','하쿠 간식 주문하기','2022-05-19 14:44:59.084000','2022-05-17','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�\�Xb�C�Fm\�F�\�','Y','2차 배포 버그 리포팅','2022-05-18 13:40:49.925000','2022-05-18','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '�R�\�zVL��\�-Q%�\�','N','히히','2022-05-14 20:51:17.369000','2022-05-14','N',_binary '\�\�\0$TRJy�I�ͱ�\�'),(_binary '�U�ybO	�m�i���','Y','구글 analytics 테스트','2022-05-13 15:21:46.064000','2022-05-13','N',_binary '@ME�BK��u�\�fH'),(_binary '\�\�w��\�FȍfX��8	','Y','할 일1','2022-05-16 20:48:35.239000','2022-05-13','N',_binary '\�q�\�K���h\"m:I!'),(_binary '\���f�@q���\�\0��','Y','음','2022-05-11 10:24:31.944000','2022-05-11','N',_binary '@ME�BK��u�\�fH'),(_binary 'ȩ\�%hO-���\��','Y','냉장고 청소','2022-05-07 03:01:09.907000','2022-05-07','N',_binary '@ME�BK��u�\�fH'),(_binary '\�VG\�)L���%\�V\�\'','N','UCC 마무리','2022-05-18 13:35:27.511000','2022-05-19','N',_binary '��5J9��\���\�=\�'),(_binary '\�C\�IL�\���\�B','Y','앙녕하세요','2022-05-18 23:43:45.815000','2022-05-18','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\��\��\rN��*�Iuj�','Y','오후 8시 팀플','2022-05-07 03:00:37.198000','2022-05-07','N',_binary '@ME�BK��u�\�fH'),(_binary '\�Y�\�VID�A,\�C>�T','Y','포팅 매뉴얼 작성하기','2022-05-18 13:40:40.709000','2022-05-18','N',_binary 'Ӥ\�EEXA�N\�\�\�\�)�'),(_binary '\�>m���C#�,\�m�u\�7','N','파이어베이스','2022-05-18 23:45:33.522000','2022-05-18','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�$�W\�|C��~&\\��\�','Y','6시 약속','2022-05-19 14:42:48.581000','2022-05-15','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '\�6m(GǏT~6�%�!','N','시연 멋지게 보여드리기','2022-05-19 20:30:10.109000','2022-05-19','Y',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�ӫ�Kt�\�Ε\�\�]','N','퇴근하기','2022-05-19 15:14:37.896000','2022-05-19','N',_binary '\�Ȣ\�\n\�I_�!��\�\���'),(_binary '�\�n�wEK߸�y��6�','Y','양말 사기','2022-05-19 14:44:34.313000','2022-05-16','N',_binary 'K��RvO��<Jh�Ĝ'),(_binary '�(\'F\n���&m�\�,','N','점심 먹기','2022-05-13 03:12:06.871000','2022-05-13','N',_binary '�\��\�YJ��	(Ń\'F');
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-20 11:09:15
