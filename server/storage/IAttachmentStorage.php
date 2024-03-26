<?php

namespace Storage;
use Entity\Attachment;

interface IAttachmentStorage{
    public function InsertAttachment(Attachment $attachment): void;
    public function GetAttachmentATask(String $attachment_id):Attachment;
}