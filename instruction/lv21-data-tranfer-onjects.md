### more about DTOs
  * đây không phải 1 khái niệm riêng trong nestjs
  * DTO không có bất kì hành vi nào ngoại trừ việc tuần tự hóa kho lưu trữ 
  * Dẫn đến hiệu suất tăng lên mặc dù ko ảnh hưởng đáng kể trong các app nhỏ
  * có thể hữu ích trong việc xác thực dữ liệu
  * định nghĩa 1 dạng của một dữ liệu
  * có thể đc định nghĩa thông qua interface hoặc class

### classes vs interfaces for DTOs
  * Data Transfer Object (DTOs) có thể đc định nghĩa bởi classes or interfaces
  * các phương pháp đc đề xuất là sử dụng classes
  * interfaces là 1 phần của TS => ko đc bảo tồn
  * classes cho phép làm nhiều hơn và chúng là 1 phần của js nên sẽ đc bảo tồn trong thời gian chạy
  * nestjs không thể tham chiếu đến interfaces at runtime nhưng có thể tham chiêu đến classes
  
### important note!
  * DTOs là khoogn bắt buộc, có thể triển khai các ứng dụng mà không cần DTOs
  * Tuy nhiên áp dụng DTOs sẽ giúp duy trì và tái cấu trúc
