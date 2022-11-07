<?php

namespace App\Module\Choice;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Gedmo\Mapping\Annotation\Slug;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource(operations: [
    new Get(
        normalizationContext: ['groups' => 'read:question']
    ),
    new Post(
        denormalizationContext: ['groups' => 'create:question']
    ),
    new GetCollection(
        normalizationContext: ['groups' => 'read:question'],
    ),
    new Delete(
        security: "is_granted('ROLE_ADMIN')"
    ),
    new Patch(
        security: "is_granted('ROLE_ADMIN')"
    )
])]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'slug' => 'exact'])]
class Question
{
    public const VALIDATED_STATE = 'validated';
    public const UN_VALIDATED_STATE = 'un_validated';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read:question'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['read:question', 'create:question'])]
    private ?string $content = null;

    #[ORM\OneToMany(mappedBy: 'question', targetEntity: Choice::class, cascade: ["all"], orphanRemoval: true)]
    #[Groups(['read:question', 'create:question'])]
    private Collection $choices;

    #[ORM\Column(length: 255)]
    #[Groups(['read:question'])]
    private string $state = self::UN_VALIDATED_STATE;

    #[Groups(['read:question'])]
    private ?int $totalVote = null;

    #[ORM\Column(length: 128, unique: true)]
    #[Slug(fields: ['content'])]
    #[Groups(['read:question'])]
    private string $slug;

    public function __construct()
    {
        $this->choices = new ArrayCollection();
    }

    public function validate(): void {
        $this->state = self::VALIDATED_STATE;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    /**
     * @return Collection<int, Choice>
     */
    public function getChoices(): Collection
    {
        return $this->choices;
    }

    public function addChoice(Choice $choice): self
    {
        if (!$this->choices->contains($choice)) {
            $this->choices->add($choice);
            $choice->setQuestion($this);
        }

        return $this;
    }

    public function removeChoice(Choice $choice): self
    {
        if ($this->choices->removeElement($choice)) {
            // set the owning side to null (unless already changed)
            if ($choice->getChoices() === $this) {
                $choice->setChoices(null);
            }
        }

        return $this;
    }


    public function getState(): string
    {
        return $this->state;
    }


    public function setState(string $state): void
    {
        $this->state = $state;
    }

    public function setChoices(Collection $choices): void
    {
        $this->choices = $choices;
    }

    public function countVote(): void
    {
        $total = 0;
        foreach ($this->getChoices() as $choice) {
            $total += $choice->getTotalVote();
        }

        $this->setTotalVote($total);
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

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): void
    {
        $this->slug = $slug;
    }
}
