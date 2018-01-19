# version 8 was used
FROM erdii/nodejs-alpine-buildtools:latest

# bootstrap app folder
# add app code
ADD . /app
WORKDIR /app

# set production envvar
ENV NODE_ENV production

# install npm dependencies
RUN npm install --production

# remove build dependencies
RUN apk del make gcc g++ python

EXPOSE 3000

CMD ["node", "/app/server.js", "--max-old-space-size=128"]
