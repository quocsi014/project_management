<?php
namespace Storage;
use Storage\IWorkspaceStorage;
use Storage\PDOManager;
use Entity\Workspace;
use Exception;
use PDOException;

class WorkspaceStorage implements IWorkspaceStorage{
  private PDOManager $db;

  public function __construct(PDOManager $db){
    $this->db = $db;
  }

  public function insertWorkspace(Workspace $workspace):void{
    try{
      $query = "insert into workspaces values(?, ?)";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$workspace->getId(), $workspace->getName()]);

    }catch(Exception $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function updateWorkspace(Workspace $workspace):void{

  }
  public function deleteWorkspace(String $id):void{

  }
  public function getWorkspacesOfUser(String $user_id):array{
    try{
      $query = "select * from workspaces join workspace_memberships on user_id = ? and workspaces.workspace_id = workspace_memberships.workspace_id";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$user_id]);

      $workspaces = [];
      $data = $stmt->fetchAll();
      foreach($data as $row){
        $workspace = new Workspace($row['workspace_id'], $row['name'], $row['default_workspaces']);
        $workspaces[] = $workspace;
      }
      return $workspaces;
    }catch(PDOException $e){
      throw new Exception($e->getMessage(), 500);
    }
  }

  public function getDefaultWorkspaceOfUser(String $user_id): Workspace{
    try{
      $query = "select * from workspaces where user_id = ? and default_workspaces = 1";
      $stmt = $this->db->getConn()->prepare($query);
      $stmt->execute([$user_id]);
      $data = $stmt->fetch();
      return new Workspace($data['workspace_id'], $data['name']);
    }catch(Exception $e){
      throw new Exception($e->getMessage(), 500);
    }
  }
}