<?php

class Project implements JsonSerializable{
  private ?String $projectID;
  private ?String $name;
  private ?String $description;
  private ?String $ownerID;
  private ?DateTime $createAt;

  public function __construct($projectID = null, $name = null, $description = null, $ownerID = null, $createAt = null){
    $this->projectID = $projectID;
    $this->name = $name;
    $this->description = $description;
    $this->ownerID = $ownerID;
    $this->createAt = $createAt;
  }


  public function jsonSerialize(): mixed
  {
    return array(
      'project_id' => $this->projectID,
      'name' => $this->name,
      'description' => $this->description,
      'create_at' => $this->createAt
    );
  }

  public function toArray():array{
    return [$this->projectID, $this->name, $this->description, $this->ownerID, $this->createAt->format('Y-m-d H:i:s')];
  }

  //getter method
  public function getProjectID(): String {
    return $this->projectID;
  }

  public function getName(): String {
    return $this->name;
  }

  public function getDescription(): String {
    return $this->description;
  }

  public function getOwnerID():String{
    return $this->ownerID;
  }

  public function getCreateAt(): DateTime {
    return $this->createAt;
  }

  // Setter methods
  public function setProjectID(String $projectID): void {
    $this->projectID = $projectID;
  }

  public function setName(String $name): void {
    $this->name = $name;
  }

  public function setDescription(String $description): void {
    $this->description = $description;
  }

  public function setOwnerID(String $ownerID): void{
    $this->ownerID = $ownerID;
  }

  public function setCreateAt(DateTime $createAt): void {
    $this->createAt = $createAt;
  }

}