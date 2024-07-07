import { prisma } from '@Common/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  async getCategories(): Promise<string[]> {
    const categories = await prisma.category.findMany({});
    return categories.map((category) => category.name);
  }

  async getAllergies(): Promise<string[]> {
    const allergies = await prisma.allergy.findMany({});
    return allergies.map((allergy) => allergy.name);
  }

  async getAll(): Promise<string[]> {
    const categories = await this.getCategories();
    const allergies = await this.getAllergies();

    const all = new Set([...categories, ...allergies]);

    return Array.from(all);
  }

  async createMany(categories: string[]): Promise<void> {
    await prisma.category.createMany({
      data: categories.map((category) => ({ name: category })),
    });
  }

  async createManyAllergies(allergies: string[]): Promise<void> {
    await prisma.allergy.createMany({
      data: allergies.map((allergy) => ({ name: allergy })),
    });
  }
}
