output "aws_account_id" {
  description = "AWS account ID where bootstrap resources were created."
  value       = data.aws_caller_identity.current.account_id
}

output "state_bucket_name" {
  description = "S3 bucket for Terraform remote state."
  value       = aws_s3_bucket.terraform_state.bucket
}

output "lock_table_name" {
  description = "DynamoDB table for Terraform state locking."
  value       = aws_dynamodb_table.terraform_locks.name
}

output "github_actions_role_arn" {
  description = "IAM role ARN for GitHub Actions OIDC deployment."
  value       = aws_iam_role.github_actions_deploy.arn
}

output "github_actions_policy_arn" {
  description = "Custom IAM policy ARN attached to the GitHub Actions deploy role."
  value       = aws_iam_policy.github_actions_deploy.arn
}
