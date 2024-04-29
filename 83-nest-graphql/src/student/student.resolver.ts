import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

const students = [
  {
    id: '1',
    name: async () => {
      return await '小明1';
    },
    sex: true,
    age: 18,
  },
  {
    id: '2',
    name: '小红',
    sex: false,
    age: 19,
  },
  {
    id: '3',
    name: '小刚',
    sex: true,
    age: 20,
  },
];

const teachers = [
  {
    id: '1',
    name: 'lyle',
    sex: true,
    subject: ['体育', '数学'],
    age: 25,
    students: students,
  },
];

@Resolver()
export class StudentResolver {
  @Query('students')
  async getStudents() {
    return await students;
  }

  @Query('teachers')
  async getTeachers() {
    return await teachers;
  }

  @Mutation('addStudent')
  async addStudent(
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('sex') sex: boolean,
  ) {
    const id = Math.floor(Math.random() * 1000) + '';
    students.push({
      id,
      name,
      age,
      sex,
    });
    return {
      id,
      success: true,
    };
  }

  @Mutation()
  updateStudent(
    @Args('id') id,
    @Args('name') name: string,
    @Args('age') age: number,
    @Args('sex') sex: boolean,
  ) {
    const index = students.findIndex((item) => {
      return item.id === id;
    });

    if (index === -1) {
      return {
        id: null,
        success: false,
      };
    }

    students[index].name = name;
    students[index].age = age;
    students[index].sex = sex;
    return {
      id,
      success: true,
    };
  }

  @Mutation()
  deleteStudent(@Args('id') id) {
    const index = students.findIndex((item) => {
      return item.id === id;
    });

    if (index === -1) {
      return {
        id: null,
        success: false,
      };
    }

    students.splice(index, 1);
    return {
      id,
      success: true,
    };
  }
}
