FROM node:20-alpine as base
WORKDIR /app
COPY . .

FROM base as prod-deps
RUN npm install --prod --frozen-lockfile

FROM base as build
RUN npm install --frozen-lockfile
RUN npm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
EXPOSE 3000
CMD ["node", "build"]