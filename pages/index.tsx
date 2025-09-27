import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { User, LogOut, Mail, Lock, ArrowRight, Home } from 'lucide-react';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zrxoiqhivfkgzvyoobki.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyeG9pcWhpdmZrZ3p2eW9vYmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMjQ4MDAsImV4cCI6MjA1MDkwMDgwMH0.YourAnonKeyHere';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    router.push('/login');
    return null;
  }

  return (
    <>
      <Head>
        <title>Ackermann Platform</title>
        <meta name="description" content="Ackermann Platform - Welcome" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  {/* Ackermann Logo */}
                  <div className="flex items-center">
                    <div className="w-10 h-10">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                      >
                        <defs>
                          <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                        
                        <path
                          d="M20 20 L60 20 L80 40 L40 40 Z"
                          fill="url(#cubeGradient)"
                          opacity="0.3"
                        />
                        <path
                          d="M20 20 L40 40 L40 80 L20 60 Z"
                          fill="url(#cubeGradient)"
                          opacity="0.5"
                        />
                        <path
                          d="M20 20 L60 20 L60 40 L40 40 Z"
                          fill="url(#cubeGradient)"
                          opacity="0.7"
                        />
                        <path
                          d="M60 20 L80 40 L80 80 L60 60 Z"
                          fill="url(#cubeGradient)"
                          opacity="0.6"
                        />
                        <path
                          d="M40 40 L80 40 L80 80 L40 80 Z"
                          fill="url(#cubeGradient)"
                          opacity="0.8"
                        />
                        <path
                          d="M45 45 L55 55 M55 45 L45 55"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 ml-3">Ackermann Platform</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-8">
              <Home className="h-12 w-12 text-blue-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Ackermann Platform!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Hi {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}, you are successfully logged in!
            </p>

            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Platform Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-gray-900 font-mono text-sm">{user.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Verified</p>
                      <p className="text-gray-900">{user.email_confirmed_at ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="text-gray-900">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Demo Features (15% Preview)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
                  <p className="text-sm text-gray-600">Secure login with Supabase</p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dashboard</h3>
                  <p className="text-sm text-gray-600">Clean welcome interface</p>
                </div>
                
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ArrowRight className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ready to Scale</h3>
                  <p className="text-sm text-gray-600">Foundation for full platform</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="http://localhost:3001">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200">
                    <User className="h-5 w-5" />
                    Admin Dashboard
                  </button>
                </Link>
                <Link href="http://localhost:3000">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200">
                    <Home className="h-5 w-5" />
                    Customer Portal
                  </button>
                </Link>
              </div>
              
              <p className="text-gray-500 text-sm">
                This is a 15% preview of the Ackermann Platform. Full features include customer portal, admin dashboard, 
                workflow builder, knowledge base, and more.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;