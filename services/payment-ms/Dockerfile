FROM node:20-alpine
WORKDIR /payment-ms
COPY ./package.json .
COPY ./tsconfig.json .
ENV PORT=8082
EXPOSE ${PORT}
RUN yarn
CMD ["yarn", "local"]