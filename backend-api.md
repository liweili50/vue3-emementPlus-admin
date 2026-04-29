# CRM系统后端接口文档

## 1. 接口概述

本文档描述了CRM系统后端提供的所有RESTful API接口，包括接口路径、HTTP方法、请求参数、响应格式等详细信息。

### 1.1 基础路径

所有接口的基础路径为: `http://localhost:8080/api`

### 1.2 响应格式

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

**错误响应:**

```json
{
  "code": 400,
  "message": "错误描述",
  "data": null
}
```

### 1.3 状态码说明

| 状态码 | 说明             |
| :----- | :--------------- |
| 200    | 请求成功         |
| 400    | 请求参数错误     |
| 401    | 未授权，需要登录 |
| 403    | 无权限访问       |
| 404    | 资源不存在       |
| 500    | 服务器内部错误   |

---

## 2. 用户管理接口

### 2.1 用户登录

| 属性     | 值            |
| :------- | :------------ |
| **路径** | `/user/login` |
| **方法** | POST          |
| **描述** | 用户登录系统  |

**请求体:**

| 字段名   | 类型   | 必填 | 说明   |
| :------- | :----- | :--- | :----- |
| username | String | 是   | 用户名 |
| password | String | 是   | 密码   |

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "realName": "管理员",
    "email": "admin@example.com",
    "phone": "13800138000",
    "roleId": 1,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2.2 用户退出

| 属性     | 值             |
| :------- | :------------- |
| **路径** | `/user/logout` |
| **方法** | POST           |
| **描述** | 用户退出系统   |

**请求头:**

| 字段名        | 说明         |
| :------------ | :----------- |
| Authorization | Bearer Token |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 2.3 获取用户列表

| 属性     | 值               |
| :------- | :--------------- |
| **路径** | `/user/list`     |
| **方法** | GET              |
| **描述** | 分页获取用户列表 |

**查询参数:**

| 字段名   | 类型    | 必填 | 说明             |
| :------- | :------ | :--- | :--------------- |
| pageNum  | Integer | 否   | 页码，默认1      |
| pageSize | Integer | 否   | 每页大小，默认10 |
| username | String  | 否   | 用户名模糊查询   |
| realName | String  | 否   | 真实姓名模糊查询 |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "username": "admin",
        "realName": "管理员",
        "email": "admin@example.com",
        "phone": "13800138000",
        "roleId": 1,
        "status": 1,
        "createdAt": "2024-01-01 10:00:00",
        "updatedAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 2.4 获取用户详情

