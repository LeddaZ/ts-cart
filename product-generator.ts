import { fakerIT as faker } from '@faker-js/faker'
import { writeFileSync } from 'fs'

function generateRandomProduct() {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    netPrice: parseFloat(faker.commerce.price({ max: 10000 })),
    weight: faker.number.float({ min: 50, max: 2000, fractionDigits: 2 }),
    discount: faker.number.float({ min: 0, max: 1, fractionDigits: 2 }),
  }
}

function generateProducts(num: number) {
  const products: any[] = []
  for (let i = 0; i < num; i++) {
    products.push(generateRandomProduct())
  }
  writeFileSync('./products.json', JSON.stringify(products), {
    encoding: 'utf-8',
  })
}

generateProducts(200)
