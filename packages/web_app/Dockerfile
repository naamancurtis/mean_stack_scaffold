FROM nginx:alpine

COPY --from=docker-builder-prod repo/packages/web_app/dist/web_app /usr/share/nginx/html
COPY /packages/web_app/nginx/default.conf etc/nginx/conf.d/default.conf
