// Supabase Configuration
// This file initializes the Supabase client for use throughout the application

// For local development, you can set these directly (NOT RECOMMENDED for production)
// For Vercel deployment, these will be replaced by environment variables automatically

const SUPABASE_URL = window.ENV?.SUPABASE_URL || 'https://knwwqshrneeyaxjnmyvi.supabase.co';
const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3dxc2hybmVleWF4am5teXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NjYzNjYsImV4cCI6MjA4MTA0MjM2Nn0.CyJEYaLIdaexm1kk-YHrrCBXw1Ur3r97bhthc8JvpPg';

// Initialize Supabase client
// This will be available globally as 'supabaseClient'

// Initialize Supabase client
// Expects @supabase/supabase-js to be loaded via <script> tag in HTML
if (window.supabase) {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase client initialized');
  window.dispatchEvent(new Event('supabase-ready'));
} else {
  // Fallback if script isn't loaded yet (shouldn't happen if positioned correctly)
  window.addEventListener('load', () => {
    if (window.supabase) {
      window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✅ Supabase client initialized (on load)');
      window.dispatchEvent(new Event('supabase-ready'));
    } else {
      console.error('❌ Supabase library not found!');
    }
  });
}
