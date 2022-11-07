<?php

declare(strict_types=1);

namespace App\Module\Application\DataFixture;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Faker\Factory;
use Faker\Generator;

abstract class AbstractBaseFixture extends Fixture
{
    protected static function getFaker(): Generator
    {
        return Factory::create();
    }
}
