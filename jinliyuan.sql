/*
Navicat MySQL Data Transfer

Source Server         : qiu
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : jinliyuan

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-08-03 17:35:46
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('7', '邱', '18720989381', '440000', '广东省', '440300', '深圳市', '440305', '南山区');
INSERT INTO `customer` VALUES ('8', 'test1', '12300000000', '110000', '北京市', '110100', '市辖区', '110101', '东城区');
INSERT INTO `customer` VALUES ('9', 'aaa', '13712345678', '140000', '山西省', '140300', '阳泉市', '140302', '城区');
INSERT INTO `customer` VALUES ('10', '啦啦啦', '18711111111', '360000', '江西省', '360700', '赣州市', '360703', '南康区');
INSERT INTO `customer` VALUES ('11', 'qiuyuhang', '18720989381', '360000', '江西省', '360700', '赣州市', '360703', '南康区');

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
INSERT INTO `goods` VALUES ('1', '200', '白', '47', '1');
INSERT INTO `goods` VALUES ('2', '320', '红', '25', '2');
INSERT INTO `goods` VALUES ('3', '330', '黑', '56', '3');
INSERT INTO `goods` VALUES ('4', '890', '白', '343', '3');
INSERT INTO `goods` VALUES ('5', '355', '黄', '40', '2');
INSERT INTO `goods` VALUES ('6', '860', '红', '73', '2');
INSERT INTO `goods` VALUES ('7', '111', '蓝', '233', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('2', '1501466345528', '7', '2017-07-31', '2017-07-31', '72', null, null, '0');
INSERT INTO `orders` VALUES ('3', '1501489340358', '10', '2017-08-01', '2017-07-31', '111', null, null, '0');
INSERT INTO `orders` VALUES ('4', '1501571413316', '7', '2017-08-01', '2017-08-01', '4170', null, null, '0');
INSERT INTO `orders` VALUES ('5', '1501577956071', '10', '2017-08-02', '2017-08-01', '200', null, null, '0');
INSERT INTO `orders` VALUES ('7', '1501659726811', '8', '2017-08-02', '2017-08-02', '12', null, null, '0');
INSERT INTO `orders` VALUES ('8', '1501659756892', '8', '2017-08-10', '2017-08-02', '15', null, null, '0');
INSERT INTO `orders` VALUES ('9', '1501660168139', '7', '2017-08-03', '2017-08-02', '1070', null, null, '0');
INSERT INTO `orders` VALUES ('11', '1501748373354', '7', '2017-08-04', '2017-08-03', '616', 'test地址', 'test备注', '0');
INSERT INTO `orders` VALUES ('12', '1501748547281', '10', '2017-08-05', '2017-08-03', '3243', '物流111', '备注111', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of order_goods
-- ----------------------------
INSERT INTO `order_goods` VALUES ('3', '1501466345528', '5', '2', '25');
INSERT INTO `order_goods` VALUES ('4', '1501466345528', '6', '1', '22');
INSERT INTO `order_goods` VALUES ('5', '1501489340358', '2', '3', '12');
INSERT INTO `order_goods` VALUES ('6', '1501489340358', '5', '3', '20');
INSERT INTO `order_goods` VALUES ('7', '1501489340358', '4', '1', '15');
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
