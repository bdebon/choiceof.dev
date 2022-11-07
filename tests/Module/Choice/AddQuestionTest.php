<?php

namespace App\Tests\Module\Choice;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;

class AddQuestionTest extends ApiTestCase
{
    public function testAddVote(): void
    {
        $client = self::createClient();

        $response = $client->request('GET', '/api/questions/1', [
            'headers' => ['Content-Type' => 'application/ld+json'],
            'json' => [
                'choice' => '/api/choices/1',
            ],
        ]);

        $this->assertResponseIsSuccessful();
    }
}
