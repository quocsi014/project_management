<?php

namespace App;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\CorsMiddleware;

require_once __DIR__ . '/vendor/autoload.php';



use Storage\{
  AccountStorage,
  BoardStorage,
  PDOManager as PDOManager,
  ProjectStorage,
  MailSenderStorage,
  UserStorage,
  TaskStorage,
  AttachmentStorage,
  CommentStorage
};

use Service\{
  AccountService,
  BoardService,
  ProjectService,
  MailSenderService,
  TaskService,
  UserService,
  AttachmentService,
  CommentService
};

use Controller\{
  AccountController,
  BoardController,
  ProjectController,
  MailSenderController,
  TaskController,
  UserController,
  AttachmentController,
  CommentController
};
use Middleware\EmailVerify;
use Middleware\TokenVerify;


$app = AppFactory::create();

//setup dependencies
$db = new PDOManager(null);
$projectStore = new ProjectStorage($db);
$projectService = new ProjectService($projectStore);
$projectController = new ProjectController($projectService);

$mailStore = new MailSenderStorage($db);
$mailService = new MailSenderService($mailStore);
$mailController = new MailSenderController($mailService);

$boardStore = new BoardStorage($db);
$boardService = new BoardService($boardStore);
$boardController = new BoardController($boardService);

$taskStore = new TaskStorage($db);
$taskService = new TaskService($taskStore);
$taskController = new TaskController($taskService);

$userStore = new UserStorage($db);
$userService = new UserService($userStore);
$userController = new UserController($userService);

$attachmentStore = new AttachmentStorage($db);
$attachmentService = new AttachmentService($attachmentStore);
$attachmentController = new AttachmentController($attachmentService);


$accountStore = new AccountStorage($db);
$accountService = new AccountService($accountStore);
$accountController = new AccountController($accountService);


//middleware

$emailVerify = new EmailVerify();


$app->add(new CorsMiddleware([
  "origin" => ["*"], // cho phép truy cập từ tất cả các trang
  "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"], // các phương thức HTTP được cho phép
  "headers.allow" => ["Authorization", "Content-Type", "X-Requested-With"],
  "headers.expose" => [],
  "credentials" => false,
  "cache" => 0,
]));

/*
 * *Project
 */

$app->post("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->CreateProject($req, $res);
});

$app->get("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->getAllProject($req, $res);
});
$app->get("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->getAProject($req, $res);
});

$app->put("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->updateProject($req, $res);
});

$app->delete("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->deleteProject($req, $res);
});

/*
* * Board
*/

$app->get("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($boardController) {
  return $boardController->GetBoads($req, $res);
});

$app->delete("/v1/projects/{project_id}/boards/{board_id}", function (Request $req, Response $res) use ($boardController) {
  return $boardController->deleteBoard($req, $res);
});
$app->post("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($boardController) {
  return $boardController->addBoards($req, $res);
});

$app->put("/v1/projects/{project_id}/boards/{board_id}", function (Request $req, Response $res) use ($boardController) {
  return $boardController->changeWorkflow($req, $res);
});

/*
* * Task
*/
$app->post("/v1/projects/{project_id}/tasks", function (Request $req, Response $res) use ($taskController){
  return $taskController->AddATask($req, $res);
});


$app->put("/v1/projects/{project_id}/tasks/{task_id}/status", function (Request $req, Response $res) use ($taskController) {
  return $taskController->updateStatus($req, $res);
});

$app->put("/v1/projects/{project_id}/tasks/{task_id}/assignments", function (Request $req, Response $res) use ($taskController){
  return $taskController->updateAssignedUSer($req, $res);
});

$app->put("/v1/projects/{project_id}/tasks/{task_id}", function (Request $req, Response $res) use ($taskController){
  return $taskController->updateTask($req, $res);
});


/*
* * attachments
*/
$app->post("/v1/projects/{project_id}/tasks/{task_id}/attachments", function (Request $req, Response $res) use ($attachmentController){
  return $attachmentController->InsertAttachment($req, $res);
});

$app->put("/v1/projects/{project_id}/tasks/{task_id}/attachments/{attchment_id}", function (Request $req, Response $res) use ($attachmentController){
  return $attachmentController->updateAttachment($req, $res);
});
$app->delete("/v1/projects/{project_id}/tasks/{task_id}/attachments/{attchment_id}", function (Request $req, Response $res) use ($attachmentController){
  return $attachmentController->deleteAttachment($req, $res);
});
/*
* *comment
*/
$app->put("/v1/projects/{project_id}/tasks/{task_id}/comments/{comment_id}", function (Request $req, Response $res) use ($commentController){
  return $commentController->updateComment($req, $res);
});

$app->delete("/v1/projects/{project_id}/tasks/{task_id}/comments/{comment_id}", function (Request $req, Response $res) use ($commentController){
  return $commentController->deleteComment($req, $res);
});

$app->get("/v1/projects/{project_id}/tasks/{task_id}/comments", function (Request $req, Response $res) use ($commentController){
  return $commentController->getCommentOfComment($req, $res);
});

/* 
* * OTP
*/

$app->post("/v1/send_mail/otp", function (Request $req, Response $res) use ($mailController) {
  return $mailController->sendOTP($req, $res);
});

$app->post("/v1/verify/otp", function (Request $req, Response $res) use ($mailController) {
  return $mailController->verifyOtp($req, $res);
});

/*
* * Auth
*/

$app->post(
  "/v1/login",
  function (Request $req, Response $res) use ($accountController) {
    return $accountController->Login($req, $res);
  }
);

$app->post("/v1/register", function(Request $req, Response $res) use($accountController){
  return $accountController->Register($req, $res);
})->add(new EmailVerify())->add(new TokenVerify());
$app->run();
