protected function curl($text){
        $post = [
            'auth_mail' => 'my.name.barrie.nelson@gmail.com',
            'auth_key' => '5687496ED2336E32EEA2D8EB5AC1EADC',
            'text'   => $text,
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http://seo-builder.ru/api/synonym/');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));

        $output = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($output);

        return $result;

    }
