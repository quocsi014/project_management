<?php

namespace Storage;
use Entity\Attachment;

interface IAttachmentStorage{
    public function InsertAttachment(Attachment $attachment): void;
<<<<<<< HEAD
    public function GetAttachmentATask(String $attachment_id):Attachment;
=======
    public function updateAttachment(String $attachmentId ,String $title): void;
    public function deleteAttachment(String $attachmentId);

>>>>>>> 0d75e7f412b4caefa49e35f2a87cb79d5c90af8d
}