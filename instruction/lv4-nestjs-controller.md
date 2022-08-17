### Controller
  * chịu trách nhiệm xử lí request and returning respone to the client
  * bị ràng buộc bởi một đg dẫn cụ thể
  * chứa trình xử lí and request method

### defining a controller
  * @container decorator
  * chấp nhận một string , nó sẽ là đg dẫn đc xử lí bở controller
    + ex: @controller('/task')
  * method: @Get, @Post, @Patch, @Put, @Delete
  * HTTP request is comming -> Request router to controller -> handle is called with argument -> handler the request
  * create controller: nest g controller task -no-spec 