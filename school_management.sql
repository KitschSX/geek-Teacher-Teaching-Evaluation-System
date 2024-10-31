/*
 Navicat MySQL Dump SQL

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 90100 (9.1.0)
 Source Host           : localhost:3306
 Source Schema         : school_management

 Target Server Type    : MySQL
 Target Server Version : 90100 (9.1.0)
 File Encoding         : 65001

 Date: 01/11/2024 00:30:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES (3, '张三', '男', 30, '2024-10-31 01:37:05', 'admin1');
INSERT INTO `admins` VALUES (19, '李四', '女', 25, '2024-10-31 04:05:24', 'admin2');
INSERT INTO `admins` VALUES (20, '<a>hi</a>', '男', 23, '2024-10-31 23:07:58', '123');

-- ----------------------------
-- Table structure for evaluation_metrics
-- ----------------------------
DROP TABLE IF EXISTS `evaluation_metrics`;
CREATE TABLE `evaluation_metrics`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `options` json NOT NULL,
  `order_num` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluation_metrics
-- ----------------------------
INSERT INTO `evaluation_metrics` VALUES (1, 'input', '对老师的评价', '[]', 1, '2024-10-30 23:49:16');
INSERT INTO `evaluation_metrics` VALUES (2, 'score', '老师的授课态度', '[\"非常认真\", \"认真\", \"一般认真\"]', 2, '2024-10-30 23:49:16');
INSERT INTO `evaluation_metrics` VALUES (3, 'radio', '课题设计质量', '[\"非常满意吗\", \"满意\", \"不满意\"]', 3, '2024-10-30 23:49:16');
INSERT INTO `evaluation_metrics` VALUES (4, 'checkbox', '感受不错的方面', '[\"课题设计\", \"课堂氛围\", \"随堂练习\", \"知识复盘\"]', 4, '2024-10-30 23:49:16');

-- ----------------------------
-- Table structure for evaluation_results
-- ----------------------------
DROP TABLE IF EXISTS `evaluation_results`;
CREATE TABLE `evaluation_results`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `teacherid` int NOT NULL,
  `results` json NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `evaluations` json NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `teacherid`(`teacherid` ASC) USING BTREE,
  CONSTRAINT `evaluation_results_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluation_results
-- ----------------------------
INSERT INTO `evaluation_results` VALUES (1, 1, '[\"123\", \"非常认真\", \"满意\", [\"课堂氛围\", \"随堂练习\"]]', '2024-10-31 17:43:31', '[{\"id\": 1, \"name\": \"input\", \"title\": \"对老师的评价\", \"options\": [], \"order_num\": 1, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 2, \"name\": \"score\", \"title\": \"老师的授课态度\", \"options\": [\"非常认真\", \"认真\", \"一般认真\"], \"order_num\": 2, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 3, \"name\": \"radio\", \"title\": \"课题设计质量\", \"options\": [\"非常满意\", \"满意\", \"不满意\"], \"order_num\": 3, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 4, \"name\": \"checkbox\", \"title\": \"感受不错的方面\", \"options\": [\"课题设计\", \"课堂氛围\", \"随堂练习\", \"知识复盘\"], \"order_num\": 4, \"created_at\": \"2024-10-30T15:49:16.000Z\"}]');
INSERT INTO `evaluation_results` VALUES (4, 1, '[\"123\", \"非常认真\", \"非常满意\"]', '2024-10-31 17:48:03', '[{\"id\": 1, \"name\": \"input\", \"title\": \"对老师的评价\", \"options\": [], \"order_num\": 1, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 2, \"name\": \"score\", \"title\": \"老师的授课态度\", \"options\": [\"非常认真\", \"认真\", \"一般认真\"], \"order_num\": 2, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 3, \"name\": \"radio\", \"title\": \"课题设计质量\", \"options\": [\"非常满意\", \"满意\", \"不满意\"], \"order_num\": 3, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 4, \"name\": \"checkbox\", \"title\": \"感受不错的方面\", \"options\": [\"课题设计\", \"课堂氛围\", \"随堂练习\", \"知识复盘\"], \"order_num\": 4, \"created_at\": \"2024-10-30T15:49:16.000Z\"}]');
INSERT INTO `evaluation_results` VALUES (5, 1, '[\"123\", \"非常认真\", \"非常满意\", [\"课堂氛围\"]]', '2024-10-31 17:52:21', '[{\"id\": 1, \"name\": \"input\", \"title\": \"对老师的评价\", \"options\": [], \"order_num\": 1, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 2, \"name\": \"score\", \"title\": \"老师的授课态度\", \"options\": [\"非常认真\", \"认真\", \"一般认真\"], \"order_num\": 2, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 3, \"name\": \"radio\", \"title\": \"课题设计质量\", \"options\": [\"非常满意\", \"满意\", \"不满意\"], \"order_num\": 3, \"created_at\": \"2024-10-30T15:49:16.000Z\"}, {\"id\": 4, \"name\": \"checkbox\", \"title\": \"感受不错的方面\", \"options\": [\"课题设计\", \"课堂氛围\", \"随堂练习\", \"知识复盘\"], \"order_num\": 4, \"created_at\": \"2024-10-30T15:49:16.000Z\"}]');

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` int NOT NULL,
  `studentId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `class` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `studentId`(`studentId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1, '王小明', '男', 20, '2019001', '数学1班', '2024-10-30 23:49:16', 'student1');
INSERT INTO `students` VALUES (2, '张小红1', '女', 19, '2019002', '数学2班', '2024-10-30 23:49:16', 'student24');
INSERT INTO `students` VALUES (4, '韩梅梅', '女', 22, '2019004', '数学4班', '2024-10-30 23:49:16', 'student4');

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `age` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `classes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (1, '陈老师', '男', 40, '2024-10-30 23:49:16', '数学');
INSERT INTO `teachers` VALUES (3, '王老师', '女', 25, '2024-10-31 20:05:42', '英语');
INSERT INTO `teachers` VALUES (4, '李老师', '男', 18, '2024-10-31 20:06:38', '语文');
INSERT INTO `teachers` VALUES (5, '刘老师', '女', 28, '2024-10-31 20:08:07', '英语');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','student') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin1', '$2b$10$Ma.ExEwC5Cv85ak0eeKo5uH7/Be1WlUhJzZrHbLNBO11zAPDwwD5m', 'admin', '2024-10-30 23:49:16');
INSERT INTO `users` VALUES (2, 'student24', '$2a$10$qLtoKh.Edw8IKGKSXKUSK.ZNSMsFIcKjD9OXST1Cu3o8bqNsg7OSm', 'student', '2024-10-30 23:49:16');
INSERT INTO `users` VALUES (3, 'student2', '$2b$10$encrypted_password3$2a$10$1xhtpczQntcoV1Z0t6N9L.zifHm1kPkA5jm/dlKROdMXJLDhOvs7y', 'student', '2024-10-30 23:49:16');
INSERT INTO `users` VALUES (5, 'admin7', '$2b$10$0MykPxmjoBj08C4THxBVMuXKP4Ihem0WKU0E8RbtS9FtWmtcmjD3S', 'admin', '2024-10-31 02:53:26');
INSERT INTO `users` VALUES (6, 'admin8', '$2b$10$7QyQBcNsEZA8Ex5FRVz8GeO7xIs7Q8WpDOWd6tEv93LSWsMxZw/Nm', 'admin', '2024-10-31 02:57:14');
INSERT INTO `users` VALUES (16, '2', '$2b$10$InBWLJ2Uz5Oj4CCTxFk2beMp.n/Lny1Z8dno0gGew0E44v/wfVKPS', 'admin', '2024-10-31 04:00:16');
INSERT INTO `users` VALUES (19, 'admin2', '$2b$10$UpEoaR7LkSvIAVlw5jbaAuYBQNc8Azc3MgQYiYAdH/E1ndXJHEylq', 'admin', '2024-10-31 04:05:24');
INSERT INTO `users` VALUES (20, '123', '$2b$10$sWv.TQooxYe0Gr0.wrt27.1EeH/mLFmK2gnqwaLyEVe5U0.1CFLbO', 'admin', '2024-10-31 23:07:58');

SET FOREIGN_KEY_CHECKS = 1;
