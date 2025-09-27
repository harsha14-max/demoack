/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zrxoiqhivfkgzvyoobki.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyeG9pcWhpdmZrZ3p2eW9vYmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMjQ4MDAsImV4cCI6MjA1MDkwMDgwMH0.YourAnonKeyHere',
  },
}

module.exports = nextConfig