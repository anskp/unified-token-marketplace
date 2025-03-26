
import { prisma } from './prisma';

// Token Management
export async function createToken(tokenData: {
  name: string;
  symbol: string;
  supply: bigint;
  issuerId: string;
  chain?: string;
  contractAddress?: string;
  ipfsHash?: string;
}) {
  return prisma.token.create({
    data: tokenData
  });
}

export async function getTokensByIssuer(issuerId: string) {
  return prisma.token.findMany({
    where: { issuerId }
  });
}

export async function getAllTokens() {
  return prisma.token.findMany({
    include: {
      issuer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
}

// User Management
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      kycStatus: true,
      wallet: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function updateUserKYCStatus(userId: string, status: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { kycStatus: status }
  });
}

export async function createWalletForUser(userId: string, walletAddress: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { wallet: walletAddress }
  });
}
