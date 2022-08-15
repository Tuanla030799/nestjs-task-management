### What is a providers

  * có thể được đưa vào constructor nếu decorated as an @Injectable, via dependency injection
  * chúng có thể là một value, class, sync/async factory etc
  * Providers phải đc cung cấp cho một module để chúng có thể sử dụng (injectable) 

### what is a Service ? 

  * đc định nghĩa là providers. not all providers are service.
  * services đc thực hiện dưới dạnh Singletons là mô hình thiết kế khi đc bọc bằng @Injectable() và cung cấp cho module
  
### dependency injection in Nestjs

### create service
  
  * nest g service tasks --no-spec