<?php
namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
require_once __DIR__ . '/vendor/autoload.php';


use Storage\{
    BoardStorage,
    PDOManager as PDOManager,
  ProjectStorage,
  MailSenderStorage
};

use Service\{
    BoardService,
    ProjectService,
  MailSenderService
};

use Controller\{
    BoardController,
    ProjectController,
  MailSenderController
};


$app = AppFactory::create();

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

$app->post("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->CreateProject($req, $res);
});

$app->get("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->getAllProject($req, $res);
});

$app->get("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($projectController) {
  return $boardController->GetBoads($req, $res);
});


$app->put("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->updateProject($req, $res);
});

$app->post("/v1/send_mail", function (Request $req, Response $res) use ($mailController) {
  return $mailController->sendOTP($req, $res);
});

$app->run();
