### 1.getNowFileList

##### 接口功能

> 获取当前存储空间下绝对路径下的文件或文件夹
>
> 绝路路径例如：
>
> /
>
> /test/
>
> /test/123123/
>
> /test/test/test

##### 请求方式

- POST

##### 请求根路径

- http://172.23.252.223:8085/api/file/getNowFileList

##### token:

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs

##### 参数类型

```json
//json
{
    "groupId":-1,
    "absolutePath":"/"
}
```

##### Example Request

```vue
curl --location 'http://172.23.252.223:8085/api/file/getNowFileList' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs' \
--data '{
    "groupId":-1,
    "absolutePath":"/"
}'
```

### 2.upload

##### 接口功能

>post的upload就是进行分块上传的。
>
>绝对路径最后一定是已“/”结尾的，根目录的绝对路径就是“/”
>
>举例：
>
>/test/
>
>/123/test/

##### 请求方式

- POST

##### 参数说明

| 字段名           | 字段值     |
| ---------------- | ---------- |
| chunkNumber      | 1          |
| chunkSize        | 100        |
| currentChunkSize | 100        |
| totalSize        | 200        |
| identifier       | 123        |
| filename         | 亦菲.jpg   |
| totalChunks      | 2          |
| groupId          | 1          |
| uploadCloudPath  | /          |
| file             | 二进制文件 |

##### Example Request

```
curl --location 'http://localhost:8080/file/upload' \
--header 'token;' \
--form 'chunkNumber="1"' \
--form 'chunkSize="100"' \
--form 'currentChunkSize="100"' \
--form 'totalSize="200"' \
--form 'identifier="123"' \
--form 'filename="亦菲.jpg"' \
--form 'totalChunks="2"' \
--form 'groupId="1"' \
--form 'uploadCloudPath="/"' \
--form 'file=""'
```

### 3.merge

##### 接口功能

> 等待所有文件分片上传完成后，发生post合并请求，将分块文件合并。

##### 请求方式

- POST

##### 请求根路径

- http://localhost:8080/file/merge

##### 参数说明

| 字段名          | 字段值           |
| --------------- | ---------------- |
| totalSize       |                  |
| identifier      |                  |
| filename        |                  |
| totalChunks     |                  |
| uploadCloudPath |                  |
| groupId         | -1则表示用户目录 |

##### Example Response

```
curl --location 'http://localhost:8080/file/merge' \
--header 'token;' \
--data-urlencode 'totalSize=' \
--data-urlencode 'identifier=' \
--data-urlencode 'filename=' \
--data-urlencode 'totalChunks=' \
--data-urlencode 'uploadCloudPath=' \
--data-urlencode 'groupId='
```

### 4.download

##### 接口功能

download接口返回的是文件url,而不是文件本身

##### 请求方式

- POST

请求根路径

- http://localhost:8080/api/file/download

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs

##### 参数说明

| 字段名   | 字段值                               |
| -------- | ------------------------------------ |
| groupId  | -1                                   |
| id       | 1597122230293192705  文件id          |
| parentId | 2 当前文件父目录id                   |
| filename | ubuntu-20.04.5-live-server-amd64.iso |

##### Example Request

```
curl --location 'http://localhost:8080/api/file/download' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs' \
--form 'groupId="-1"' \
--form 'id="1597122230293192705"' \
--form 'parentId="2"' \
--form 'filename="ubuntu-20.04.5-live-server-amd64.iso"'
```

### 5.moveFiles

##### 接口功能

移动文件API

##### 请求方式

- POST

##### 请求根路径

- http://localhost:8080/api/file/moveFiles

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkMTgxOTlmNTJhMDg0NjFlOTUxNDkzZTE0YTA5YWFkYSIsInN1YiI6ImY3MjA5MWQzMzRkMzRiNGViMGRiNzY3MTAyMGU2YWE5IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjcxMDI4Nzg4LCJleHAiOjE2NzM2MjA3ODh9.6z_W9G9I8YI57zMcEQ8DlQTK1cRGpe2odu_HxNahtMM

##### 参数说明

| 字段名      | 字段值                           |
| ----------- | -------------------------------- |
| destination | 目标目录的绝对路径               |
| groupId     | 群组的id 若是用户文件操作则为 -1 |
| files       | 选择的文件数组                   |

需要的基本参数：

```javascript
{
    "destination": "/", 
    "groupId": "-1",  
    "files": [{"directoryType":true,"id":8,"path":"/llll/456/arc/55555/","name":"/55555/","parentId":7,"size":"0","type":"other"}]
}
```

前端传参ContentVo基本参数

```javascript
{"directoryType":true,"id":8,"path":"/llll/456/arc/55555/","name":"/55555/","parentId":7,"size":"0","type":"other"}
```

##### 参数类型

```json
{
    "destination": "/Out/第二层2/",
    "groupId": -1,
    "files": [
        {
            "directoryType": true,
            "name": "/Out/",
            "size": null,
            "type": null,
            "id": 10298546330005,
            "parentId": 3093632770000,
            "path": "/Out/",
            "icon": "http://file.re1ife.top/icon/file/folder.png",
            "uploadDate": null
        }
    ]
}
```

##### Example Request

