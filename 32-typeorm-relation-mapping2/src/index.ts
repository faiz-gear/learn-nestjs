import { AppDataSource } from './data-source'
import { Department } from './entity/Department'
import { Employee } from './entity/Employee'

AppDataSource.initialize()
  .then(async () => {
    /* ----------------------------------- 保存 ----------------------------------- */
    // const e1 = new Employee()
    // e1.name = '张三'
    // const e2 = new Employee()
    // e2.name = '李四'
    // const e3 = new Employee()
    // e3.name = '王五'
    // const d1 = new Department()
    // d1.name = '技术部'
    // d1.employees = [e1, e2, e3]
    // await AppDataSource.manager.save(Department, d1)
    // await AppDataSource.manager.save(Employee, [e1, e2, e3])
    /* ----------------------------------- 保存 ----------------------------------- */
    /* ----------------------------------- 查询 ----------------------------------- */
    const deps = await AppDataSource.manager.find(Department, {
      relations: {
        employees: true
      }
    })
    // console.log(deps)
    // const es = await AppDataSource.manager
    //   .getRepository(Department)
    //   .createQueryBuilder('d')
    //   .leftJoinAndSelect('d.employees', 'e')
    //   .getMany()
    // console.log(es)
    // console.log(es.map((e) => e.employees))
    /* ----------------------------------- 查询 ----------------------------------- */
    /* ----------------------------------- 删除 ----------------------------------- */
    await AppDataSource.manager.delete(Employee, deps[0].employees) // 由于是cascade级联，需要先删除子表数据
    await AppDataSource.manager.delete(Department, deps[0].id)
    /* ----------------------------------- 删除 ----------------------------------- */
  })
  .catch((error) => console.log(error))
