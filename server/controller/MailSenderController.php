<?php
namespace Controller; 

use Slim\Psr7\Request as Request;
use Slim\Psr7\Response as Respone;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

use Service\MailSenderService;

class MailSenderController
{
    private MailSenderService $service;

    public function __construct(MailSenderService $service)
    {
        $this->service = $service;
    }

    public function sendOTP(Request $req, Respone $res)
    {
        $body = $req->getBody()->getContents();
        $data = json_decode($body);
        $mail = new PHPMailer(true);
        $otp = rand(1000, 9999);
        try {
            $mail->isSMTP();
            // Cấu hình SMTP server
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'proma.verify@gmail.com';
            $mail->Password   = 'dzvi xxre mbnf jaaq';
            $mail->SMTPSecure = 'ssl';
            $mail->Port       = 465;

            $mail->setFrom('proma.verify@gmail.com', 'Proma');
            $mail->addAddress($data->email);

            $mail->isHTML(true);
            $mail->Subject = 'Sign up proma';
            $mail->Body    = 'Your OTP is: ' . $otp;

            $mail->send();

            $this->service->CreateOTP($otp, $data->email);

            $res = $res->withStatus(200);
            $res->getBody()->write("Sent successfully");
            return $res;
        } catch (Exception $e) {
            if ($e->getCode() == 400) {
                $res = $res->withStatus(400);
                $res->getBody()->write("Send fail");
            }else{
                $res = $res->withStatus(500);
                $res->getBody()->write("Send fail");
            }
            return $res;
        }
    }
}
