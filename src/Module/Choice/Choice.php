<?php

namespace App\Module\Choice;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Module\Media\MediaObject;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ChoiceRepository::class)]
#[ApiResource(operations: [])]
class Choice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:question'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:question', 'create:question'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'choices')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Question $question = null;

    #[ORM\OneToMany(mappedBy: 'choice', targetEntity: Vote::class, cascade: ["all"], orphanRemoval: true)]
    private Collection $votes;

    #[Groups(['read:question'])]
    private ?int $totalVote = null;

    #[ORM\ManyToOne(targetEntity: MediaObject::class, cascade: ["persist"])]
    #[ORM\JoinColumn(nullable: true)]
    #[ApiProperty(types: ['https://schema.org/image'])]
    #[Groups(['read:question', 'create:question'])]
    public ?MediaObject $image = null;

    public function __construct()
    {
        $this->votes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?Question
    {
        return $this->question;
    }

    public function setQuestion(?Question $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getVotes(): Collection
    {
        return $this->votes;
    }

    public function setVotes(Collection $votes): void
    {
        $this->votes = $votes;
    }

    public function addVote(Vote $vote): self
    {
        if (!$this->votes->contains($vote)) {
            $this->votes->add($vote);
            $vote->setChoice($this);
        }

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): void
    {
        $this->content = $content;
    }

    public function countVote(): void
    {
        $this->setTotalVote($this->getVotes()->count());
    }

    public function getTotalVote(): ?int
    {
        if (null === $this->totalVote) {
            $this->countVote();
        }

        return $this->totalVote;
    }


    public function setTotalVote(int $totalVote): void
    {
        $this->totalVote = $totalVote;
    }
}
