<?php

namespace App\Module\Choice;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: VoteRepository::class)]
#[ApiResource(operations: [
    new Post(
        description: "Add VoteClient",
        denormalizationContext: ['groups' => 'vote:create']
    ),
])]
class Vote
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private DateTimeImmutable $createAt;

    #[ORM\ManyToOne(inversedBy: 'votes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('vote:create')]
    private ?Choice $choice = null;

    public function __construct()
    {
        $this->createAt = new DateTimeImmutable();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreateAt(): ?DateTimeImmutable
    {
        return $this->createAt;
    }

    public function setCreateAt(DateTimeImmutable $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getChoice(): ?Choice
    {
        return $this->choice;
    }

    public function setChoice(?Choice $choice): void
    {
        $this->choice = $choice;
    }
}
