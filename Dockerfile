FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json  ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install --force
# Can you add a script to the global package.json that does this?
RUN npx turbo db:generate

# Can you filter the build down to just one app?
RUN npm run build

CMD ["npm", "run", "start-user-app"]