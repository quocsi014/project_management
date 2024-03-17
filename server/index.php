<?php


namespace App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Google\Client as Google_Client;
use Google\Service\Oauth2 as Google_Service_Oauth2;

use Tuupola\Middleware\CorsMiddleware;
require_once __DIR__ . '/vendor/autoload.php';

use Storage\{
  BoardStorage,
  PDOManager as PDOManager,
  ProjectStorage,
  MailSenderStorage,
  UserStorage,
  TaskStorage
};

use Service\{
  BoardService,
  ProjectService,
  MailSenderService,
  TaskService,
  UserService
};

use Controller\{
  BoardController,
  ProjectController,
  MailSenderController,
  TaskController,
  UserController
};

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


$app->add(new CorsMiddleware([
  "origin" => ["*"],
  "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
  "headers.allow" => ["Authorization", "Content-Type", "X-Requested-With"],
  "headers.expose" => [],
  "credentials" => true,
  "cache" => 0,
]));

$app->post("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->CreateProject($req, $res);
});

$app->get("/v1/projects", function (Request $req, Response $res) use ($projectController) {
  return $projectController->getAllProject($req, $res);
  });
  $app->get("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController){
    return $projectController->getAProject($req, $res);
  });

$app->get("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($boardController) {
  return $boardController->GetBoads($req, $res);
});


$app->put("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->updateProject($req, $res);
});

$app->post("/v1/send_mail/otp", function (Request $req, Response $res) use ($mailController) {
  return $mailController->sendOTP($req, $res);
});
$app->delete("/v1/projects/{project_id}", function (Request $req, Response $res) use ($projectController) {
  return $projectController->deleteProject($req, $res);
});

$app->delete("/v1/projects/{project_id}/boards/{board_id}", function (Request $req, Response $res) use ($boardController){
  return $boardController->deleteBoard($req, $res);
});
$app->post("/v1/projects/{project_id}/boards", function (Request $req, Response $res) use ($boardController){
  return $boardController->addBoards($req, $res);
});

$app->put("/v1/projects/{project_id}/boards/{board_id}", function (Request $req, Response $res) use ($boardController){
  return $boardController->changeWorkflow($req, $res);
});


$app->get('/login/google', function (Request $request, Response $response, array $args) {
  // Thiết lập thông tin ứng dụng Google OAuth
  $client = new Google_Client();
  $client->setClientId('507687248206-h1lufgl7cirssocn1pr8rpb73hq4qajm.apps.googleusercontent.com');
  $client->setClientSecret('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');
  $client->setRedirectUri('http://localhost:8080/login/google/callback'); // Thay PORT bằng cổng mà ứng dụng của bạn đang chạy
  $client->addScope(Google_Service_Oauth2::USERINFO_EMAIL);
  $client->addScope(Google_Service_Oauth2::USERINFO_PROFILE);

  // Chuyển hướng người dùng đến trang xác thực Google
  $authUrl = $client->createAuthUrl();
  return $response->withHeader('Location', $authUrl)->withStatus(302);
});

$app->get('/login/google/callback', function (Request $request, Response $response, array $args) {
  // Xác thực callback từ Google
  $client = new Google_Client();
  $client->setClientId('YOUR_CLIENT_ID'); // Thay YOUR_CLIENT_ID bằng Client ID của ứng dụng Google OAuth của bạn
  $client->setClientSecret('YOUR_CLIENT_SECRET'); // Thay YOUR_CLIENT_SECRET bằng Client Secret của ứng dụng Google OAuth của bạn
  $client->setRedirectUri('http://localhost:8080/google/callback'); // Thay PORT bằng cổng mà ứng dụng của bạn đang chạy

  $queryParams = $request->getQueryParams();
  $code = $queryParams['code'] ?? null;

  if ($code) {
      $client->authenticate($code);
      $access_token = $client->getAccessToken();

      // Sử dụng token để lấy thông tin người dùng từ Google API
      $oauth2 = new Google_Service_Oauth2($client);
      $userInfo = $oauth2->userinfo->get();

      // Xử lý thông tin người dùng ở đây, ví dụ: đăng nhập hoặc đăng ký người dùng
      // Ví dụ: In ra thông tin người dùng
      echo 'User ID: ' . $userInfo->getId() . '<br>';
      echo 'Email: ' . $userInfo->getEmail() . '<br>';
      echo 'First Name: ' . $userInfo->getGivenName() . '<br>';
      echo 'Last Name: ' . $userInfo->getFamilyName() . '<br>';
      echo 'Avatar URL: ' . $userInfo->getPicture() . '<br>';

      // Sau khi xử lý thông tin người dùng, bạn có thể chuyển hướng người dùng đến trang profile hoặc trang chính của ứng dụng
      return $response->withHeader('Location', '/profile')->withStatus(302); // Chuyển hướng người dùng sau khi đăng nhập thành công
  } else {
      // Xử lý khi không có mã truy cập được trả về từ Google
      return $response->withHeader('Location', '/login')->withStatus(302);
  }
});


$app->run();
