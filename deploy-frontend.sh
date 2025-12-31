#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 Deploying rusden-frontend...${NC}"

# Конфигурация
SERVER_IP="89.207.252.32"
SERVER_USER="root"
APP_DIR="/var/www/rusden-frontend"

# Деплой через SSH
ssh ${SERVER_USER}@${SERVER_IP} << 'ENDSSH'
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

APP_DIR="/var/www/rusden-frontend"

echo -e "${YELLOW}📦 Deploying rusden-frontend...${NC}"

cd $APP_DIR

# Git pull
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin main

# Install dependencies (only if package.json changed)
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json"; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Build Next.js
echo -e "${YELLOW}🔨 Building Next.js...${NC}"
npm run build

# Restart PM2
echo -e "${YELLOW}🔄 Restarting frontend...${NC}"
pm2 restart rusden-frontend || pm2 start ecosystem.config.js

echo -e "${GREEN}✅ Rusden frontend deployed successfully!${NC}"

ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend deployment completed!${NC}"
    echo -e "${GREEN}🌐 Frontend: http://89.207.252.32:3015${NC}"
else
    echo -e "${RED}❌ Frontend deployment failed!${NC}"
    exit 1
fi
