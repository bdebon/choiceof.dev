<?php

declare(strict_types=1);

namespace App\Module\Choice\Fixture;

use App\Module\Application\DataFixture\AbstractBaseFixture;
use App\Module\Choice\Choice;
use App\Module\Choice\Question;
use App\Module\Choice\Vote;
use App\Module\Media\MediaObject;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\KernelInterface;

final class ChoiceFixture extends AbstractBaseFixture
{

    public function __construct(private readonly KernelInterface $appKernel)
    {

    }

    public function load(ObjectManager $manager): void
    {
        $faker = self::getFaker();

        for ($i = 0; $i < 10; ++$i) {
            $question = new Question();
            $question->setContent($faker->text() . ' ?');

            $choices = $this->getChoice()->toArray();
            array_walk($choices, static fn(Choice $choice) => $question->addChoice($choice));

            $manager->persist(
                $question
            );
        }

        $manager->flush();
    }

    /**
     * @return ArrayCollection<Vote>
     */
    public function getVotes(): ArrayCollection
    {
        $votes = new ArrayCollection();

        for ($i = 0; $i < rand(5, 15); ++$i) {
            $vote = new Vote();
            $votes->add($vote);
        }

        return $votes;
    }

    /**
     * @return ArrayCollection<Choice>
     */
    public function getChoice(): ArrayCollection
    {
        $faker = self::getFaker();
        $choices = new ArrayCollection();

        for ($i = 0; $i < 2; ++$i) {
            $choice = new Choice();
            $choices->add($choice);
            $choice->setContent($faker->text(30));
            $votes = $this->getVotes()->toArray();
            $mediaObject = new MediaObject();
            $mediaObject->filePath = sprintf('fixtures/images/%s.jpg', random_int(1, 8));
            $choice->image = $mediaObject;

            array_walk($votes, static fn(Vote $vote) => $choice->addVote($vote));
        }

        return $choices;
    }
}
