/* eslint-env node */
import { defineConfig } from 'vite';
import { resolve } from 'path';

const __dirname = import.meta.dirname;

export default defineConfig({
  root: './', // 项目根目录
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'login.html'), // 入口文件
        admin: resolve(__dirname, 'admin.html'),
        student: resolve(__dirname, 'student.html'),
        adminManage: resolve(__dirname, 'html/manager/admin.html'),
        evaluationMethod: resolve(
          __dirname,
          'html/manager/evaluationMethod.html'
        ),
        pwd: resolve(__dirname, 'html/manager/pwd.html'),
        studentManage: resolve(__dirname, 'html/manager/studentManage.html'),
        teacherManage: resolve(__dirname, 'html/manager/teacherManage.html'),
        teacherManageData: resolve(
          __dirname,
          'html/manager/teacherManageData.html'
        ),
      },
    },
  },
  server: {
    port: 3000, // 开发服务器端口
  },
});
