
import { prisma } from './prisma';
import * as bcrypt from 'bcryptjs';

export async function initializeDatabase() {
  try {
    // Check if admin user exists
    const adminCount = await prisma.user.count({
      where: { role: 'admin' }
    });

    // If no admin exists, create one
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin'
        }
      });
      console.log('Admin user created successfully');
    }

    // Add more sample data if needed
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}
