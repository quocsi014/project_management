<?php
namespace Storage;

use PDO;
use PDOException;

class PDOManager
{
  private PDO $conn;

  public function getConn():PDO{
    return $this->conn;
  }

  public function __construct($conn = null)
  {
    if ($conn === null) {
      // Tạo kết nối nếu không được cung cấp
      try {
        // $servername = "172.17.0.1";
        $servername = "127.0.0.1";
        $username = "root";
        $password = "";
        $this->conn = new PDO("mysql:host=$servername;port=3306;dbname=project_management", $username, $password);
        // set the PDO error mode to exception
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
    } else {
      // Sử dụng kết nối được cung cấp
      $this->conn = $conn;
    }
  }
}
