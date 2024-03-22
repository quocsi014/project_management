<?php
namespace Storage;

use Entity\Comment;

interface ICommentStorage{
  public function updateComment(Comment $comment):void;
}
?>