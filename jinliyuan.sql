/*
Navicat MySQL Data Transfer

Source Server         : qiu
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : jinliyuan

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-08-11 17:48:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '苹果');
INSERT INTO `category` VALUES ('2', '香蕉');
INSERT INTO `category` VALUES ('3', '芒果');

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '手机号，如有多个手机号用 "-"分隔',
  `province_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `province` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '省',
  `city_id` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `district_id` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `district` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('7', '邱', '18720989381', '440000', '广东省', '440300', '深圳市', '440305', '南山区', '1');
INSERT INTO `customer` VALUES ('8', 'test1', '12300000000', '110000', '北京市', '110100', '市辖区', '110101', '东城区', '1');
INSERT INTO `customer` VALUES ('9', 'aaa', '13712345678', '140000', '山西省', '140300', '阳泉市', '140302', '城区', '1');
INSERT INTO `customer` VALUES ('10', '啦啦啦', '18711111112', '360000', '江西省', '360700', '赣州市', '360703', '南康区', '1');
INSERT INTO `customer` VALUES ('11', 'qiuyuhang', '18720989381', '360000', '江西省', '360700', '赣州市', '360703', '南康区', '1');
INSERT INTO `customer` VALUES ('12', '测试', '13811111111', '130000', '河北省', '130100', '石家庄市', '130102', '长安区', '1');

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `num` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '200', '白', '41', '1');
INSERT INTO `goods` VALUES ('2', '320', '红', '24', '2');
INSERT INTO `goods` VALUES ('3', '330', '黑', '56', '3');
INSERT INTO `goods` VALUES ('4', '890', '白', '343', '3');
INSERT INTO `goods` VALUES ('5', '355', '黄', '38', '2');
INSERT INTO `goods` VALUES ('6', '860', '红', '71', '2');
INSERT INTO `goods` VALUES ('7', '111', '蓝', '222', '1');

-- ----------------------------
-- Table structure for `job`
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES ('1', '开料');
INSERT INTO `job` VALUES ('2', '排钻');
INSERT INTO `job` VALUES ('3', '锣机');
INSERT INTO `job` VALUES ('4', '封边');
INSERT INTO `job` VALUES ('5', '打包');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `deliver_date` date NOT NULL,
  `order_date` date NOT NULL,
  `total_money` int(11) NOT NULL,
  `delivery_address` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `delivery_state` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('4', '1501571413316', '7', '2017-08-01', '2017-08-01', '4170', null, null, '0');
INSERT INTO `orders` VALUES ('5', '1501577956071', '10', '2017-08-02', '2017-08-01', '200', null, null, '0');
INSERT INTO `orders` VALUES ('7', '1501659726811', '8', '2017-08-02', '2017-08-02', '12', null, null, '0');
INSERT INTO `orders` VALUES ('8', '1501659756892', '8', '2017-08-10', '2017-08-02', '15', null, null, '0');
INSERT INTO `orders` VALUES ('9', '1501660168139', '7', '2017-08-03', '2017-08-02', '1070', null, null, '0');
INSERT INTO `orders` VALUES ('11', '1501748373354', '7', '2017-08-04', '2017-08-03', '616', 'test地址', 'test备注', '0');
INSERT INTO `orders` VALUES ('12', '1501748547281', '10', '2017-08-05', '2017-08-03', '3243', '物流111', '备注111', '0');
INSERT INTO `orders` VALUES ('14', '1501833949750', '8', '2017-08-19', '2017-08-04', '114', 'adsf', 'asdg', '0');
INSERT INTO `orders` VALUES ('22', '1502071697431', '11', '2017-08-20', '2017-08-07', '9', 'test1', 'test1', '0');
INSERT INTO `orders` VALUES ('23', '1502175170823', '11', '2017-08-29', '2017-08-08', '546', '顺丰快递', '', '0');
INSERT INTO `orders` VALUES ('24', '1502183522901', '9', '2017-08-11', '2017-08-08', '4', '1', '', '0');

-- ----------------------------
-- Table structure for `order_goods`
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `goods_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of order_goods
-- ----------------------------
INSERT INTO `order_goods` VALUES ('8', '1501571413316', '2', '3', '240');
INSERT INTO `order_goods` VALUES ('9', '1501571413316', '5', '3', '350');
INSERT INTO `order_goods` VALUES ('10', '1501571413316', '6', '2', '1200');
INSERT INTO `order_goods` VALUES ('11', '1501577956071', '5', '2', '100');
INSERT INTO `order_goods` VALUES ('13', '1501659726811', '2', '1', '12');
INSERT INTO `order_goods` VALUES ('14', '1501659756892', '2', '1', '15');
INSERT INTO `order_goods` VALUES ('15', '1501660168139', '3', '3', '150');
INSERT INTO `order_goods` VALUES ('16', '1501660168139', '4', '2', '310');
INSERT INTO `order_goods` VALUES ('19', '1501748373354', '1', '3', '120');
INSERT INTO `order_goods` VALUES ('20', '1501748373354', '2', '1', '256');
INSERT INTO `order_goods` VALUES ('21', '1501748547281', '2', '1', '123');
INSERT INTO `order_goods` VALUES ('22', '1501748547281', '5', '2', '240');
INSERT INTO `order_goods` VALUES ('23', '1501748547281', '6', '4', '510');
INSERT INTO `order_goods` VALUES ('24', '1501748547281', '3', '1', '600');
INSERT INTO `order_goods` VALUES ('27', '1501833949750', '7', '2', '34');
INSERT INTO `order_goods` VALUES ('28', '1501833949750', '1', '2', '23');
INSERT INTO `order_goods` VALUES ('53', '1502071697431', '7', '2', '2');
INSERT INTO `order_goods` VALUES ('54', '1502071697431', '1', '2', '2');
INSERT INTO `order_goods` VALUES ('55', '1502071697431', '2', '1', '1');
INSERT INTO `order_goods` VALUES ('58', '1502175170823', '5', '2', '120');
INSERT INTO `order_goods` VALUES ('59', '1502175170823', '6', '2', '153');
INSERT INTO `order_goods` VALUES ('60', '1502183522901', '7', '4', '1');

-- ----------------------------
-- Table structure for `production`
-- ----------------------------
DROP TABLE IF EXISTS `production`;
CREATE TABLE `production` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '商品id',
  `num` tinyint(4) NOT NULL COMMENT '生产数量',
  `date` date NOT NULL COMMENT '生产日期',
  `cuter_id` int(11) NOT NULL COMMENT '开料id',
  `cut_price` float NOT NULL COMMENT '开料单价',
  `drill_id` int(11) NOT NULL COMMENT '排钻id',
  `drill_price` float NOT NULL COMMENT '排钻单价',
  `sanding_id` int(11) NOT NULL COMMENT '锣机id',
  `sanding_price` float NOT NULL COMMENT '锣机单价',
  `paste_id` int(11) NOT NULL COMMENT '封边id',
  `paste_price` float NOT NULL COMMENT '封边单价',
  `pack_id` int(11) NOT NULL COMMENT '打包id',
  `pack_price` float NOT NULL COMMENT '打包单价',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of production
-- ----------------------------

-- ----------------------------
-- Table structure for `staff`
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `job_id` int(11) NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('1', '员工1', '12300000000', '1', '1');
INSERT INTO `staff` VALUES ('2', '员工2', '12311111111', '2', '1');
INSERT INTO `staff` VALUES ('3', 'test', '12300000000', '1', '0');
INSERT INTO `staff` VALUES ('4', 'test2', '13700000000', '3', '1');
INSERT INTO `staff` VALUES ('5', 'test3', '13811111111', '4', '1');
