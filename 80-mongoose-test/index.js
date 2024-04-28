const mongoose = require('mongoose')

main().catch((err) => console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test')

  // schema描述数据的结构 类似nest的entity
  const PersonSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hobbies: [String]
  })

  // model是schema的实例, 相当于定义了一个collection
  const Person = mongoose.model('Person', PersonSchema)

  // // new一个实例, 相当于new一个document
  // const lyle = new Person()
  // lyle.name = 'Lyle'
  // lyle.age = 20

  // await lyle.save()

  // const faiz = new Person()
  // faiz.name = 'faiz'
  // faiz.age = 21
  // faiz.hobbies = ['reading', 'football']

  // await faiz.save()

  // const persons = await Person.find()
  const persons = await Person.find({
    age: { $gt: 20 }
    // hobbies: { $in: ['reading'] }
  })
  console.log(persons)
}
