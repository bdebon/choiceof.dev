<?php

namespace App\Tests\Module\Choice;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class GetQuestionTest extends ApiTestCase
{
    public function testAddVote(): void
    {
        $client = self::createClient();

        // retrieve a token
        $response = $client->request('GET', '/api/questions/1', [
            'headers' => ['Content-Type' => 'application/ld+json'],
            'json' => [
                'choice' => '/api/choices/1',
            ],
        ]);

        $this->assertResponseIsSuccessful();
    }
}
