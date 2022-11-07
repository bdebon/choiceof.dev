<?php

namespace App\Tests\Module\User;


use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Module\User\Fixture\UserFixture;

class AuthenticationTest extends ApiTestCase
{
    public function testLogin(): void
    {

        $client = self::createClient();

        // retrieve a token
        $response = $client->request('POST', '/authentication_token', [
            'headers' => ['Content-Type' => 'application/json'],
            'json' => [
                'email' => UserFixture::ADMIN_EMAIL,
                'password' => UserFixture::USER_PASSWORD,
            ],
        ]);

        $json = $response->toArray();
        $this->assertResponseIsSuccessful();
        $this->assertArrayHasKey('token', $json);
    }
}
