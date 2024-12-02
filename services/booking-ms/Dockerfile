FROM node:20-alpine
WORKDIR /booking-ms
COPY ./package.json .
COPY ./tsconfig.json .
ENV PORT=8080
EXPOSE ${PORT}
RUN yarn
CMD ["yarn", "local"]