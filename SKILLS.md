# Project Skills and Working Rules

This file records the working rules, project conventions, commands, and DevOps lessons for Pascal Mbagwu's DevOps practical challenge project.

## Collaboration Rules

- Always refer to the user as Pascal.
- Explain each task clearly at a beginner-friendly DevOps level.
- Before making changes, explain:
  - What was found.
  - What will change.
  - Why the change is needed.
  - What files will be affected.
- After making changes, explain:
  - What changed.
  - Why it changed.
  - How Pascal can test it.
  - The DevOps lesson to learn from it.
- If something is unclear, ask before changing it.

## Git Rules

- Always check the current branch before making changes:

```bash
git status --short --branch
```

- Never work directly on default branches such as `main`, `master`, `develop`, or `trunk`.
- If currently on a default branch, create a working branch first.
- Feature branches must start with one of these prefixes:
  - `feature/`
  - `fix/`
  - `chore/`
- Use clear commit messages, for example:

```bash
feat:(ecs) - add fargate deployment infrastructure
fix:(docker) - correct container health check
chore:(docs) - add project memory files
```

- When Pascal says `push`, `commit and push`, or `push commit and push`, stage relevant changes, commit, and push without asking for confirmation.

## Safety Rules

- Do not delete existing files or directories unless Pascal explicitly approves.
- Do not make unrelated changes.
- Do not modify secrets, credentials, keys, or environment files unless Pascal explicitly asks.
- Work only inside the provided workspace.

## Project Commands

Run application tests:

```bash
npm test
```

Build the Docker image:

```bash
docker build -t devops-practical-challenge:local .
```

Check Terraform formatting:

```bash
terraform -chdir=terraform/envs/prod fmt -check -recursive
```

Create the one-time AWS bootstrap resources:

```bash
cp terraform/bootstrap/terraform.tfvars.example terraform/bootstrap/terraform.tfvars
terraform -chdir=terraform/bootstrap init
terraform -chdir=terraform/bootstrap plan
terraform -chdir=terraform/bootstrap apply
terraform -chdir=terraform/bootstrap output
```

Initialize Terraform with remote backend configuration:

```bash
terraform -chdir=terraform/envs/prod init \
  -backend-config="bucket=<state-bucket>" \
  -backend-config="key=devops-practical-challenge/prod.tfstate" \
  -backend-config="region=<aws-region>" \
  -backend-config="dynamodb_table=<lock-table>" \
  -backend-config="encrypt=true"
```

## DevOps Lessons

- Always verify the active Git branch before editing or committing.
- Keep application, infrastructure, CI/CD, and documentation together so reviewers can understand the complete delivery path.
- Use remote Terraform state for team workflows so infrastructure changes are tracked and locked safely.
- Bootstrap shared Terraform backend resources before running application infrastructure.
- Prefer custom IAM policies over `AdministratorAccess`; use the smallest practical permission set and document any wildcard permissions.
- Use Terraform variable validation only for the variable being validated; use resource preconditions when comparing multiple variables.
- Run services in private subnets and expose them through a load balancer.
- Use commit SHA image tags for repeatable deployments.
- Store application logs in CloudWatch so containers can be replaced without losing logs.
