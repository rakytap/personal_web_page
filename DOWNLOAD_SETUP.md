# Download Page Setup

## Default Credentials

The download page uses simple authentication. By default:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials in production!

## Setting Custom Credentials

To set custom credentials, create a `.env.local` file in the root directory:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
```

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
  - Using proper password hashing (bcrypt)
  - Implementing JWT tokens with expiration
  - Using a proper database instead of JSON files
  - Adding rate limiting
  - Implementing file size limits
  - Adding file type restrictions




