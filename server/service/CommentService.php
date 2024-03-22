<?php
namespace Service;

use Storage\CommentStorage;
use Entity\Comment;
use Exception;
use Storage\ICommentStorage;

class CommentService{
  private ICommentStorage $commentStore;

  public function __construct(ICommentStorage $commentStore){
    $this->commentStore = $commentStore;
  }

  public function updateComment(Comment $comment){
    $this->commentStore->updateComment($comment);
  }
}
?>