| 属性     | 值                  |
| :------- | :------------------ |
| **路径** | `/user/detail/{id}` |
| **方法** | GET                 |
| **描述** | 获取指定用户详情    |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 用户ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "realName": "管理员",
    "email": "admin@example.com",
    "phone": "13800138000",
    "roleId": 1,
    "status": 1,
    "createdAt": "2024-01-01 10:00:00",
    "updatedAt": "2024-01-01 10:00:00"
  }
}
```

### 2.5 新增用户

| 属性     | 值          |
| :------- | :---------- |
| **路径** | `/user/add` |
| **方法** | POST        |
| **描述** | 创建新用户  |

**请求体:**

| 字段名   | 类型    | 必填 | 说明              |
| :------- | :------ | :--- | :---------------- |
| username | String  | 是   | 用户名，唯一      |
| password | String  | 是   | 密码，至少8位     |
| realName | String  | 是   | 真实姓名          |
| email    | String  | 否   | 邮箱              |
| phone    | String  | 否   | 手机号            |
| roleId   | Long    | 是   | 角色ID            |
| status   | Integer | 否   | 状态，默认1(启用) |

```json
{
  "username": "user001",
  "password": "password123",
  "realName": "张三",
  "email": "zhangsan@example.com",
  "phone": "13900139000",
  "roleId": 2,
  "status": 1
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 2,
    "username": "user001",
    "realName": "张三",
    "email": "zhangsan@example.com",
    "phone": "13900139000",
    "roleId": 2,
    "status": 1,
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 2.6 更新用户

| 属性     | 值             |
| :------- | :------------- |
| **路径** | `/user/update` |
| **方法** | PUT            |
| **描述** | 更新用户信息   |

**请求体:**

| 字段名   | 类型    | 必填 | 说明     |
| :------- | :------ | :--- | :------- |
| id       | Long    | 是   | 用户ID   |
| username | String  | 否   | 用户名   |
| realName | String  | 否   | 真实姓名 |
| email    | String  | 否   | 邮箱     |
| phone    | String  | 否   | 手机号   |
| roleId   | Long    | 否   | 角色ID   |
| status   | Integer | 否   | 状态     |

```json
{
  "id": 2,
  "realName": "张三(修改)",
  "email": "zhangsan_new@example.com",
  "status": 1
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 2.7 删除用户

| 属性     | 值                  |
| :------- | :------------------ |
| **路径** | `/user/delete/{id}` |
| **方法** | DELETE              |
| **描述** | 删除指定用户        |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 用户ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 3. 客户管理接口

### 3.1 获取客户分页列表

| 属性     | 值               |
| :------- | :--------------- |
| **路径** | `/customer/page` |
| **方法** | GET              |
| **描述** | 分页获取客户列表 |

**查询参数:**

| 字段名   | 类型    | 必填 | 说明                          |
| :------- | :------ | :--- | :---------------------------- |
| pageNum  | Integer | 否   | 页码，默认1                   |
| pageSize | Integer | 否   | 每页大小，默认10              |
| name     | String  | 否   | 客户名称模糊查询              |
| industry | String  | 否   | 行业                          |
| level    | Integer | 否   | 客户等级(1-VIP,2-重要,3-普通) |
| status   | Integer | 否   | 客户状态(1-活跃,2-休眠)       |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "name": "华为技术有限公司",
        "contact": "王先生",
        "phone": "13800138001",
        "email": "wang@huawei.com",
        "address": "深圳市南山区",
        "industry": "通信",
        "level": 1,
        "status": 1,
        "ownerId": 1,
        "createdAt": "2024-01-01 10:00:00",
        "updatedAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 3.2 获取客户详情

| 属性     | 值                      |
| :------- | :---------------------- |
| **路径** | `/customer/detail/{id}` |
| **方法** | GET                     |
| **描述** | 获取指定客户详情        |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 客户ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "华为技术有限公司",
    "contact": "王先生",
    "phone": "13800138001",
    "email": "wang@huawei.com",
    "address": "深圳市南山区",
    "industry": "通信",
    "level": 1,
    "status": 1,
    "ownerId": 1,
    "createdAt": "2024-01-01 10:00:00",
    "updatedAt": "2024-01-01 10:00:00"
  }
}
```

### 3.3 新增客户

| 属性     | 值              |
| :------- | :-------------- |
| **路径** | `/customer/add` |
| **方法** | POST            |
| **描述** | 创建新客户      |

**请求体:**

| 字段名   | 类型    | 必填 | 说明                  |
| :------- | :------ | :--- | :-------------------- |
| name     | String  | 是   | 客户名称              |
| contact  | String  | 是   | 联系人                |
| phone    | String  | 是   | 联系电话              |
| email    | String  | 否   | 邮箱                  |
| address  | String  | 否   | 地址                  |
| industry | String  | 否   | 所属行业              |
| level    | Integer | 否   | 客户等级，默认3(普通) |
| status   | Integer | 否   | 客户状态，默认1(活跃) |
| ownerId  | Long    | 否   | 负责人ID              |

```json
{
  "name": "小米科技有限责任公司",
  "contact": "李先生",
  "phone": "13800138002",
  "email": "li@xiaomi.com",
  "address": "北京市海淀区",
  "industry": "消费电子",
  "level": 1,
  "status": 1,
  "ownerId": 1
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 2,
    "name": "小米科技有限责任公司",
    "contact": "李先生",
    "phone": "13800138002",
    "email": "li@xiaomi.com",
    "address": "北京市海淀区",
    "industry": "消费电子",
    "level": 1,
    "status": 1,
    "ownerId": 1,
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 3.4 更新客户

| 属性     | 值                 |
| :------- | :----------------- |
| **路径** | `/customer/update` |
| **方法** | PUT                |
| **描述** | 更新客户信息       |

**请求体:**

| 字段名   | 类型    | 必填 | 说明     |
| :------- | :------ | :--- | :------- |
| id       | Long    | 是   | 客户ID   |
| name     | String  | 否   | 客户名称 |
| contact  | String  | 否   | 联系人   |
| phone    | String  | 否   | 联系电话 |
| email    | String  | 否   | 邮箱     |
| address  | String  | 否   | 地址     |
| industry | String  | 否   | 所属行业 |
| level    | Integer | 否   | 客户等级 |
| status   | Integer | 否   | 客户状态 |
| ownerId  | Long    | 否   | 负责人ID |

```json
{
  "id": 2,
  "contact": "李经理",
  "phone": "13800138003",
  "level": 2
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 3.5 删除客户

| 属性     | 值                      |
| :------- | :---------------------- |
| **路径** | `/customer/delete/{id}` |
| **方法** | DELETE                  |
| **描述** | 删除指定客户            |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 客户ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 4. 订单管理接口

### 4.1 获取订单分页列表

| 属性     | 值               |
| :------- | :--------------- |
| **路径** | `/order/page`    |
| **方法** | GET              |
| **描述** | 分页获取订单列表 |

**查询参数:**

| 字段名     | 类型    | 必填 | 说明             |
| :--------- | :------ | :--- | :--------------- |
| pageNum    | Integer | 否   | 页码，默认1      |
| pageSize   | Integer | 否   | 每页大小，默认10 |
| orderNo    | String  | 否   | 订单编号模糊查询 |
| customerId | Long    | 否   | 客户ID           |
| status     | Integer | 否   | 订单状态         |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "orderNo": "SO202401010001",
        "customerId": 1,
        "customerName": "华为技术有限公司",
        "productId": 1,
        "productName": "产品A",
        "quantity": 10,
        "totalAmount": 10000.0,
        "status": 1,
        "remark": "无",
        "createdAt": "2024-01-01 10:00:00",
        "updatedAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 4.2 获取订单详情

| 属性     | 值                   |
| :------- | :------------------- |
| **路径** | `/order/detail/{id}` |
| **方法** | GET                  |
| **描述** | 获取指定订单详情     |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 订单ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "orderNo": "SO202401010001",
    "customerId": 1,
    "customerName": "华为技术有限公司",
    "productId": 1,
    "productName": "产品A",
    "quantity": 10,
    "totalAmount": 10000.0,
    "status": 1,
    "remark": "无",
    "createdAt": "2024-01-01 10:00:00",
    "updatedAt": "2024-01-01 10:00:00"
  }
}
```

### 4.3 新增订单

| 属性     | 值           |
| :------- | :----------- |
| **路径** | `/order/add` |
| **方法** | POST         |
| **描述** | 创建新订单   |

**请求体:**

| 字段名     | 类型    | 必填 | 说明        |
| :--------- | :------ | :--- | :---------- |
| customerId | Long    | 是   | 客户ID      |
| productId  | Long    | 是   | 产品ID      |
| quantity   | Integer | 是   | 数量，大于0 |
| remark     | String  | 否   | 备注        |

```json
{
  "customerId": 1,
  "productId": 1,
  "quantity": 10,
  "remark": "加急订单"
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 2,
    "orderNo": "SO202401020001",
    "customerId": 1,
    "customerName": "华为技术有限公司",
    "productId": 1,
    "productName": "产品A",
    "quantity": 10,
    "totalAmount": 10000.0,
    "status": 1,
    "remark": "加急订单",
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 4.4 更新订单

| 属性     | 值              |
| :------- | :-------------- |
| **路径** | `/order/update` |
| **方法** | PUT             |
| **描述** | 更新订单信息    |

**请求体:**

| 字段名   | 类型    | 必填 | 说明   |
| :------- | :------ | :--- | :----- |
| id       | Long    | 是   | 订单ID |
| quantity | Integer | 否   | 数量   |
| remark   | String  | 否   | 备注   |

```json
{
  "id": 2,
  "quantity": 20,
  "remark": "加急订单(修改)"
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 4.5 删除订单

| 属性     | 值                   |
| :------- | :------------------- |
| **路径** | `/order/delete/{id}` |
| **方法** | DELETE               |
| **描述** | 删除指定订单         |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 订单ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 4.6 订单审核

| 属性     | 值                                 |
| :------- | :--------------------------------- |
| **路径** | `/order/audit/{id}`                |
| **方法** | PUT                                |
| **描述** | 审核订单，将状态从待审核改为已审核 |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 订单ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 5. 产品管理接口

### 5.1 获取产品分页列表

| 属性     | 值               |
| :------- | :--------------- |
| **路径** | `/product/page`  |
| **方法** | GET              |
| **描述** | 分页获取产品列表 |

**查询参数:**

| 字段名      | 类型    | 必填 | 说明             |
| :---------- | :------ | :--- | :--------------- |
| pageNum     | Integer | 否   | 页码，默认1      |
| pageSize    | Integer | 否   | 每页大小，默认10 |
| productCode | String  | 否   | 产品编码模糊查询 |
| productName | String  | 否   | 产品名称模糊查询 |
| category    | String  | 否   | 产品分类         |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "productCode": "P001",
        "productName": "产品A",
        "category": "电子产品",
        "unit": "个",
        "price": 1000.0,
        "stock": 100,
        "createdAt": "2024-01-01 10:00:00",
        "updatedAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 5.2 获取产品列表(不分页)

| 属性     | 值                                     |
| :------- | :------------------------------------- |
| **路径** | `/product/list`                        |
| **方法** | GET                                    |
| **描述** | 获取所有产品列表(不分页，用于下拉选择) |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "productCode": "P001",
      "productName": "产品A",
      "price": 1000.0
    },
    {
      "id": 2,
      "productCode": "P002",
      "productName": "产品B",
      "price": 2000.0
    }
  ]
}
```

### 5.3 获取产品详情

| 属性     | 值                     |
| :------- | :--------------------- |
| **路径** | `/product/detail/{id}` |
| **方法** | GET                    |
| **描述** | 获取指定产品详情       |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 产品ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "productCode": "P001",
    "productName": "产品A",
    "category": "电子产品",
    "unit": "个",
    "price": 1000.0,
    "stock": 100,
    "createdAt": "2024-01-01 10:00:00",
    "updatedAt": "2024-01-01 10:00:00"
  }
}
```

### 5.4 新增产品

| 属性     | 值             |
| :------- | :------------- |
| **路径** | `/product/add` |
| **方法** | POST           |
| **描述** | 创建新产品     |

**请求体:**

| 字段名      | 类型    | 必填 | 说明           |
| :---------- | :------ | :--- | :------------- |
| productCode | String  | 是   | 产品编码，唯一 |
| productName | String  | 是   | 产品名称       |
| category    | String  | 否   | 产品分类       |
| unit        | String  | 是   | 单位           |
| price       | Decimal | 是   | 单价，大于0    |
| stock       | Integer | 否   | 库存，默认0    |

```json
{
  "productCode": "P003",
  "productName": "产品C",
  "category": "电子产品",
  "unit": "个",
  "price": 1500.0,
  "stock": 50
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 3,
    "productCode": "P003",
    "productName": "产品C",
    "category": "电子产品",
    "unit": "个",
    "price": 1500.0,
    "stock": 50,
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 5.5 更新产品

| 属性     | 值                |
| :------- | :---------------- |
| **路径** | `/product/update` |
| **方法** | PUT               |
| **描述** | 更新产品信息      |

**请求体:**

| 字段名      | 类型    | 必填 | 说明     |
| :---------- | :------ | :--- | :------- |
| id          | Long    | 是   | 产品ID   |
| productCode | String  | 否   | 产品编码 |
| productName | String  | 否   | 产品名称 |
| category    | String  | 否   | 产品分类 |
| unit        | String  | 否   | 单位     |
| price       | Decimal | 否   | 单价     |
| stock       | Integer | 否   | 库存     |

```json
{
  "id": 3,
  "price": 1600.0,
  "stock": 60
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 5.6 删除产品

| 属性     | 值                     |
| :------- | :--------------------- |
| **路径** | `/product/delete/{id}` |
| **方法** | DELETE                 |
| **描述** | 删除指定产品           |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 产品ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 6. 角色管理接口

### 6.1 获取角色分页列表

| 属性     | 值               |
| :------- | :--------------- |
| **路径** | `/role/page`     |
| **方法** | GET              |
| **描述** | 分页获取角色列表 |

**查询参数:**

| 字段名   | 类型    | 必填 | 说明             |
| :------- | :------ | :--- | :--------------- |
| pageNum  | Integer | 否   | 页码，默认1      |
| pageSize | Integer | 否   | 每页大小，默认10 |
| roleName | String  | 否   | 角色名称模糊查询 |
| roleCode | String  | 否   | 角色编码模糊查询 |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "records": [
      {
        "id": 1,
        "roleName": "管理员",
        "roleCode": "ADMIN",
        "description": "系统管理员",
        "status": 1,
        "createdAt": "2024-01-01 10:00:00",
        "updatedAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 1,
    "pageNum": 1,
    "pageSize": 10
  }
}
```

### 6.2 获取角色列表(不分页)

| 属性     | 值                       |
| :------- | :----------------------- |
| **路径** | `/role/list`             |
| **方法** | GET                      |
| **描述** | 获取所有角色列表(不分页) |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "roleName": "管理员",
      "roleCode": "ADMIN"
    },
    {
      "id": 2,
      "roleName": "普通用户",
      "roleCode": "USER"
    }
  ]
}
```

### 6.3 新增角色

| 属性     | 值          |
| :------- | :---------- |
| **路径** | `/role/add` |
| **方法** | POST        |
| **描述** | 创建新角色  |

**请求体:**

| 字段名      | 类型    | 必填 | 说明              |
| :---------- | :------ | :--- | :---------------- |
| roleName    | String  | 是   | 角色名称          |
| roleCode    | String  | 是   | 角色编码，唯一    |
| description | String  | 否   | 角色描述          |
| status      | Integer | 否   | 状态，默认1(启用) |

```json
{
  "roleName": "销售主管",
  "roleCode": "SALES_MANAGER",
  "description": "销售部门主管",
  "status": 1
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 3,
    "roleName": "销售主管",
    "roleCode": "SALES_MANAGER",
    "description": "销售部门主管",
    "status": 1,
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 6.4 更新角色

| 属性     | 值             |
| :------- | :------------- |
| **路径** | `/role/update` |
| **方法** | PUT            |
| **描述** | 更新角色信息   |

**请求体:**

| 字段名      | 类型    | 必填 | 说明     |
| :---------- | :------ | :--- | :------- |
| id          | Long    | 是   | 角色ID   |
| roleName    | String  | 否   | 角色名称 |
| roleCode    | String  | 否   | 角色编码 |
| description | String  | 否   | 角色描述 |
| status      | Integer | 否   | 状态     |

```json
{
  "id": 3,
  "description": "销售部门主管(修改)",
  "status": 1
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 6.5 删除角色

| 属性     | 值                  |
| :------- | :------------------ |
| **路径** | `/role/delete/{id}` |
| **方法** | DELETE              |
| **描述** | 删除指定角色        |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 角色ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 6.6 分配权限

| 属性     | 值                      |
| :------- | :---------------------- |
| **路径** | `/role/assign/{roleId}` |
| **方法** | POST                    |
| **描述** | 为角色分配权限          |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| roleId | Long | 角色ID |

**请求体:**

| 字段名        | 类型   | 必填 | 说明       |
| :------------ | :----- | :--- | :--------- |
| permissionIds | Long[] | 是   | 权限ID数组 |

```json
{
  "permissionIds": [1, 2, 3, 4, 5]
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 7. 权限管理接口

### 7.1 获取权限列表

| 属性     | 值                 |
| :------- | :----------------- |
| **路径** | `/permission/list` |
| **方法** | GET                |
| **描述** | 获取所有权限列表   |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": 1,
      "permName": "客户管理",
      "permCode": "customer:manage",
      "url": "/customer",
      "method": "GET",
      "parentId": 0
    },
    {
      "id": 2,
      "permName": "客户新增",
      "permCode": "customer:add",
      "url": "/customer/add",
      "method": "POST",
      "parentId": 1
    }
  ]
}
```

### 7.2 新增权限

| 属性     | 值                |
| :------- | :---------------- |
| **路径** | `/permission/add` |
| **方法** | POST              |
| **描述** | 创建新权限        |

**请求体:**

| 字段名   | 类型   | 必填 | 说明            |
| :------- | :----- | :--- | :-------------- |
| permName | String | 是   | 权限名称        |
| permCode | String | 是   | 权限编码，唯一  |
| url      | String | 否   | 访问路径        |
| method   | String | 否   | 请求方法        |
| parentId | Long   | 否   | 父权限ID，默认0 |

```json
{
  "permName": "订单管理",
  "permCode": "order:manage",
  "url": "/order",
  "method": "GET",
  "parentId": 0
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 10,
    "permName": "订单管理",
    "permCode": "order:manage",
    "url": "/order",
    "method": "GET",
    "parentId": 0,
    "createdAt": "2024-01-02 10:00:00",
    "updatedAt": "2024-01-02 10:00:00"
  }
}
```

### 7.3 更新权限

| 属性     | 值                   |
| :------- | :------------------- |
| **路径** | `/permission/update` |
| **方法** | PUT                  |
| **描述** | 更新权限信息         |

**请求体:**

| 字段名   | 类型   | 必填 | 说明     |
| :------- | :----- | :--- | :------- |
| id       | Long   | 是   | 权限ID   |
| permName | String | 否   | 权限名称 |
| permCode | String | 否   | 权限编码 |
| url      | String | 否   | 访问路径 |
| method   | String | 否   | 请求方法 |
| parentId | Long   | 否   | 父权限ID |

```json
{
  "id": 10,
  "permName": "订单管理(修改)"
}
```

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

### 7.4 删除权限

| 属性     | 值                        |
| :------- | :------------------------ |
| **路径** | `/permission/delete/{id}` |
| **方法** | DELETE                    |
| **描述** | 删除指定权限              |

**路径参数:**

| 字段名 | 类型 | 说明   |
| :----- | :--- | :----- |
| id     | Long | 权限ID |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 8. 数据分析接口

### 8.1 获取仪表盘数据

| 属性     | 值                    |
| :------- | :-------------------- |
| **路径** | `/analysis/dashboard` |
| **方法** | GET                   |
| **描述** | 获取仪表盘统计数据    |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "customerCount": 100,
    "orderCount": 50,
    "totalAmount": 1000000.0,
    "conversionRate": 35.5
  }
}
```

