# Utage Client

## 备忘

### NPM 命令

1. 下载并安装依赖项

    ```shell
    cd client
    npm install
    ```

2. 开发测试运行：打开两个终端，`--dev` 可以输入，也可以不输入

    ```shell
    # first terminal
    npm start
    # second terminal
    electron . [--dev]
    ```

3. 开发测试打包运行：必须输入 `--build`

    ```
    npm run build
    electron . --build
    ```
    
4. 打包，在打包文件中找到 exe 文件并运行。

    ```shell
    npm run package
    ```

<p align="right">2021 5/9</p>