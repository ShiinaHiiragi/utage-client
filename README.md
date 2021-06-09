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

3. 开发测试打包运行：必须输入 `--build`。经过测试，打包一次本应用大约需要 12 分钟。

    ```
    npm run build
    npm run build-copy
    electron . --build
    ```
    
4. 打包，在打包文件中找到 exe 文件并运行。

    ```shell
    npm run build
    npm run build-copy
    npm run package
    ```

### 文件结构

Electron 和 React 混用时，其文件结构相差很大

#### 开发模式

1. 无论在何种在开发模式下，`node.js` 能访问到的当前文件是开发文件目录。现在在 `.` 创建一个只有 Node.js 会访问的文件 `data`，那么访问路径就是 `./data`
2. 如果是以访问 `localhost` 的形式进入测试状态时，不允许访问无关的本地资源。
3. 如果是以访问 `build` 文件的形式进入测试状态，那么可以将图片放在 React 路径下的 `static/img`，这在 Electron 下环境是 `./build/static/img`

#### 发布模式

假设 `electron-packager` 打包上述文件，文件叫 `UtageClient-win32-x64`

1. Electron 的 Node.js 环境下，当前文件 `.` 即为  `UtageClient-win32-x64`，`data` 文件的内容只有 Node.js 环境会访问，路径为 `./data`
2. 在 React 环境下， `import` 依赖会被自动整合，不需要额外关注。 React 经过 `npm run build` 后得到的文件夹 `build` 作为打包后 `main.js` 的入口，可以将图片放在 React 路径下的 `static/img`，这在 Electron 下环境是 `./resources/app/build/static/img`
3. 打包时，将 `data`复制到 `UtageClient-win32-x64`，删除 `UtageClient-win32-x64/resources/app/` 下的 `src`，`data`，和 `static`（如果有的话）

### 延迟填充

1. IndexedDB 查询 `profile`
    - 如果没有 `profile`，那么向 `server` 搜索，返回结果存到 DB，之后重新执行查询；
    - 如果有 `profile` ，直接返回 `profile`， 同时异步向 `server` 搜索 `hash`
        - 同时异步向 `server` 搜索 `hash` 的过程
            - 如果值不同，那么重新申请 `profile` 并替换
            - 如果值相同，那么什么也不做
        - 直接返回 `profile` 之后的过程：显示出来
2. IndexedDB 查询 `group`
    - 如果没有 `profile`，那么向 `server` 搜索，返回结果存到 DB，之后重新执行查询；
    - 如果有 `profile` ，直接返回 `profile`， 同时异步向 `server` 搜索 `hash`
        - 异步向 `server` 搜索 `hash` 的过程
            - 如果值不同，那么重新申请 `profile` 并替换
            - 如果值相同，什么也不做
        - 直接返回 `profile` 之后的过程：查询 `groupHolderName` 字段是否有值
            - 如果有值，什么也不做
            - 如果没有值，查询 UID 对应的 `profile`（上述），得到名字，填进 `groupHolderName` 里面
3. `profile` 更新后，重新渲染页面

<p align="right">2021 5/9</p> 
