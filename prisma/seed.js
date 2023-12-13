const { PrismaClient } = require('@prisma/client')
const faker = require('faker')

const prisma = new PrismaClient()

const amns = ['WiFi', 'Coffee', 'Printer', 'Whiteboard', 'Projector', 'Kitchen', 'Parking', 'Bike Rack', 'Bathroom', 'Microwave']

function getRandomItems(array) {
  const randomItems = [];
  while (randomItems.length < 3) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomItem = array[randomIndex];
    if (!randomItems.includes(randomItem)) {
      randomItems.push(randomItem);
    }
  }
  return randomItems;
}

async function main() {
  for (let i = 1; i < 7; i++) {
    const user = await prisma.user.create({
      data: {
        id: i,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.sentence(),
        school: "Cal Poly SLO",
        profilePic: faker.image.avatar(),
        savedSpaces: [],
      }
    })

    const space = await prisma.studySpace.create({
      data: {
        name: faker.lorem.words(),
        building: faker.lorem.words(),
        longitude: parseFloat(faker.address.longitude()),
        latitude: parseFloat(faker.address.latitude()),
        owner: {
          connect: {
            id: i,
          },
        },
        capacity: Math.floor(Math.random() * 50) + 30,
        busyness: parseFloat((Math.random() * 5).toFixed(2)),
        avgRating: parseFloat((Math.random() * 5).toFixed(2)),
        img: 'https://content-calpoly-edu.s3.amazonaws.com/foundation/1/images/20130820_science-math_app_0072%20%2875%25%29.jpg',
        amenities: getRandomItems(amns),
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })