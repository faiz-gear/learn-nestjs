import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  @InjectEntityManager()
  entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    /* ---------------------------------- 插入数据 ---------------------------------- */
    // const city = new City();
    // city.name = '华北';
    // await this.entityManager.save(city);
    // const cityChild = new City();
    // cityChild.name = '山东';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华北',
    //   },
    // });
    // if (parent) {
    //   cityChild.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild);
    // const city = new City();
    // city.name = '华南';
    // await this.entityManager.save(city);
    // const cityChild1 = new City();
    // cityChild1.name = '云南';
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '华南',
    //   },
    // });
    // if (parent) {
    //   cityChild1.parent = parent;
    // }
    // await this.entityManager.save(City, cityChild1);
    // const cityChild2 = new City();
    // cityChild2.name = '昆明';
    // const parent2 = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // if (parent) {
    //   cityChild2.parent = parent2;
    // }
    // await this.entityManager.save(City, cityChild2);
    /* ---------------------------------- 插入数据 ---------------------------------- */

    /* --------------------------------- 查询嵌套数据 --------------------------------- */
    // return this.entityManager.getTreeRepository(City).findTrees();
    // return this.entityManager.getTreeRepository(City).find(); // 扁平结构
    /* --------------------------------- 查询嵌套数据 --------------------------------- */

    /* ---------------------------------- 查询根节点 --------------------------------- */
    // return this.entityManager.getTreeRepository(City).findRoots();
    /* ---------------------------------- 查询根节点 --------------------------------- */

    /* ------------------------------ 查询某个节点及所有后代节点 ----------------------------- */
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // return (
    //   this.entityManager
    //     .getTreeRepository(City)
    //     // .findDescendantsTree(parent); // 树结构返回
    //     .findDescendants(parent) // 扁平结构返回
    // );
    /* ------------------------------ 查询某个节点及所有后代节点 ----------------------------- */

    /* ------------------------------ 查询某个节点及所有祖先节点 ----------------------------- */
    // const parent = await this.entityManager.findOne(City, {
    //   where: {
    //     name: '云南',
    //   },
    // });
    // return (
    //   this.entityManager
    //     .getTreeRepository(City)
    //     // .findAncestorsTree(parent); // 树结构返回
    //     .findAncestors(parent) // 扁平结构返回
    // );
    /* ------------------------------ 查询某个节点及所有祖先节点 ----------------------------- */

    /* ----------------------------------- 计数 ----------------------------------- */
    const parent = await this.entityManager.findOne(City, {
      where: {
        name: '云南',
      },
    });
    // return this.entityManager.getTreeRepository(City).countAncestors(parent);
    return this.entityManager.getTreeRepository(City).countDescendants(parent);
    /* ----------------------------------- 计数 ----------------------------------- */
  }
  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
