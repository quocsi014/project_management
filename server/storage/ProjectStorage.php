<?php
namespace Storage;

use FastRoute\DataGenerator;
use Psr\Http\Message\ServerRequestInterface as Request;

use PDO;
use PDOException;
use Exception;
use DateTime;
use Entity\Project;
use Entity\Board;


class ProjectStorage implements IProjectStorage{
  
  private PDOManager $db;

  public function __construct(PDOManager $db = null){

    if(isset($db)){
      $this->db = $db;
    }else{
      $this->db = new PDOManager(null);
    }

  }

  public function insertAProject(Project $project){

    try{
      $this->db->getConn()->beginTransaction();

      //Tạo một dự án;
      $query1 = "insert into projects (project_id, project_name, description, owner_id, create_at) values (?, ?, ?, ?, ?)";
      $stmt1 = $this->db->getConn()->prepare($query1);
      $stmt1->execute($project->toArray());

      //tạo membership của owner và project
      $query2 = "insert into memberships values (?, ?, ?)";
      $stmt2 = $this->db->getConn()->prepare($query2);
      $stmt2->execute([$project->getOwnerID(), $project->getProjectID(), 'LEADER']);

      $this->db->getConn()->commit();
    }catch (PDOException $e){
      $this->db->getConn()->rollBack();
      
      if($e->errorInfo[1] == 1062){
        throw new Exception($e->getMessage(), 409);
      }else{
        throw new Exception($e->getMessage(), 500);
      }
    }
    


  }

  public function updateAProject(Project $project) {
    try{
      $query = 'UPDATE projects SET project_name = ?, description = ? WHERE project_id = ?;';

      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindValue(1, $project->getName(), PDO::PARAM_STR);
      $stmt->bindValue(2, $project->getDescription(), PDO::PARAM_STR);
      $stmt->bindValue(3, $project->getProjectID(), PDO::PARAM_INT);
      $stmt->execute();
    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function deleteAProject(String $project){

  }

  public function getAProject(String $projectID):Project{
    return new Project();
  }
  

  public function getAllProject(int $limit, int $offset):array{
    try{
      
      $this->db->getConn()->beginTransaction();

      $query = "select* from projects LIMIT :limit OFFSET :offset";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
      $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
      $stmt->execute();

      $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $result = [];
      foreach($projects as $projectData){
        $project = new Project( $projectData['project_id'],
        $projectData['project_name'],
        $projectData['description'],
        "",
        new DateTime($projectData['create_at']));
        $result[] = $project; // thêm project vào mảng   
      };
      $this->db->getConn()->commit();
    }catch (PDOException $e){
      $this->db->getConn()->rollBack();
      throw new Exception($e->getMessage(), 500);
    }
    return $result;
  }
  


}