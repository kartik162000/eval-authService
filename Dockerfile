FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /app

# Copy dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy app
COPY . .

# Run app
ENTRYPOINT ["node", "./index.js"]