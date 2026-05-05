module "network" {
  source = "../../modules/network"

  app_name             = var.app_name
  environment          = var.environment
  vpc_cidr             = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
}

module "ecr" {
  source = "../../modules/ecr"

  repository_name = var.app_name
}

module "ecs_service" {
  source = "../../modules/ecs_service"

  app_name              = var.app_name
  environment           = var.environment
  vpc_id                = module.network.vpc_id
  public_subnet_ids     = module.network.public_subnet_ids
  private_subnet_ids    = module.network.private_subnet_ids
  image_uri             = "${module.ecr.repository_url}:${var.image_tag}"
  app_port              = var.app_port
  desired_count         = var.desired_count
  cpu                   = var.task_cpu
  memory                = var.task_memory
  health_check_path     = var.health_check_path
  log_retention_days    = var.log_retention_days
  environment_variables = var.environment_variables
}
