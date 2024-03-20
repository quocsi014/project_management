<?php

namespace Entity;

use DateTime;
use JsonSerializable;

class Task implements JsonSerializable
{
  private ?string $taskID;
  private ?string $name;
  private ?String $description;
  private ?string $projectID;
  private ?string $assignedUserID;
  private ?string $boardID;
  private ?DateTime $createdAt;
  public function __construct(
    ?string $taskID = null,
    ?string $name = null,
    ?string $description = null,
    ?string $projectID = null,
    ?string $assignedUserID = null,
    ?string $boardID = null,
    ?DateTime $createdAt = null
  ) {
    $this->taskID = $taskID;
    $this->name = $name;
    $this->description = $description;
    $this->projectID = $projectID;
    $this->assignedUserID = $assignedUserID;
    $this->boardID = $boardID;
    $this->createdAt = $createdAt;
  }

  // Getters
  public function getTaskID(): ?string
  {
    return $this->taskID;
  }

  public function getName(): ?string
  {
    return $this->name;
  }
  public function getDescription(): ?string
  {
    return $this->description;
  }

  public function getProjectID(): ?string
  {
    return $this->projectID;
  }

  public function getAssignedUserID(): ?string
  {
    return $this->assignedUserID;
  }

  public function getBoardID(): ?string
  {
    return $this->boardID;
  }

  public function getCreatedAt(): ?DateTime
  {
    return $this->createdAt;
  }

  // Setters
  public function setTaskID(?string $taskID): void
  {
    $this->taskID = $taskID;
  }

  public function setName(?string $name): void
  {
    $this->name = $name;
  }

  public function setDescription(?string $description): void
  {
    $this->description = $description;
  }

  public function setProjectID(?string $projectID): void
  {
    $this->projectID = $projectID;
  }

  public function setAssignedUserID(?string $assignedUserID): void
  {
    $this->assignedUserID = $assignedUserID;
  }

  public function setBoardID(?string $boardID): void
  {
    $this->boardID = $boardID;
  }

  public function setCreatedAt(?DateTime $createdAt): void
  {
    $this->createdAt = $createdAt;
  }

  // JsonSerializable implementation
  public function jsonSerialize()
  {
    return array(
      'taskID' => $this->taskID,
      'name' => $this->name,
      'projectID' => $this->projectID,
      'assigned_user_id' => $this->assignedUserID,
      'boardID' => $this->boardID,
      'createdAt' => $this->createdAt
    );
  }
}
