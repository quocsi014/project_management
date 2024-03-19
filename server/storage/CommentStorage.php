<?php
namespace Storage;

use FastRoute\DataGenerator;
use Prs\Http\ServerRequestInterface as Request;

use PDO;
use PDOException;
use Exception;
use DateTime;
use Entity\Comment;

class CommentStorage implements ICommentStorage{
  private PDOManager $db;
  public function __construct(PDOManager $db = null)
  {
    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }
  }

  public function updateComment(Comment $comment): void
  {
    try{
      $check = $this->checkExist($comment->getCommentID());
      if(!$check){
        throw new Exception("CommentID does not exist", 400);
      }

      $dateTimeObject = ($comment->getCreateAt() !== null) ? $comment->getCreateAt() : null;

      $query = "UPDATE comments SET user_id=?, task_id=?, content=?, create_at=? WHERE comment_id=?";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindValue(1, $comment->getUserID(), PDO::PARAM_STR);
      $stmt->bindValue(2, $comment->getTaskID(), PDO::PARAM_STR);
      $stmt->bindValue(3, $comment->getContent(), PDO::PARAM_STR);
      $stmt->bindValue(4, $dateTimeObject , PDO::PARAM_STR);
      $stmt->bindValue(5, $comment->getCommentID(), PDO::PARAM_STR);
      $stmt->execute();
    }catch(Exception $e){
      if ($e->getCode() == 400){
        throw new Exception($e->getMessage(), 400);
      }else{
        throw new Exception($e->getMessage(), 500);
      }
    }
  }

  public function deleteComment(String $id):void{
    try{
      $check = $this->checkExist($id);
      if(!$check){
        throw new Exception("CommentID not found", 404);
      }
  
      $query = "DELETE FROM `comments` WHERE comment_id = ?";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$id]);
    }catch(Exception $e){
      if($e->getCode()==404){
        throw new Exception($e->getMessage(), 404);
      }else
        throw new Exception($e->getMessage(), 404);
    }
  }
  
  //check if commentID exists
  public function checkExist(String $id){
    try{
      $query = "SELECT* FROM `comments` WHERE comment_id = ?";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$id]);

      if($stmt->rowCount()==0) return false; //does not exist
      return true;
    }catch(Exception $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

}
?>