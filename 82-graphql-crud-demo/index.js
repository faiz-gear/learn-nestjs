import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// graphql: graph query language 图形查询语言

// 声明对象类型关系
const typeDefs = `
  type Student {
    id: String,
    name: String,
    sex: Boolean
    age: Int
  }

  type Teacher {
    id: String,
    name: String,
    age: Int,
    subject: [String],
    students: [Student]
  }

  type Query {
    students: [Student],
    teachers: [Teacher],
    studentByName(name: String!): Student,
    studentsByATeacherName(name: String!): [Student]
  }

  type Res {
    success: Boolean,
    message: String
  }

  type Mutation {
    addStudent(name: String! age: Int! sex: Boolean!): Res,
    
    updateStudent(id: String! name: String! age: Int! sex: Boolean!): Res,

    deleteStudent(id: String!): Res
  }

  schema {
    query: Query
  } 
`

const students = [
  {
    id: '1',
    name: async () => {
      return await '小明1'
    },
    sex: true,
    age: 18
  },
  {
    id: '2',
    name: '小红',
    sex: false,
    age: 19
  },
  {
    id: '3',
    name: '小刚',
    sex: true,
    age: 20
  }
]

const teachers = [
  {
    id: '1',
    name: 'lyle',
    sex: true,
    subject: ['体育', '数学'],
    age: 25,
    students: students
  }
]

async function addStudent(_, { name, age, sex }) {
  students.push({
    id: Math.random().toString(36).slice(-8),
    name,
    age,
    sex
  })
  return {
    success: true,
    message: '添加成功'
  }
}

async function updateStudent(_, { id, name, age, sex }) {
  const student = students.find((student) => student.id === id)
  student.name = name
  student.age = age
  student.sex = sex

  return {
    success: true,
    message: '更新成功'
  }
}

async function deleteStudent(_, { id }) {
  const index = students.findIndex((student) => student.id === id)
  students.splice(index, 1)
  return {
    success: true,
    message: '删除成功'
  }
}

// 定义解析器, 这里可以通过执行sql\访问接口等方式获取数据
const resolvers = {
  Query: {
    students: () => students,
    teachers: () => teachers,
    studentByName: (_, { name }) => {
      return students.find((student) => student.name === args.name)
    }
  },
  Mutation: {
    addStudent,
    updateStudent,
    deleteStudent
  }
}

// 创建graphql服务
const server = new ApolloServer({
  typeDefs,
  resolvers
})

// 启动服务
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`🚀 Server ready at ${url}`)
