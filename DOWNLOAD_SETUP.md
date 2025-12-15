# Download Page Setup

## Default Credentials

The download page uses simple authentication. By default:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials in production!

## Setting Custom Credentials

You can use either plaintext env vars (simpler) or hashed values (preferred).

### Option A: Plaintext (quick setup)
Create `.env.local` in the project root:
```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

### Option B: Hashed (recommended)
Store SHA-256 hashes instead of plaintext:
```env
ADMIN_USERNAME_HASH=<sha256_of_username>
ADMIN_PASSWORD_HASH=<sha256_of_password>
```
How to generate SHA-256 (Linux/macOS):
```bash
echo -n "your_username" | sha256sum | cut -d" " -f1
echo -n "your_secure_password" | sha256sum | cut -d" " -f1
```
If the hash variables are set, they take precedence over plaintext.

**Note:** `.env.local` is git-ignored; don’t commit secrets.

## File Storage

- Uploaded files are stored in the `/uploads` directory
- File metadata is stored in `/files-metadata.json`
- Both are excluded from git (see `.gitignore`)

## Features

1. **Login**: Users can log in with username and password
2. **File Upload**: Logged-in users can upload files
3. **Public/Private Flags**: Files can be marked as public or private
4. **File Visibility**: 
   - Public files: Visible and downloadable by everyone
   - Private files: Only visible and downloadable when logged in
5. **File Management**: Logged-in users can toggle file visibility

## Security Notes

- This is a simple authentication system suitable for personal use
- For production use, consider:
  - Implementing JWT tokens with expiration
  - Using a proper database instead of JSON files
  - Adding rate limiting
  - Implementing file size limits
  - Adding file type restrictions




