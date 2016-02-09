import Q from 'q'
import faker from 'faker'
import {times} from 'ramda'
import Person from '../resources/Person'

Person.destroyAll()

let personID = 1
function createPerson () {
  const username = faker.internet.userName()

  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    username: username,
    location: {
      lat: faker.address.latitude(),
      lng: faker.address.longitude()
    },
    github: {
      id: personID++,
      username: username,
      url: `http://github.com/${username}`
    }
  }
}

Q.all(
  times(() => {
    return Person.create(createPerson())
      .then(p => console.log('Created Person: ' + p.id))
      .catch(console.error)
  }, 50)
).then(() => {
  console.log('Done Seeding')
  process.exit()
})
