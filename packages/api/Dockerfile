FROM keymetrics/pm2:latest-alpine

WORKDIR /api

ENV NODE_ENV=production

COPY --from=docker-builder-prod repo/packages/api/package*.json ./
RUN npm install --production

COPY --from=docker-builder-prod repo/packages/api/dist ./dist
COPY packages/api/ecosystem.config.js .

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
