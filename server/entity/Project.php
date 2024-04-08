<?php
namespace Entity;

use JsonSerializable; 
use DateTime;

class Project implements JsonSerializable{
  private ?String $projectID;
  private ?String $name;
  private ?String $description;
  private ?String $ownerID;
  private ?DateTime $createAt;
  private ?int $color; 

  public function __construct($projectID = null, $name = null, $description = null, $ownerID = null, $createAt = null, $color = null){
    $this->projectID = $projectID;
    $this->name = $name;
    $this->description = $description;
    $this->ownerID = $ownerID;
    $this->createAt = $createAt;
    $this->color = $color;
  }


  public function jsonSerialize(): mixed
  {
    return array(
      'project_id' => $this->projectID,
      'name' => $this->name,
      'description' => $this->description,
      'create_at' => $this->createAt,
      'color' => $this->color
    );
  }

  // Getter and setter for projectID
  public function getProjectID(): ?String {
    return $this->projectID;
  }

  public function setProjectID(?String $projectID): void {
    $this->projectID = $projectID;
  }

  // Getter and setter for name
  public function getName(): ?String {
    return $this->name;
  }

  public function setName(?String $name): void {
    $this->name = $name;
  }

  // Getter and setter for description
  public function getDescription(): ?String {
    return $this->description;
  }

  public function setDescription(?String $description): void {
    $this->description = $description;
  }

  // Getter and setter for ownerID
  public function getOwnerID(): ?String {
    return $this->ownerID;
  }

  public function setOwnerID(?String $ownerID): void {
    $this->ownerID = $ownerID;
  }

  // Getter and setter for createAt
  public function getCreateAt(): ?DateTime {
    return $this->createAt;
  }

  public function setCreateAt(?DateTime $createAt): void {
    $this->createAt = $createAt;
  }

  // Getter and setter for color
  public function getColor(): ?int {
    return $this->color;
  }

  public function setColor(?int $color): void {
    $this->color = $color;
  }
}
