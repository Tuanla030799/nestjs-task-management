### NestJs Pipes
  * Pipes hoạt động dựa trên đối số (arguments) sẽ đc xử lí bởi trình sử lý, ngay tr khi trình sử lý đc gọi
  * Pipes có thể thực hiện chuyển đổi dữ liệu (data transformation) hoặc xác thực dữ liệu (data validation) 
  * Pipes có thể trả về dwux liệu bản gốc hoặc đã qua sửa dổi , sẽ đc chuyển cho router handle
  * Pipes có thể ném ra ngoại lệ, những ngoại lệ đó sẽ đc xử lí bori Nestjs và đc parsed đến erorr response
  * Pipes có thể là bất đồng bộ

### default pipes in nestjs
  * pipes khá hữ ích ở trong @nestjs/common module
  * validationPipe: xác nhận tính tuwong thích của toàn bộ đối tượng tới một lớp (hoạt động tốt với DTOs), nếu 1 thuộc tính anfo không thể  ánh xạ đúng  => validation will fail
  * mặc định , đối số có dạng String, pipe sẽ xác thực nó là một number. nếu thành công, dối số chuyển đổ thành một number 

### custom pipe implementation
  * pipes là các lớp đc chú thích bằng @Injectable decorator
  * pipes đc triển khai PipeTransform generic interface , vì thế tất cả pipe phải có một phương thức tranform(), phuwong thức này sẽ đc gọi bở netjs để xử lí các đối số
  * transform() method chấp nhận 2 tham số:
    + value: giá trị của tiến trình xử lí đối số
    + metadata (optional): 1 obj chứa đựng siêu dữ liệu về đối số
  * tất cả đc returned bằng tranform() method sẽ thông qua router handle. exceptions sẽ đc gửi lại tới client
  * pipes có thể sử dụng theo nhiều cách khác nhau

### handler-level pipes
  * đc định nghĩa tại trình xử lí cấp bậc thông qua @UsePipes() decorator. pipe sẽ xử lí tất cả các tham số cho các yêu cầu đến
    ex: @Post
        @UsePipes(SomePipe)
        createTask(
          @Body('Description') description
        ) {
          //...
        }

### parameter-level pipes 
  * đc định nghĩa tại parameter level. chỉ tham số đặc biệt mà pipe đc chỉ định sẽ đc xử lí
    ex: @Post()
        createTask(
          @Body ('description', Somepipe) description
        ) {
          //...
        }
### global pipes 
  * đc định nghĩa tại application level và sẽ đc áp dụng  một vài yêu cầu đến
    ex: async function bootstrap() {
      const app = await NestFactory.create(ApplicationModule);
      app.useGlobalPipes(SomePipe);
      await app.listen(3000);
    }
    bootstrap();

### parameter-level vs handle-level pipes. 
