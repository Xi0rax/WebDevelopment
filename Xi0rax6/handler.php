<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $correct='';
    $validation=true;
    if (!preg_match("/^[A-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['first_name'])) {
            $correct.='1';
            $validation=false;
        }
        if (!preg_match("/^[A-ЯЁ][а-яё]+(-[а-яё]+)*$/u", $data['last_name'])){
            $correct.='2';
            $validation=false;
        }
      if (!preg_match("/^[0-9]+/u",$data['age']))
        {
            $correct.='3';
            $validation=false;
        }
        if (!preg_match("/[a-z]+[@][a-z]+\\.[a-z]{2,3}/u",$data['email']))
        {
            $correct.='4';
            $validation=false;
        }

        if($validation)
        {
            $file=fopen("posts.txt",'a');
            fwrite($file,'[POST]'."\n");
            foreach($data as $key=>$value)
            {
                $record=$key.": ".$value."\n";
                fwrite($file,$record);
                fwrite($file,"\n");
            }
            fclose($file);
            echo json_encode(['result' => 'affirmative', 'valid' => $validation]);
        }
        else
        echo json_encode(['result' => $correct, 'valid' => $validation]);
} else
    echo "<body style='background:cyan;'><h1 style='text-align:center;font-family: \"Monotype Corsiva\", sans-serif;'>Oops! It seems, that something goes wrong</h1></body>";