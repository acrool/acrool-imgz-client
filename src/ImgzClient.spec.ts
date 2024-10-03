import * as path from 'path';
import Docker from 'dockerode';
import ImgzClient from './ImgzClient';

const docker = new Docker();
const image = 'imagine10255/acrool-imgz-api:latest';

describe('BearImageminClient', () => {
    let container: Docker.Container;
    const timeout = 30 * 1000;

    beforeAll(async() => {
        // 在測試開始前啟動 Docker 容器
        container = await docker.createContainer({
            Image: image,
            Tty: true,
            ExposedPorts: {'3000/tcp': {}},
            HostConfig: {
                PortBindings: {'3000/tcp': [{HostPort: '8082'}]},
            },
        });

        await container.start();

        await new Promise((resolve) => setTimeout(resolve, 10000));
        return container;
    }, timeout);

    afterAll(async () => {
        // 測試結束後關閉 Docker 容器
        await container.stop();
        await container.remove();
    }, timeout);


    test('squash should compress an image and save it to the specified path', async () => {
        const imgzClient = new ImgzClient('http://localhost:8082');

        const filePath = path.join(__dirname, '../../static/fixture.jpg');
        const uploadIOPath = path.join(__dirname, '../../static/losslessSquash.webp');

        const options = {
            resize: {width: 250},
            quality: 90,
            timeout,
        };
        const result = await imgzClient
            .squashWebp(filePath, uploadIOPath, options);

        expect(result).toEqual(uploadIOPath);
    }, timeout);
});
