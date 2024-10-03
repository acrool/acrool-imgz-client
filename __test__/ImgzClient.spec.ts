import * as path from 'path';
import Docker from 'dockerode';
import ImgzClient from '../src/ImgzNodeClient';
import * as fs from 'fs';

describe('Test for mock server', () => {
    let container: Docker.Container;
    const timeout = 30 * 1000;

    const docker = new Docker();
    const image = 'imagine10255/acrool-imgz-api:latest';


    beforeAll(async() => {
        // 清理測試檔案
        if (fs.existsSync(uploadIOPath)) {
            fs.unlinkSync(uploadIOPath);
        }
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


    const filePath = path.join(__dirname, './assets/sample.jpg');
    const uploadIOPath = path.join(__dirname, './out/sample.webp');
    const uploadIOThumbPath = path.join(__dirname, './out/sample_thumb.webp');

    test('squash should compress an image and save it to the specified path', async () => {
        const imgzClient = new ImgzClient('http://localhost:8082');

        const options = {
            resize: {width: 500},
            quality: 90,
        };
        const thumbOptions = {
            resize: {width: 100},
            quality: 80,
        };
        await imgzClient
            .squashWebp(filePath)
            .toSave(uploadIOThumbPath, thumbOptions)
            .toSave(uploadIOPath, options)
            .completeAll();

        expect(fs.existsSync(uploadIOThumbPath)).toBe(true);
        expect(fs.existsSync(uploadIOPath)).toBe(true);
    }, timeout);
});




describe('Test for real server', () => {
    const filePath = path.join(__dirname, './assets/sample.jpg');
    const uploadIOPath = path.join(__dirname, './out/sample.webp');
    const uploadIOThumbPath = path.join(__dirname, './out/sample_thumb.webp');

    beforeAll(() => {
        // 清理測試檔案
        if (fs.existsSync(uploadIOPath)) {
            fs.unlinkSync(uploadIOPath);
        }
    });
    
    test('squash should compress an image and save it to the specified path', async () => {

        const imgzClient = new ImgzClient('http://localhost:8081');

        const options = {
            resize: {width: 500},
            quality: 90,
        };
        const thumbOptions = {
            resize: {width: 100},
            quality: 80,
        };
        await imgzClient
            .squashWebp(filePath)
            .toSave(uploadIOThumbPath, thumbOptions)
            .toSave(uploadIOPath, options)
            .completeAll();


        expect(fs.existsSync(uploadIOThumbPath)).toBe(true);
        expect(fs.existsSync(uploadIOPath)).toBe(true);
    });
});