```
curl --location 'http://localhost:8080/file/moveFiles' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNzc0ZGNhYmVlNzk0YTg0YWZjN2EyYzgwYWIxYzhlZiIsInN1YiI6ImYwMDQ4ZWQ4NTFmNDRmOTU4MjRhNDljZmQ3MWFjMzk2IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY4OTExNTMwLCJleHAiOjE2NzE1MDM1MzB9.G0ZaaraFpcW14z6Votsvb9If_XijlmjBFvQM5sgY97k' \
--data '{
    "destination": "/test/",
    "groupId": "1",
    "files": [{"directoryType":false,"id":400,"name":"四极小班de教学任务","parentId":1,"size":"140","type":"other"}]
}'
```

##### Example Response

```json
{
  "code": 404,
  "msg": "文件不存在",
  "data": null
}
```

### 6.copyFile Copy

##### 请求根路径

- http://localhost:8080/file/copyFiles

##### 请求方式

- POST

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNzc0ZGNhYmVlNzk0YTg0YWZjN2EyYzgwYWIxYzhlZiIsInN1YiI6ImYwMDQ4ZWQ4NTFmNDRmOTU4MjRhNDljZmQ3MWFjMzk2IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY4OTExNTMwLCJleHAiOjE2NzE1MDM1MzB9.G0ZaaraFpcW14z6Votsvb9If_XijlmjBFvQM5sgY97k

##### 参数类型

```json
{
    "destination": "/llll/456/",
    "groupId": -1,
    "files": [{"directoryType":true,"id":8,"path":"/55555/","name":"/55555/","parentId":2,"size":0,"type":"other"}]
}
```

##### Example Request

```
curl --location 'http://localhost:8080/file/copyFiles' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwNzc0ZGNhYmVlNzk0YTg0YWZjN2EyYzgwYWIxYzhlZiIsInN1YiI6ImYwMDQ4ZWQ4NTFmNDRmOTU4MjRhNDljZmQ3MWFjMzk2IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY4OTExNTMwLCJleHAiOjE2NzE1MDM1MzB9.G0ZaaraFpcW14z6Votsvb9If_XijlmjBFvQM5sgY97k' \
--data '{
    "destination": "/llll/456/",
    "groupId": -1,
    "files": [{"directoryType":true,"id":8,"path":"/55555/","name":"/55555/","parentId":2,"size":0,"type":"other"}]
}'
```

### 7.deleteFiles

##### 请求根路径

- http://localhost:8080/api/file/deleteFiles

##### 请求方式

- POST

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs

##### 参数类型

```json
{
    "destination": "/",
    "groupId": -1,
    "files": [
        {
            "directoryType": false,
            "name": "prof.png",
            "size": 104356,
            "type": "png",
            "id": 1595375794966888449,
            "parentId": 2,
            "path": "/",
            "icon": "http://172.23.252.223:8085/icon/other.png",
            "uploadDate": null
        }
    ]
}
```

##### Example Request

```
curl --location 'http://localhost:8080/api/file/deleteFiles' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs' \
--data '{
    "destination": "/",
    "groupId": -1,
    "files": [
        {
            "directoryType": false,
            "name": "prof.png",
            "size": 104356,
            "type": "png",
            "id": 1595375794966888449,
            "parentId": 2,
            "path": "/",
            "icon": "http://172.23.252.223:8085/icon/other.png",
            "uploadDate": null
        }
    ]
}'
```

### 8.createDir

##### 请求根路径

- http://localhost:8080/api/file/createDir

##### 请求方式

- POST

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2OGYwNTNmMWY3MWQ0OWYwODBkMGU4YTNiYjZiZGUxZiIsInN1YiI6IjQyNjIwM2NmYjQ4NzQ3Y2ZiNDhmMTc5YmI4YzgwNWM3IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTAyODk2LCJleHAiOjE2NzE2OTQ4OTZ9.caFr3fhJxUg2MnT8buhZV0fEyQdLReXXZk6pGq4D8z0

##### 参数类型

```json
{
    "destination":"/",
    "groupId":-1,
    "dirName":"/new Folder/"
}
```

##### Example Request

```
curl --location 'http://localhost:8080/api/file/createDir' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2OGYwNTNmMWY3MWQ0OWYwODBkMGU4YTNiYjZiZGUxZiIsInN1YiI6IjQyNjIwM2NmYjQ4NzQ3Y2ZiNDhmMTc5YmI4YzgwNWM3IiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTAyODk2LCJleHAiOjE2NzE2OTQ4OTZ9.caFr3fhJxUg2MnT8buhZV0fEyQdLReXXZk6pGq4D8z0' \
--data '{
    "destination":"/",
    "groupId":-1,
    "dirName":"/new Folder/"
}'
```

### 1.search

请求根路径

- http://localhost:8080/api/file/searchFiles

请求方式

- GET

##### token

eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs

##### 参数说明

| 字段名   | 字段值 |
| -------- | ------ |
| fileName | login  |
| groupId  | -1     |

##### Example Request

```
curl --location --request GET 'http://localhost:8080/api/file/searchFiles' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyNzE5ZDdkZGU1ZDY0NTU5ODY3Y2NmYTEwYjBlNDI1ZCIsInN1YiI6ImFlNjQ2ZTkxYjJmOTQ3NzNiNTVlMjkyYjgzMGY0MzkzIiwiaXNzIjoicmUxaWZlIiwiaWF0IjoxNjY5MTA0MjAyLCJleHAiOjE2NzE2OTYyMDJ9.6T4IYRE1rPQ3x6EiZV741FMYhEANq4xxZK_4k4zMCJs' \
--form 'fileName="login"' \
--form 'groupId="-1"'
```

### 2.download

请求方式

- GET

##### Example Request

```
curl --location ''
```

