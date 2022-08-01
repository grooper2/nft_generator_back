FROM node:alpine AS builder

WORKDIR /nft_generator/app

COPY package*.json ./

RUN npm install

COPY . . 

FROM alpine
WORKDIR /nft_generator/app
COPY --from=builder /nft_generator/app/  /app/nft_generator

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]