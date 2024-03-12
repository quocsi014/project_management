<?php
namespace Entity;

use JsonSerializable; 

class UserInformation implements JsonSerializable
{
  private ?string $userID;
  private ?string $firstName;
  private ?string $lastName;
  private ?string $jobTitle;
  private ?string $avatarURL;

  public function __construct(
    ?string $userID = null,
    ?string $firstName = null,
    ?string $lastName = null,
    ?string $jobTitle = null,
    ?string $avatarURL = null
  ) {
    $this->userID = $userID;
    $this->firstName = $firstName;
    $this->lastName = $lastName;
    $this->jobTitle = $jobTitle;
    $this->avatarURL = $avatarURL;
  }

  // Getters
  public function getUserID(): ?string
  {
    return $this->userID;
  }

  public function getFirstName(): ?string
  {
    return $this->firstName;
  }

  public function getLastName(): ?string
  {
    return $this->lastName;
  }

  public function getJobTitle(): ?string
  {
    return $this->jobTitle;
  }

  public function getAvatarURL(): ?string
  {
    return $this->avatarURL;
  }

  // Setters
  public function setUserID(?string $userID): void
  {
    $this->userID = $userID;
  }

  public function setFirstName(?string $firstName): void
  {
    $this->firstName = $firstName;
  }

  public function setLastName(?string $lastName): void
  {
    $this->lastName = $lastName;
  }

  public function setJobTitle(?string $jobTitle): void
  {
    $this->jobTitle = $jobTitle;
  }

  public function setAvatarURL(?string $avatarURL): void
  {
    $this->avatarURL = $avatarURL;
  }

  // JsonSerializable implementation
  public function jsonSerialize()
  {
    return array(
      'userID' => $this->userID,
      'firstName' => $this->firstName,
      'lastName' => $this->lastName,
      'jobTitle' => $this->jobTitle,
      'avatarURL' => $this->avatarURL
    );
  }
}
