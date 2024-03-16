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
        //  $servername = "172.17.0.1";
        $servername = "localhost";
        $username = "root"; // Replace with your actual username
        $password = ""; // Replace with your actual password
        $this->conn = new PDO("mysql:host=$servername;port=33066;dbname=project_management", $username, $password);
        
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
