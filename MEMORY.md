# Project Memory

## Project Context

- Owner/learner: Pascal Mbagwu.
- Project directory: `devops-practical-challenge`.
- Goal: Complete a DevOps Engineer practical challenge by delivering a production-shaped AWS deployment with source code, Docker, Terraform, CI/CD, monitoring/logging, and documentation.

## Current Architecture Decision

- Application: small dependency-free Node.js HTTP service.
- Container platform: AWS ECS Fargate.
- Registry: Amazon ECR.
- Networking: VPC with public subnets for the ALB and private subnets for ECS tasks.
- Traffic entry: public Application Load Balancer on HTTP port 80.
- Logs and monitoring: CloudWatch Logs and ECS Container Insights.
- CI/CD: GitHub Actions.
- Infrastructure as Code: Terraform with reusable modules.

## Important Branch Notes

- Do not work directly on `main`, `master`, `develop`, or `trunk`.
- Current working branch for project-rule documentation: `chore/project-rules-docs`.
- Branch prefixes must be `feature/`, `fix/`, or `chore/`.

## Repeated Instructions From Pascal

- Always call the user Pascal.
- Explain tasks before making changes.
- Explain what changed after making changes.
- Keep explanations beginner-friendly and concrete.
- Do not delete files unless Pascal approves.
- Do not modify secrets or credentials unless Pascal explicitly asks.
- When Pascal asks to push or commit and push, do it directly without asking for confirmation, but never from a default branch.

## Deployment Notes

Before the GitHub Actions deployment can work, the AWS account needs:

- S3 bucket for Terraform state.
- DynamoDB table for Terraform state locking.
- GitHub OIDC IAM role.
- GitHub secret `AWS_ROLE_TO_ASSUME`.
- GitHub secret `TF_STATE_BUCKET`.
- GitHub secret `TF_LOCK_TABLE`.
- GitHub repository variable `AWS_REGION`.

## Local Validation Notes

Use these commands from the project directory:

```bash
npm test
docker build -t devops-practical-challenge:local .
terraform -chdir=terraform/envs/prod fmt -check -recursive
```

## Lessons Learned

- Terraform was initially missing from Git Bash because the shell needed to be restarted after `winget install HashiCorp.Terraform`.
- Git branch changes should always be verified with `git status --short --branch`; a command can print a misleading success message if a permission issue occurs.
