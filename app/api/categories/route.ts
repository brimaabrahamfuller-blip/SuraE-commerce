import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const DEFAULT_CATEGORIES = [
  'Bags',
  'Dresses',
  'Blouses',
  'Tops',
  'T-Shirts',
  'Jeans',
  'Shirts',
  'Perfume',
]

// GET all categories
export async function GET() {
  try {
    let categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    // Auto-seed categories if none exist
    if (categories.length === 0) {
      const createdCategories = await Promise.all(
        DEFAULT_CATEGORIES.map((name) =>
          prisma.category.create({
            data: { name },
          })
        )
      )
      categories = createdCategories
    }

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      )
    }

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name },
    })

    if (existing) {
      return NextResponse.json(existing)
    }

    const category = await prisma.category.create({
      data: { name },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