### 8.2 获取销售趋势

| 属性     | 值                      |
| :------- | :---------------------- |
| **路径** | `/analysis/sales-trend` |
| **方法** | GET                     |
| **描述** | 获取近7日销售趋势数据   |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "labels": ["04-18", "04-19", "04-20", "04-21", "04-22", "04-23", "04-24"],
    "data": [12000, 15000, 18000, 14000, 20000, 16000, 19000]
  }
}
```

### 8.3 获取客户统计

| 属性     | 值                        |
| :------- | :------------------------ |
| **路径** | `/analysis/customer-stat` |
| **方法** | GET                       |
| **描述** | 获取客户统计数据          |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "levelStat": [
      { "name": "VIP客户", "value": 20 },
      { "name": "重要客户", "value": 30 },
      { "name": "普通客户", "value": 50 }
    ],
    "statusStat": [
      { "name": "活跃客户", "value": 80 },
      { "name": "休眠客户", "value": 20 }
    ],
    "industryStat": [
      { "name": "通信", "value": 30 },
      { "name": "消费电子", "value": 25 },
      { "name": "金融", "value": 20 },
      { "name": "其他", "value": 25 }
    ]
  }
}
```

### 8.4 获取订单统计

| 属性     | 值                     |
| :------- | :--------------------- |
| **路径** | `/analysis/order-stat` |
| **方法** | GET                    |
| **描述** | 获取订单统计数据       |

**成功响应:**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "statusStat": [
      { "name": "待审核", "value": 10 },
      { "name": "已审核", "value": 20 },
      { "name": "已完成", "value": 15 },
      { "name": "已取消", "value": 5 }
    ],
    "monthAmount": [
      { "month": "1月", "amount": 200000 },
      { "month": "2月", "amount": 250000 },
      { "month": "3月", "amount": 300000 },
      { "month": "4月", "amount": 250000 }
    ]
  }
}
```

---

## 附录

### A. 订单状态码

| 状态码 | 说明   |
| :----- | :----- |
| 1      | 待审核 |
| 2      | 已审核 |
| 3      | 已完成 |
| 4      | 已取消 |

### B. 客户状态码

| 状态码 | 说明 |
| :----- | :--- |
| 1      | 活跃 |
| 2      | 休眠 |

### C. 客户等级码

| 等级码 | 说明     |
| :----- | :------- |
| 1      | VIP客户  |
| 2      | 重要客户 |
| 3      | 普通客户 |

---

**文档版本**: v1.0
**创建时间**: 2026年4月
**适用项目**: CRM系统
