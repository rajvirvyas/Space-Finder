const { PrismaClient } = require('@prisma/client')
const faker = require('faker')

const prisma = new PrismaClient()

const amns = ['Wifi', 'Coffee', 'Printer', 'Whiteboard', 'Projector', 'Kitchen', 'Parking', 'Bike Rack', 'Bathroom', 'Microwave']
const longitudes = [-120.6587401647682, -120.7373788052079, -120.643366872671, -120.6635105229422, -120.6631168405989, -120.7058789939641]
const latitudes = [35.30017706062352, 35.17913840385398, 35.13822165716775, 35.30201337699342, 35.27914710976957, 35.28864464165681]
const studySpaceNames = ['UU Starbucks', 'Avila Beach', 'Pismo Beach', 'Library First Floor', 'Downtown Scouts', 'Study Spot for 2 People']
const studySpaceBuildings = ['UU', 'N/A', 'N/A', 'Kennedy Library', 'Scouts Coffee', 'Test Building']
const capacities = [20, 100, 100, 15, 10, 2]
const images = ['https://www.calpolycorporation.org/wp-content/uploads/2019/06/uu-starbucks-1080x675.jpg', 
                'https://upload.wikimedia.org/wikipedia/commons/b/b2/Avila_Beach_10-12-07.jpg',
                'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_800,q_70,w_1920,x_934,y_1152/v1/clients/pismobeachca/Pismo_Beach_Hotels_2_e4315839-3c2e-486c-84f0-c372258fe90c.jpg',
                'https://i0.wp.com/mustangnews.net/wp-content/uploads/2022/01/kennedy-library.jpeg?w=2048&ssl=1',
                'https://scoutcoffeeco.com/cdn/shop/files/Scout_Coffee_2022-391_1100x733.jpg?v=1660328902',
                'https://content-calpoly-edu.s3.amazonaws.com/foundation/1/images/20130820_science-math_app_0072%20%2875%25%29.jpg'
              ]
const comments = ['I love this spot!', 'This place is great!', 'I come here everyday!', 'I wish I could live here!', 'This place is so cool!', 'I love the coffee here!', 'I love the people here!', 'I love the food here!', 'I love the atmosphere here!', 'I love the wifi here!']

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

function getRandomComment(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const randomItem = array[randomIndex];
  return randomItem;
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
        name: studySpaceNames[i - 1],
        building: studySpaceBuildings[i - 1],
        longitude: longitudes[i - 1],
        latitude: latitudes[i - 1],
        owner: {
          connect: {
            id: i,
          },
        },
        capacity: capacities[i - 1],
        busyness: 0,
        avgRating: 4.0,
        img: images[i - 1],
        amenities: getRandomItems(amns),
      },
    })
  }

  for (let j = 0; j < 12; j++) {
    const comment = await prisma.rating.create({
      data: {
        value: 4,
        user: {
          connect: {
            id: Math.floor(j / 2) + 1,
          },
        },
        studySpace: {
          connect: {
            id: (j % 6) + 1,
          },
        },
        comment: getRandomComment(comments),
      }
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