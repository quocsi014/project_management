<?php
  use Psr\Http\Message\ResponseInterface as Response;
  use Psr\Http\Message\ServerRequestInterface as Request;
  use Slim\Factory\AppFactory;
  require_once __DIR__ . '/vendor/autoload.php';

  require_once "./storage/PDOManager.php";
  require_once "./storage/ProjectStorage.php";
  require_once "./service/ProjectService.php";
  require_once "./controller/ProjectController.php";
echo "hiih";
  $app = AppFactory::create();

  $db = new PDOManager(null);
  $projectStore = new ProjectStorage($db);
  $projectService = new ProjectService($projectStore);
  $projectController = new ProjectController($projectService);

  $app->post("/v1/projects", function(Request $req, Response $res) use ($projectController){
  return $projectController->CreateProject($req, $res);
  });

  $app->get("/v1/projects", function(Request $req, Response $res) use ($projectController){
  return $projectController->getAllProject($req, $res);
  });
  $app->run();
?>
$app->get("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($projectController){
  return $projectController->GetBoads($req, $res);
});

$app->run();
