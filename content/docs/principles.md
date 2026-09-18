# Principles

## Coding

1. Small, contained modules
2. Import rather than rewrite. Don't reinvent the wheel
3. Duplication is far better than the wrong abstraction
4. Tests, and TDD when patching a bug

## Work method

1. Iterative
2. Pragmatic
   > I find it essential to adjust my approach to the situation I'm in. If budget or time is tight, I will think "disposable MVP" rather than TDD. A prototype requires a different mindset from payment-handling core business logic.
3. Early feedback
4. I like to be involved in feature specification
   > I find it easier to achieve 80/20-based victories when I'm involved in creating the roadmap

## Ideas

1. The concept of cognitive load, and respect for cognitive capacity
   > Many smaller PRs, plus the concept of iteration and early feedback
2. Code is first and foremost written to be read, and only occasionally executed
3. I will choose the right tools for the job based on all the information available to me and my experience
   > What's the budget, schedule and scope of the project? Are there tools that, with some effort, will help us do what we want to achieve without us having to re-invent them?

## PR workflow

1. A feature specification is finalized, e.g. in the form of a Trello card
2. I move the Trello card to "DOING" and start working on the task
3. When I have finished the feature, I submit a Pull Request
4. Reviewers review the code changes and test the functionality added/modified by the PR
5. Reviewers request changes, if defects in the added/modified code are found
6. I address all comments in the submitted PR, if any, then re-request reviews
7. Repeat steps 4-6 until the PR is in a state which satisfies reviewers, at which point the PR is approved
8. The PR is merged
9. If there are remaining unsolved aspects of the relevant Trello card, continue working on the card, or grab a new card
