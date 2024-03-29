# validForm
原生的表单数据验证工具
#使用方法
- 首先引入src目录中的validForm.js或dist目录中的validForm.min.js(压缩版)
    - 代码实例:

```html
<form id="mainForm">
    方式<select name="method" id="test">
        <option value="">请填写</option>
        <option value="1">a</option>
        <option value="2">b</option>
        <option value="3">c</option>
    </select><br>
    姓名<input type="text" name="name" /><br>
    密码<input type="password" name="pwd" /><br>
    邮箱<input type="text" name="email" /><br>
    <button id="submit">提交</button><br>
</form>
```

```js
$('#submit').on('click', function(){
        var data = {
            method:['select[name="method"]', null, '请选择方式'],
            name:  ['input[name="name"]', , '姓名必填'],
            pwd:   ['input[name="pwd"]', '', '密码必填'],
            email: ['input[name="email"]', 'empty', '邮箱必填']
        };
        var model = {el: '#mainForm', data: data};
        validForm(model, function(msg){
            alert(msg);
        });
    });
    
/*****详细说明:******/
   /*
    * data(校验数据集合): { 校验单元名称: [ 校验元素(css选择器语法), 校验规则(正则表达式或内置校验规则), 校验提示语(空校验正确提示，其它校验失败提示)] }
    * model(校验模型): { el: 校验表单(css选择器语法), data: [data[method], data[name]](自定义校验数据集合)}
    * 内置校验规则：
    *   1.empty    空(空的校验规则也可以是null、undefined、'')
    *   2.isNumber 数字格式
    *   3.isEmail  email格式
    *   4.isUrl    url格式
    *   5.isMobile 手机号格式
    *   6.isID     身份证号格式
    *   7.isDate   日期格式(2014-07-05 2014-7-5 或2014/07/05 2014/7/5)
    * 
    * model的另一种等价写法:
    * var model = {el: '#mainForm', data: [data.method, data.name, data.pwd, data.email]};
    *
    * 调用时,也可以写为validForm(model)回调函数不写,默认采用原生alert方式提示 
    */
```