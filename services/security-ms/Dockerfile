FROM node:20-alpine
WORKDIR /security-ms
COPY ./package.json .
COPY ./tsconfig.json .
ENV PORT=8081
EXPOSE ${PORT}
RUN yarn
CMD ["yarn", "local"]