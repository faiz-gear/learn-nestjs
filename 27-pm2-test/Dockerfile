# build-stage
# 1. 使用node:18.0-alpine3.14作为基础镜像， 体积相比linux debian基础镜像小很多
FROM node:18.0-alpine3.14 as build-stage

WORKDIR /app

# 先复制package.json，这样只有在package.json改变的时候才会重新安装依赖
COPY package.json /app

RUN npm install --registry=https://registry.npmmirror.com/

COPY . .

RUN npm run build

# production-stage
# 2.多阶段构建，build-stage负责编译打包，production-stage负责运行， 这样最终的镜像只包含运行时的打包文件和依赖，镜像体积更小
FROM node:18.0-alpine3.14 as production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package.json /app

RUN npm install --production --registry=https://registry.npmmirror.com/

RUN npm install pm2 -g

EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
CMD ["pm2-runtime", "start", "ecosystem.config.js"]