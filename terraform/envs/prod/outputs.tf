output "alb_dns_name" {
  description = "Public DNS name of the application load balancer."
  value       = module.ecs_service.alb_dns_name
}

output "application_url" {
  description = "HTTP URL for the deployed application."
  value       = "http://${module.ecs_service.alb_dns_name}"
}

output "ecr_repository_url" {
  description = "ECR repository URL used by the CI/CD pipeline."
  value       = module.ecr.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name."
  value       = module.ecs_service.cluster_name
}

output "ecs_service_name" {
  description = "ECS service name."
  value       = module.ecs_service.service_name
}

output "cloudwatch_log_group" {
  description = "CloudWatch log group for application logs."
  value       = module.ecs_service.log_group_name
}
