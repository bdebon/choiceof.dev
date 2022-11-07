<?php

namespace App\Tests\Module\Choice;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use App\Module\Choice\Vote;

class AddVoteTest extends ApiTestCase
{
    public function testAddVote(): void
    {
        $client = self::createClient();

        // retrieve a token
        $client->request('POST', '/api/votes', [
            'headers' => ['Content-Type' => 'application/ld+json'],
            'json' => [
                'choice' => '/api/choices/1',
            ],
        ]);

        $this->assertResponseIsSuccessful();
    }
}
