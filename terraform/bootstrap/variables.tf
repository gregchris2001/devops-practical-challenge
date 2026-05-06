variable "aws_region" {
  description = "AWS region for bootstrap resources."
  type        = string
  default     = "us-east-1"
}

variable "state_bucket_name" {
  description = "Globally unique S3 bucket name for Terraform state."
  type        = string
}

variable "lock_table_name" {
  description = "DynamoDB table name for Terraform state locking."
  type        = string
}

variable "github_owner" {
  description = "GitHub username or organization that owns the repository."
  type        = string
}

variable "github_repository" {
  description = "GitHub repository name."
  type        = string
}

variable "application_name" {
  description = "Application name used to scope deploy-role permissions."
  type        = string
  default     = "devops-practical-challenge"
}

variable "environment" {
  description = "Environment name used to scope deploy-role permissions."
  type        = string
  default     = "prod"
}

variable "github_actions_role_name" {
  description = "IAM role name for GitHub Actions deployments."
  type        = string
  default     = "devops-practical-challenge-github-actions"
}
