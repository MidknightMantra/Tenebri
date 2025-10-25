FROM node:lts-buster

# Install required packages
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# Copy package.json first for efficient Docker caching
COPY package.json .

# Install Node.js dependencies
RUN npm install

# Copy all source files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the bot
CMD ["node", "tenebri.js"]
