<?php

use FastRoute\DataGenerator;

require_once "./storage/IProjectStorage.php";
require_once "./entity/Board.php";

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

  public function updateAProject(Project $project){

  }

  public function deleteAProject(String $project){

  }

  public function getAProject(String $projectID):Project{
    return new Project();
  }
  
  public function getAllProject(): array
  {
    return [];
  }

  public function getAllProject(int $limit, int $offset){
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
  
  public function getBoardsOfProject(String $projectID): array
  {
    try{
      $query = 'select * from boards where project_id = ?';
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$projectID]);
  
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if(count($result) == 0){
        throw new Exception("Project is not exist", 400);
      }
      $boards = array();
  
      foreach($result as $row){
        $board = new Board($row['board_id'], $row['board_name'], $projectID, $row['previous_board_id']);
        $boards[] = $board;
      }
  
      return $boards;

    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }


}