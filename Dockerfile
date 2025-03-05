ARG STORYBOOK=./storybook-static
FROM nginx

COPY ${STORYBOOK} /usr/share/nginx/html
