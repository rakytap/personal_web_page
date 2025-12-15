# Personal Web Page – Docker Quickstart

This project can run in Docker for a reproducible, persistent deployment.

## Prerequisites
- Docker installed
- `.env.local` with your secrets (not committed):
  ```
  ADMIN_USERNAME_HASH=...
  ADMIN_PASSWORD_HASH=...
  # or use plaintext:
  # ADMIN_USERNAME=...
  # ADMIN_PASSWORD=...
  ```

## Build the image
```bash
docker build -t personal-web-page .
```

## Run the container (with persistence)
Mount uploads and metadata so they survive restarts:
```bash
docker run -d -p 3000:3000 \
  --env-file .env.local \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/files-metadata.json:/app/files-metadata.json \
  personal-web-page
```
- App will be available at http://localhost:3000
- Uploaded files: `./uploads`
- File metadata: `./files-metadata.json`

## Notes
- The image uses multi-stage build on `node:20-alpine`.
- `PORT` defaults to 3000; override with `-e PORT=4000` if needed.
- `.dockerignore` is set to keep build context small.

## Stopping / removing
```bash
docker ps         # find the container ID or name
docker stop <id>  # stop
docker rm <id>    # remove
```
# personal_web_page
Personal web page
