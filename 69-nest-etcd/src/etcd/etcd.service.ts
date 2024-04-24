import { Inject, Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
  @Inject('ETCD_CLIENT')
  private etcdClient: Etcd3;

  // 保存配置
  async saveConfig(key: string, value: string) {
    await this.etcdClient.put(key).value(value);
  }

  // 获取配置
  async getConfig(key: string) {
    return await this.etcdClient.get(key).string();
  }

  // 删除配置
  async delConfig(key: string) {
    await this.etcdClient.delete().key(key);
  }

  // 服务注册
  async registerService(
    serviceName: string,
    instanceId: string,
    metadata: any,
  ) {
    const key = `/services/${serviceName}/${instanceId}`;
    const lease = this.etcdClient.lease(10);
    await lease.put(key).value(JSON.stringify(metadata));
    lease.on('lost', async () => {
      console.log('租约过期，重新注册...');
      // 租约过期，重新注册。如果注册中心服务挂了， 代表服务不可用，整个服务集群也不可用，只有注册中心服务恢复后，服务集群才能恢复
      await this.registerService(serviceName, instanceId, metadata);
    });
  }

  // 服务发现
  async discoverService(serviceName) {
    const instances = await this.etcdClient
      .getAll()
      .prefix(`/services/${serviceName}`)
      .strings();
    return Object.entries(instances).map(([, value]) => JSON.parse(value));
  }

  // 监听服务变更
  async watchService(serviceName, callback) {
    const watcher = await this.etcdClient
      .watch()
      .prefix(`/services/${serviceName}`)
      .create();
    watcher
      .on('put', async (event) => {
        console.log('新的服务节点添加:', event.key.toString());
        callback(await this.discoverService(serviceName));
      })
      .on('delete', async (event) => {
        console.log('服务节点删除:', event.key.toString());
        callback(await this.discoverService(serviceName));
      });
  }
}
