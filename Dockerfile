# FROM node:carbon

# # 创建 app 目录
# WORKDIR /app

# RUN npm install pm2 -g
# RUN npm install babel-cli -g 

# RUN npm install -g nodemon

# # 安装 app 依赖
# # 使用通配符确保 package.json 与 package-lock.json 复制到需要的地方。（npm 版本 5 以上） COPY package*.json ./

# RUN npm install
# # 如果你需要构建生产环境下的代码，请使用：
# # RUN npm install --only=production

# # 打包 app 源码
# COPY src /app

# EXPOSE 8080
# CMD [ "nodemon", "--interpreter", "babel-node", "task7/index.js" ]


FROM node:14.17
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm run task7