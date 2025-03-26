
// This script is for initializing the database
// Run this script with Node.js after setting up your MySQL database

const { execSync } = require('child_process');

function setupDatabase() {
  console.log('Setting up database...');
  
  try {
    // Generate Prisma client
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Create migrations
    console.log('Creating migrations...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
