# Render Deployment Guide for BSM Platform

This guide will help you deploy your BSM Platform monorepo to Render.com.

## Prerequisites

- A Render.com account (free tier available)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Supabase project set up (optional - demo credentials included)

## Quick Deployment

### Option 1: Using render.yaml (Recommended)

1. **Push your code to Git repository**
   ```bash
   git add .
   git commit -m "Add Render deployment configuration"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Sign in with your Git provider
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file

3. **Deploy**
   - Render will create two services automatically:
     - `bsm-customer-portal` (Customer Portal)
     - `bsm-admin-dashboard` (Admin Dashboard)
   - Both services will be deployed and accessible via their respective URLs

### Option 2: Manual Service Creation

If you prefer to create services manually:

1. **Create Customer Portal Service**
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `bsm-customer-portal`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build --workspace=@bsm/customer-portal`
     - **Start Command**: `cd apps/customer-portal && npm run start`
     - **Plan**: Free

2. **Create Admin Dashboard Service**
   - Repeat the process with:
     - **Name**: `bsm-admin-dashboard`
     - **Build Command**: `npm install && npm run build --workspace=@bsm/admin-dashboard`
     - **Start Command**: `cd apps/admin-dashboard && npm run start`

## Environment Variables

The following environment variables are configured in `render.yaml`:

### Required Variables
- `NODE_ENV`: `production`
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Optional Variables
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: For Google OAuth (if enabled)
- `GOOGLE_CLIENT_SECRET`: For Google OAuth (if enabled)

## Key Changes Made for Render

### 1. Port Configuration
- Updated `package.json` files to use `PORT` environment variable
- Created custom `start.js` scripts that properly handle port binding
- Render automatically sets the `PORT` environment variable

### 2. Build Configuration
- Monorepo build commands use `--workspace` flag
- Each service builds only its specific app
- Proper working directory handling

### 3. Start Commands
- Custom start scripts ensure proper port binding
- Fallback to default ports for local development
- Proper error handling and logging

## Troubleshooting

### Common Issues

1. **Port Binding Error**
   - **Error**: "Port scan timeout reached, failed to detect open port 10000"
   - **Solution**: Ensure your app uses `process.env.PORT` or the custom start scripts

2. **Build Failures**
   - **Error**: Build command fails
   - **Solution**: Check that all dependencies are in `package.json` and workspace commands are correct

3. **Environment Variables**
   - **Error**: Supabase connection fails
   - **Solution**: Verify environment variables are set correctly in Render dashboard

### Debug Steps

1. **Check Build Logs**
   - Go to your service in Render dashboard
   - Click on "Logs" tab
   - Look for build errors or warnings

2. **Check Runtime Logs**
   - After successful build, check runtime logs
   - Look for port binding messages
   - Verify environment variables are loaded

3. **Test Locally**
   ```bash
   # Test customer portal
   cd apps/customer-portal
   PORT=3000 npm run start
   
   # Test admin dashboard
   cd apps/admin-dashboard
   PORT=3001 npm run start
   ```

## Post-Deployment

### 1. Update Supabase Settings
- Go to your Supabase dashboard
- Update **Site URL** to your Render service URLs
- Add Render URLs to **Redirect URLs** if using OAuth

### 2. Test Both Services
- Customer Portal: `https://bsm-customer-portal.onrender.com`
- Admin Dashboard: `https://bsm-admin-dashboard.onrender.com`

### 3. Monitor Performance
- Use Render's built-in monitoring
- Check logs regularly for errors
- Monitor resource usage

## Security Notes

- Never commit real API keys to version control
- Use Render's environment variable management
- Regularly rotate API keys
- Enable HTTPS (automatic on Render)

## Support

If you encounter issues:
1. Check Render's [troubleshooting guide](https://render.com/docs/troubleshooting-deploys)
2. Review the build and runtime logs
3. Test locally with the same environment variables
4. Contact Render support if needed

## Next Steps

After successful deployment:
1. Set up custom domains (if needed)
2. Configure monitoring and alerts
3. Set up CI/CD for automatic deployments
4. Configure database backups (if using Supabase)
