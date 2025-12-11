// Supabase Configuration
// This file initializes the Supabase client for use throughout the application

// For local development, you can set these directly (NOT RECOMMENDED for production)
// For Vercel deployment, these will be replaced by environment variables automatically

const SUPABASE_URL = window.ENV?.SUPABASE_URL || 'https://knwwqshrneeyaxjnmyvi.supabase.co';
const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3dxc2hybmVleWF4am5teXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MzM4MjgsImV4cCI6MjA0OTUwOTgyOH0.kBPBJgpKwsJvlcPqRGzCTjVfFVUKWZhRjDDEqxXpJvg';

// Initialize Supabase client
// This will be available globally as 'supabase'
let supabase;

// Load Supabase client from CDN
(function () {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload = function () {
    // Initialize Supabase client after library loads
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized');

    // Dispatch event to notify that Supabase is ready
    window.dispatchEvent(new Event('supabase-ready'));
  };
  document.head.appendChild(script);
})();
