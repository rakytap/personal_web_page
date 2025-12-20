#!/bin/sh
set -e

# Fix permissions for mounted volumes (run as root before switching user)
if [ -d /app/uploads ]; then
    chown -R nextjs:nodejs /app/uploads
    chmod -R 755 /app/uploads
fi

# Check if files-metadata.json is a directory (Docker created it as dir)
if [ -d /app/files-metadata.json ]; then
    echo "Warning: files-metadata.json is a directory, removing and creating file"
    rm -rf /app/files-metadata.json
    echo '{"files":[]}' > /app/files-metadata.json
fi

# Create file if it doesn't exist
if [ ! -f /app/files-metadata.json ]; then
    echo '{"files":[]}' > /app/files-metadata.json
fi

# Fix permissions for metadata file
chown nextjs:nodejs /app/files-metadata.json
chmod 644 /app/files-metadata.json

# Create uploads directory if it doesn't exist
mkdir -p /app/uploads
chown -R nextjs:nodejs /app/uploads
chmod -R 755 /app/uploads

# Switch to nextjs user and execute the main command
exec su-exec nextjs "$@"

